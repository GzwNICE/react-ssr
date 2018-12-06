// 清酒稻香
import '@babel/polyfill'
import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom'
import './style/theme.less'
import './style/style.less'
import routes from './routes'
import * as supersLocation from './actions/supers/location'
import * as LocalReducers from './reducers'
import * as option from './actions/option'
import { combineReducers, createStore, applyMiddleware, compose } from 'redux'
import { Provider } from 'react-redux'
import thunkMiddleware from 'redux-thunk'
require('es6-promise').polyfill()


const store = createStore(
  combineReducers({
    // ...teddyReducers,
    ...LocalReducers,
  }),
  window && window.initailState ? window.initailState : {},
  (window && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : compose)(
    applyMiddleware(
      thunkMiddleware,
    ),
  ),
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

let ua = navigator.userAgent
let refresh = sessionStorage.getItem("refresh")
let isIos = navigator.appVersion.match(/(iphone|ipad|ipod)/gi);
if(ua.indexOf('Safari') > -1 && !refresh && isIos) {
  // sessionStorage.setItem("refresh", false)
  // window.location.href = window.location.href
}

setTimeout(function() {
  sessionStorage.removeItem("refresh")
}, 3000)

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


  ReactDOM.render(
    <Router>
      <Provider store={store}>
        {routes}
      </Provider>
    </Router>,
    document.getElementById('root')
  )
})
