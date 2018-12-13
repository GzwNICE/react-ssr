import * as supersLocation from '../actions/supers/location'
import * as LocalReducers from '../reducers'
import * as option from '../actions/option'
import { combineReducers, createStore, applyMiddleware, compose } from 'redux'
import thunkMiddleware from "redux-thunk"
import { createBrowserHistory, createMemoryHistory } from 'history'
import { routerReducer, routerMiddleware } from 'react-router-redux'

export const isServer = !(
  typeof window !== 'undefined' &&
  window.document &&
  window.document.createElement
)

export default function configureStore( url='/') {
  const history = isServer ? createMemoryHistory({ initialEntries: [url] })
    : createBrowserHistory()

  const routeMiddleware = routerMiddleware(history)

  const initialState = !isServer ? window.__INITIAL_STATE__ : {}

  const enhancers = []

  if (!isServer) {
    const devToolsExtension = window.devToolsExtension
    if (typeof devToolsExtension === 'function') {
      enhancers.push(devToolsExtension())
    }
  }

  const composedEnhancers = compose(
    applyMiddleware( routeMiddleware, thunkMiddleware ),
    ...enhancers
  )

  const store = createStore(
    combineReducers({
      ...LocalReducers,
      router: routerReducer,
    }),

    // todo 这边window报错 window is not defined
    //   window && window.initailState ? window.initailState : {},
    // (window && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : compose)(
    //   applyMiddleware(
    //     thunkMiddleware,
    //   ),
    // ),
    initialState,
    composedEnhancers
  )

  let cityCode = []
  function _optIndex(sublist, city) {
    (sublist || []).forEach(item => {
      if (new RegExp(item.value).test(city)) {
        cityCode.push(item.code)
      }
      _optIndex(item.sublist, city)
    })
  }

// 项目初始化前先加载配置文件
  store.dispatch(option.load()).then(option => {
    supersLocation.getCoords().then(payload => {
      _optIndex(option.data.areas, payload.address.city)
      store.dispatch({
        type: supersLocation.$.location_load,
        payload: {
          ...payload,
          address: {
            ...payload.address,
            code: cityCode,
          },
        },
      })
    })
  })

  return { store, history }
}




