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
import { companydetail } from '../src/actions/company'
import { positiondetail } from '../src/actions/position'
import { getBanner } from '../src/actions/banner'
import { wxconfig } from '../src/actions/auth'
import { blocList, blocCategory } from '../src/actions/company'
import pathToRegexp from 'path-to-regexp'
import { getSearchListInit } from '../src/actions/search'

export default (req, res, next) => {
  const injectHTML = (
    data,
    { html, title, meta, body, scripts, state, wxconfig }
  ) => {
    data = data.replace('<html>', `<html ${html}>`)
    data = data.replace(/<title>.*?<\/title>/g, title)
    data = data.replace('</head>', `${meta}</head>`)
    data = data.replace('window.__INITIAL_STATE__.wxconfig', wxconfig)
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

      const isNumber = num => {
        if (typeof num === 'number') {
          return num - num === 0
        }
        if (typeof num === 'string' && num.trim() !== '') {
          return Number.isFinite ? Number.isFinite(+num) : isFinite(+num)
        }
        return false
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
                state: JSON.stringify(store.getState()).replace(
                  /</g,
                  '\\u003c'
                ),
                wxconfig: JSON.stringify(
                  store.getState().auth.wxconfig || {
                    debug: true,
                    appId: 'wxf8b4f85f3a794e77',
                    timestamp: 1548900712,
                    nonceStr: '7kQsDXOgtUn3ddYO',
                    signature: '5f09b5acb96f8b8c694b21a241eb515bc6f94774',
                    jsApiList: ['updateAppMessageShareData', 'updateTimelineShareData']
                  }
                ).replace(/</g, '\\u003c')
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

      if (isNumber(com.value)) {
        if (com.key === 1) {
          // 职位详情页
          render = false
          store
            .dispatch(positiondetail({ job_id: job[2], company_id: job[1] }))
            .then(() => {
              store.dispatch(wxconfig({url: `https://m.veryeast.cn${req.url}`})).then(() => {
                serverRender()
              })
            })
        } else {
          // 企业详情页
          render = false
          store.dispatch(companydetail({ company_id: com.value })).then(() => {
            // store.dispatch(companyList({ company_id: com.value })).then(() => {
            store.dispatch(wxconfig({url: `https://m.veryeast.cn${req.url}`})).then(() => {
              serverRender()
            })
            // })
          })
        }
      }
      if (homePage.exec(req.url)) {
        // 首页
        render = false
        store.dispatch(getPostInit()).then(() => {
          store.dispatch(getBanner()).then(() => {
            store.dispatch(famCompany()).then(() => {
              store.dispatch(hotTrade()).then(() => {
                store.dispatch(wxconfig({url: `https://m.veryeast.cn${req.url}`})).then(() => {
                  serverRender()
                })
              })
            })
          })
        })
      }
      if (blocPage.exec(req.url)) {
        // 名企专区列表
        render = false
        store
          .dispatch(blocList({ c_userid: blocPage.exec(req.url)[1] }))
          .then(() => {
            store
              .dispatch(blocCategory({ c_userid: blocPage.exec(req.url)[1] }))
              .then(() => {
                store.dispatch(wxconfig({url: `https://m.veryeast.cn${req.url}`})).then(() => {
                  serverRender()
                })
              })
          })
      }

      if (
        req.url.indexOf('search/') !== -1 &&
        req.url.indexOf('keyword') !== -1 &&
        req.url.indexOf('areaParms') !== -1
      ) {
        let arr = req.url.split('&')
        console.log(arr)
        let params = {
          keyword: '',
          area: '',
          company_industry: '0',
          education: '0',
          room_board: '0',
          salary: '0',
          salary_min: '0',
          salary_max: '100000',
          scope: '4',
          update_time: '-1',
          work_mode: '0',
          page: '1',
          size: '20'
        }
        arr.forEach(item => {
          let arr2 = item.split('=')
          if (arr2[0].indexOf('keyword') !== -1) {
            params.keyword = arr2[1]
          }
          if (arr2[0].indexOf('areaParms') !== -1) {
            params.area = arr2[1]
          }
        })
        console.log(params)
        store.dispatch(getSearchListInit(params)).then(() => {
          // console.log('2222222222221111111')
          store.dispatch(wxconfig({url: `https://m.veryeast.cn${req.url}`})).then(() => {
            // console.log(res.data.count)   decodeURI(%E4%BA%BA%E5%8A%9B%E8%B5%84%E6%BA%90%E9%83%A8)
            serverRender()
          })
        })
      }

      if (render) {
        store.dispatch(wxconfig({url: `https://m.veryeast.cn${req.url}`})).then(() => {
          serverRender()
        })
      }

      // const urlExcel = () => {

      // }

      // let cityCode = []
      // function _optIndex(sublist, city) {
      //   (sublist || []).forEach(item => {
      //     if (new RegExp(item.value).test(city)) {
      //       cityCode.push(item.code)
      //     }
      //     _optIndex(item.sublist, city)
      //   })
      // }
      // store.dispatch(option.load()).then(option => {
      //   supersLocation.getCoords().then(payload => {
      //     _optIndex(option.data.areas, payload.address.city)
      //     store.dispatch({
      //       type: supersLocation.$.location_load,
      //       payload: {
      //         ...payload,
      //         address: {
      //           ...payload.address,
      //           code: cityCode,
      //         },
      //       },
      //     })
      //     urlExcel()
      //   })
      // })

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
