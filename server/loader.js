import path from 'path'
import fs from 'fs'

import React from 'react'
import { renderToString } from 'react-dom/server'
import Helmet from 'react-helmet'
import { Provider } from 'react-redux'
import { StaticRouter } from 'react-router'
import { Frontload, frontloadServerRender } from 'react-frontload'
// import { LocaleProvider } from 'antd'
// import zh_CN from 'antd/lib/locale-provider/zh_CN'
import '../src/style/theme.less'
import '../src/style/style.less'
import createStore from '../src/store'
import routes from '../src/routes'
// import Root from '../src/pages/Root'
import manifest from '../build/asset-manifest.json'
import { getPostInit, famCompany, hotTrade } from '../src/actions/home'
import { companydetail, companyList } from '../src/actions/company'
import { positiondetail } from '../src/actions/position'
import { getBanner } from '../src/actions/banner'
import { blocList } from '../src/actions/company'
import pathToRegexp from 'path-to-regexp'

export default (req, res, next) => {
  console.log(req.url)
  const injectHTML = (data, { html, title, meta, body, scripts, state }) => {
    data = data.replace('<html>', `<html ${html}>`)
    data = data.replace(/<title>.*?<\/title>/g, title)
    data = data.replace('</head>', `${meta}</head>`)
    data = data.replace(
      '<div id="root"></div>',
      `<div id="root">${body}</div><script>window.__INITIAL_STATE__ = ${state}</script>`
    )
    data = data.replace('</body>', scripts.join('') + '</body>')

    return data
  }

  fs.readFile(
    path.resolve(__dirname, '../build/index.html'),
    'utf8',
    (err, htmlData) => {
      if (err) {
        console.error('Read error', err)

        return res.status(404).end()
      }
      const { store } = createStore(req.url)
      const context = {}
      const modules = []

      const isNumber = obj => {
        return typeof obj === 'number' && isFinite(obj)
      }
      const serverRender = () => {
        frontloadServerRender(() =>
          renderToString(
            <Provider store={store}>
              <StaticRouter location={req.url} context={context}>
                <Frontload isServer>{routes}</Frontload>
              </StaticRouter>
            </Provider>
          )
        )
          .then(routeMarkup => {
            if (context.url) {
              // If context has a url property, then we need to handle a redirection in Redux Router
              res.writeHead(302, {
                Location: context.url
              })

              res.end()
            } else {
              // Otherwise, we carry on...

              // Let's give ourself a function to load all our page-specific JS assets for code splitting
              const extractAssets = (assets, chunks) =>
                Object.keys(assets)
                  .filter(
                    asset => chunks.indexOf(asset.replace('.js', '')) > -1
                  )
                  .map(k => assets[k])

              // Let's format those assets into pretty <script> tags
              const extraChunks = extractAssets(manifest, modules).map(
                c => `<script type="text/javascript" src="/${c}"></script>`
              )

              // We need to tell Helmet to compute the right meta tags, title, and such
              const helmet = Helmet.renderStatic()

              // NOTE: Disable if you desire
              // Let's output the title, just to see SSR is working as intended
              // console.log('THE TITLE', helmet.title.toString())

              // Pass all this nonsense into our HTML formatting function above
              
              // console.log(helmet.htmlAttributes.toString())

              const html = injectHTML(htmlData, {
                html: helmet.htmlAttributes.toString(),
                title: helmet.title.toString(),
                meta: helmet.meta.toString(),
                body: routeMarkup,
                scripts: extraChunks,
                state: JSON.stringify(store.getState()).replace(/</g, '\\u003c')
              })

              // We have all the final HTML, let's send it to the user already!
              res.send(html)
            }
          })
          .catch(error => {
            console.log('error: ' + error)
          })
      }


      const jobUrl = pathToRegexp('/:company_id(\\d+)/:job_id(\\d+)(.*)')
      const companyUrl2 = pathToRegexp('/:company_id(\\d+)')
      const companyUrl = pathToRegexp('/:company_id(\\d+)\\?(.*)')
      const homePage = pathToRegexp('/home')
      const blocPage = pathToRegexp('/bloc/:c_userid(\\d+)(.*)')

      let job = jobUrl.exec(req.url)
      let com2 = companyUrl2.exec(req.url)
      let com1 = companyUrl.exec(req.url)
      let com = {
        key: '',
        value: ''
      }
      let render = true
      if (job) {
        com = {
          key: 1,
          value: job[1]
        }
      }
      if (com2) {
        com = {
          key: 2,
          value: com2[1]
        }
      }
      if (com1) {
        com = {
          key: 3,
          value: com1[1]
        }
      }
      if (isNumber(parseInt(com.value, 10))) {
        if (com.key === 1) { // 职位详情页
          render = false
          store.dispatch(positiondetail()).then(() => {
            serverRender()
          })
        } else {   // 企业详情页
          render = false
          store.dispatch(companydetail()).then(() => {
            store.dispatch(companyList()).then(() => {
              serverRender()
            })
          })
        }
      }
      if (homePage.exec(req.url)) { // 首页
        render = false
        store.dispatch(getPostInit()).then(() => {
          store.dispatch(getBanner()).then(() => {
            store.dispatch(famCompany()).then(() => {
              store.dispatch(hotTrade()).then(() => {
                serverRender()
              })
            })
          })
        })
      }
      if (blocPage.exec(req.url)) { // 名企专区列表
        store.dispatch(blocList()).then(() => {
          serverRender()
        })
      }
      if(render){
        serverRender()
      }
      // if (req.url.indexOf('tabs/home') !== -1) {  // 首页
      //   store.dispatch(getPostInit()).then(() => {
      //     store.dispatch(getBanner()).then(() => {
      //       serverRender()
      //     })
      //   })
      // } else {
      //   serverRender()
      // }
    }
  )
}
