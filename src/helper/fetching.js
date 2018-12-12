import store from 'store'
import Cookies from 'js-cookie'
import axios from "axios";
import isServer from './isServer'
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
    const { url, type, should, begin, done, error } = { ...options, ...opts }
    if (!should || should(params, getState)) {
      begin && dispatch({
        type: type.begin,
        ...begin(params, getState),
      })
      return pipeline(url, params)
        .then(json => {
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
export const baseUrl = '/s'

/**
 * 数据请求
 * @param {string} uri
 * @param {object} params
 */
export function pipeline(uri, params, opt = {}) {
  const sUrl = toRealUrl(uri)
  // const headers = new Headers()
  // headers.append('X-Requested-With', 'XMLHttpRequest')
  // headers.append('Accept', '*/*')
  // headers.append('Content-Type', 'application/x-www-form-urlencoded')
  return axios({
    url: sUrl,
    credentials: "include",
    method: "post",
    headers: {
      'X-Requested-With': 'XMLHttpRequest',
      'Accept': '*/*',
    },
    data: parseBody(params),
    ...opt,
  }).then(res => {
    if (res.status >= 400) throw res
    return res.data
  })
}

/**
 * uri 转 url
 * @param {*} uri
 */
export function toRealUrl(uri) {
  return /^:/.test(uri) ? `${baseUrl}/${uri.replace(':', '')}` : uri
}

/**
 * 请求参数处理
 * @param {object} params
 */
export function parseBody(params = {}) {
  const auth = store.get('m:auth') || {}
  if(Cookies.get('ticket') || auth.user_ticket) {
    Cookies.set('ticket', Cookies.get('ticket') || auth.user_ticket)
  }
  params = {
    ...params,
    user_ticket: auth.user_ticket || Cookies.get('ticket'),
  }
  // todo 这边临时这么做，formData在node上运行报错，还是要解决
  // if (isServer) {
  //   return params
  // } else {
  //   const formData = new FormData()
  //   Object.keys(params).forEach((key) => {
  //     formData.append(key, params[key] instanceof Blob ? params[key] : (String(params[key]) || ''))
  //   })
  //   return formData
  // }
  const formData = new FormData()
  Object.keys(params).forEach((key) => {
    formData.append(key, params[key] instanceof Blob ? params[key] : (String(params[key]) || ''))
  })
  return formData
}
