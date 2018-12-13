// 清酒稻香
import 'es5-shim'
import '@babel/polyfill'
import React from 'react'
import ReactDOM from 'react-dom'
import { Router } from 'react-router-dom'
import { Frontload } from 'react-frontload'
import './style/theme.less'
import './style/style.less'
import routes from './routes'
import configureStore from './store'

import { Provider } from 'react-redux'
require('es6-promise').polyfill()

const { store, history } = configureStore()

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <Frontload noServerRender>
        {routes}
      </Frontload>
    </Router>
  </Provider>,
  document.getElementById('root')
)