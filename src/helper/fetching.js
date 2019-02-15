import store from 'store'
import Cookies from 'js-cookie'
import axios from "axios"
import isServer from './isServer'
import qs from 'query-string'
// import { login_out } from '../../../actions/userStatus'
import { login_out } from '../actions/userStatus'

// import { Toast} from 'antd-mobile';
// import { Modal } from 'antd-mobile'
// import { createBrowserHistory, createMemoryHistory } from 'history'

/**
 * action 生成器
 * @param {object} options
 * url: 请求地址
 * type: action type
 * should: 判断缓存失效
 * begin: 请求开始前
 * done: 请求完成
 * error: 请求错误时
 */
export default (options) => {
  return (params = {}, opts = {}) => (dispatch, getState) => {
    params = Object.assign(params, {appchannel: 'web'})
    const { url, type, should, begin, done, error } = { ...options, ...opts }
    if (!should || should(params, getState)) {
      begin && dispatch({
        type: type.begin,
        ...begin(params, getState),
      })
      return pipeline(url, params)
        .then(json => {
          // todo 这样写跳转有问题，再看看
          // if(json.errMsg === '未登陆') {
          //   const history = isServer ? createMemoryHistory()
          //     : createBrowserHistory()
          //   const goto = () => {
          //     history.push('/user/login?redirect=' + history.location.pathname)
          //     console.log(1111)
          //   }
          //   return Modal.alert('', '请先登录', [
          //     { text: '稍后', style: 'default' },
          //     { text: '登录', onPress: goto },
          //   ])
          // }
          dispatch({
            type,
            ...done(json, params, getState),
          })
          return json
        }).catch(err => {
          dispatch({
            type: type.error,
            ...(error ? error(err, params, getState) : { error: err }),
          })
          throw err
        })
    } else {
      return Promise.resolve(null)
    }
  }
}


/**
 * 代理服务
 */
export const baseUrl = 'https://m.veryeast.cn/s'

/**
 * 数据请求
 * @param {string} uri
 * @param {object} params
 */
export function pipeline(uri, params, opt = {}) {

  const sUrl = toRealUrl(uri)
  // loading 加载
  // Toast.loading('Loading...');
  return axios({
    url: sUrl,
    credentials: "include",
    method: "post",
    data: parseBody(params),
    ...opt,
  }).then(res => {
    // loading停止
    // Toast.hide()
    // alert(11)
    // store.dispatch(login_out).then(data => {
    //   console.log(data)
    // })

    if (res.status >= 400) throw res

    if (res.data.status===0 && res.data.errCode===2002) {
      // loginOut()
      store.remove('m:auth')
      Cookies.remove('ticket')
      Cookies.remove('user_ticket')
      localStorage.removeItem('is_login')
      localStorage.removeItem('photo')
      Cookies.remove('photo')
      window.location.href='/user/register'
    }
    return res.data
  })
}
const loginOut = () => {
  const sUrl = toRealUrl(':ve.mobile.interface/user/logout')
  // loading 加载
  // Toast.loading('Loading...');
  return axios({
    url: sUrl,
    credentials: "include",
    method: "post",
    data: parseBody({}),
  }).then(payload => {
    if (payload.status !== 0) {
    console.log(payload)

      store.remove('m:auth')
      Cookies.remove('ticket')
      Cookies.remove('user_ticket')
      localStorage.removeItem('is_login')
      localStorage.removeItem('photo')
      Cookies.remove('photo')
      // window.location.href='/user/register'
    }  
  })
    
}
/**
 * uri 转 url
 * @param {*} uri
 */
export function toRealUrl(uri) {
  // h5-new的是新接口，旧接口加上/client
  let url
  if (/^:/.test(uri)) {
    url = /^:/.test(uri) ? `${baseUrl}/${uri.replace(':', '')}` : uri
    if (url.indexOf('user/login') !== -1) {
      // url = url.replace('ve.mobile.interface','ve.sso')
    } else if (url.indexOf('h5-new/') !== -1) {
      // url = url.replace('ve.mobile.interface','ve.m')
    } else if (url.indexOf('data/options') !== -1) {
      // url = 'http://mobile.interface.veryeast.cn/data/options'
    }
  } else {
    url = uri
  }
  return url
  // if (/^:ve.sso/.test(uri)) {
  //   return `http://sso.veryeast.cn${uri.replace(':ve.sso', '')}`
  // } else if (/^:ve.mobile.interface/.test(uri)){
  //   return `http://mobile.interface.veryeast.cn${uri.replace(':ve.mobile.interface', '')}`
  // } else if (/^:ve.m/.test(uri)){
  //   return `http://m.veryeast.cn${uri.replace(':ve.m', '')}`
  // } else if (/^:ve.my/.test(uri)){
  //   return `http://my.veryeast.cn${uri.replace(':ve.my', '')}`
  // } else {
  //   return uri
  // }
  // if (uri.indexOf('h5-new') === -1) {
  //   if (/^:ve.sso/.test(uri)) {
  //     return `http://sso.veryeast.cn/client${uri.replace(':ve.sso', '')}`
  //   } else if (/^:ve.mobile.interface/.test(uri)){
  //     return `http://mobile.interface.veryeast.cn/client${uri.replace(':ve.mobile.interface', '')}`
  //   } else if (/^:ve.m/.test(uri)){
  //     return `http://m.veryeast.cn/client${uri.replace(':ve.m', '')}`
  //   } else if (/^:ve.my/.test(uri)){
  //     return `http://my.veryeast.cn/client${uri.replace(':ve.my', '')}`
  //   } else {
  //     return uri
  //   }
  // } else {
  //
  // }
  // return /^:/.test(uri) ? `${baseUrl}/${uri.replace(':', '')}` : uri
}

/**
 * 请求参数处理
 * @param {object} params
 */
export function parseBody(params = {}) {
  if (isServer) {
    return qs.stringify(params)
  } else {
    // const auth = store.get('m:auth') || {}
    // if(Cookies.get('ticket') || auth.user_ticket) {
    //   Cookies.set('ticket', Cookies.get('ticket') || auth.user_ticket)
    // }
    // if(Cookies.get('ticket')) {
    //   Cookies.set('ticket', Cookies.get('ticket'))
    // }
    params = {
      ...params,
      user_ticket: Cookies.get('ticket'),
    }
       
    const formData = new FormData()
    Object.keys(params).forEach((key) => {
      formData.append(key, params[key] instanceof Blob ? params[key] : (String(params[key]) || ''))
    })
    return formData
  }
}
