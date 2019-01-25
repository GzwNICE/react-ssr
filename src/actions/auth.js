import store from 'store'
import Cookies from 'js-cookie'
import { pipeline, toRealUrl, parseBody } from '../helper/fetching'
import logoImg from '../static/logo.jpg'
import axios from "axios"

/**
 * http://apidoc.veryeast.cn/
 *   用户登录接口
 * @param {object} params
    Teddy.auth.mobile({
      username: '17681839162',
      password: 'yada',
    })
 */
// :ve.mobile.interface/user/login
export const login = (params) => {
  return pipeline(':ve.mobile.interface/user/login', params).then(payload => {
    if (payload.status !== 0) {
      store.set('m:auth', payload.data)
      Cookies.set('ticket', payload.data.user_ticket)
      return payload.data
    }
    throw payload
  })
}

/*
验证码登录
 params ={
 username: '',
 password: '短信验证码',
 platform: 2, 平台
 }
* */
export const loginCode = (params) => {
  return pipeline(':ve.mobile.interface/user/code_login', params).then(payload => {
    if (payload.status !== 0) {
      store.set('m:auth', payload.data)
      Cookies.set('ticket', payload.data.user_ticket)
      return payload.data
    }
    throw payload
  })
}

/*
 找回密码
 params ={
 password: '密码',
 mobile: '手机号'
 code: '', 	短信验证码
 }
 * */
export const findPassword = (params) => {
  return pipeline(':ve.mobile.interface/user/find', params).then(payload => {
    if (payload.status !== 0) {
      store.set('m:auth', payload.data)
      Cookies.set('ticket', payload.data.user_ticket)
      return payload
    }
    throw payload
  })
}


/*
登出
*/
export const logout = (params) => {
  return pipeline(':ve.mobile.interface/user/logout', params).then(payload => {
    if (payload.status !== 0) {
      store.remove('m:auth')
      Cookies.remove('ticket')
      Cookies.remove('user_ticket')
      return payload.data
    }
    throw payload
  })
}

/* 手机注册
 mobile: '手机号码',
 password: '密码',
 code: '短信验证码',
 return_type: 'json'
*/

export const register = (params) => {
  return pipeline(':ve.mobile.interface/user/register', params).then(payload => {
    if (payload.status !== 0) {
      store.set('m:auth', payload.data)
      Cookies.set('ticket', payload.data.user_ticket)
      return payload
    }
    throw payload
  })
}

/**
 * 获取手机验证码
 */
export const mobile = (params) => {
  const key = Cookies.get('captcha_key')
  // return fetch(toRealUrl(':ve.sso/user/mobile_code'), {
  //   method: 'post',
  //   credentials: 'include',
  //   body: parseBody({
  //     appid: 1, // 1: 最佳东方；2：先之； sms_type: 1,  //	1：短信登录；2：手机注册；
  //     return_type: 'json', // json/callback_json
  //     captcha_key: key,
  //     ...params,
  //   }),
  // }).then(res => {
  //   console.log(res)
  // })
  return axios({
    url: toRealUrl(':ve.sso/user/mobile_code'),
    credentials: 'include',
    method: 'post',
    data: parseBody({
      appid: 1, // 1: 最佳东方；2：先之； sms_type: 1,  //	1：短信登录；2：手机注册；
      return_type: 'json', // json/callback_json
      captcha_key: key,
      ...params,
    }),
  }).then(res => res.data)
}

/*
重置手机密码
*/
export const changePassword = (params) => {
  return pipeline(':ve.mobile.interface/user/rest_password', params).then(payload => {
    if (payload.status !== 0) {
      return payload
    }
    throw payload
  })
}

/*
绑定手机
* */

export const bindMobile = (params) => {
  // return fetch(toRealUrl(':ve.m/client-service/api/mobile'), {
  //   method: 'post',
  //   body: parseBody({
  //     ...params,
  //   }),
  // }).then(res => res.json())
  // http://m.veryeast.cn/s/ve.mobile.interface/client-service/api/mobile
  // :ve.m/client-service/api/mobile
  // :ve.mobile.interface/client-service/api/mobile
  return axios({
    url: toRealUrl(':ve.mobile.interface/client-service/api/mobile'),
    credentials: 'include',
    method: 'post',
    data: parseBody({
      ...params,
    }),
  }).then(res => res.data)
}

/*
绑定邮箱
*/

export const handleBindEmail = (params) => {
  // return fetch(toRealUrl(':ve.sso/user/email_authenticate'), {
  //   method: 'post',
  //   body: parseBody({
  //     return_type: 'json',
  //     ...params,
  //   }),
  // }).then(res => res.json())
  return axios({
    url: toRealUrl(':ve.sso/user/email_authenticate'),
    credentials: 'include',
    method: 'post',
    data:  parseBody({
      return_type: 'json',
      ...params,
    }),
  }).then(res => res.data)
}

/**
 * 获取图片验证码
 */
// export const captcha = () => {
//   return fetch(toRealUrl(`:ve.sso/user/captcha?m=client&t=${new Date().getTime()}`), {
//     credentials: 'include',
//   }).then(res => {
//     return res.blob()
//   }).then(blob => {
//     return new Promise((resolve, reject) => {
//       let s = new FileReader()
//       s.onload = function() {
//         resolve(s.result)
//       }
//       s.readAsDataURL(blob)
//     })
//   })
  // return axios({
  //   url: toRealUrl(`:ve.sso/user/captcha?m=client&t=${new Date().getTime()}`),
  //   credentials: 'include',
  // }).then(res => res.data)
// }

/*
* 获取微信分享配置信息
* */

export const wxconfig = (url) => {
  return fetch(`https://activity.veryeast.cn/wechat/get-sign-package?url=${url}`).then(res => {
    return res.json()
  }).then(data => {
    if(data.status === 1) {
      return data
    }
    throw  data
  })
}

export const  shareToPeople = (job_name, company_name) => { // 给个人
  return {
    title: `职位推荐：${job_name}`,
    desc: `${company_name}正在招聘人才，机会特别好，推荐你去试试~`,
    link: window.location.href,
    imgUrl: logoImg,
    type: `link`,
  }
}

export const  shareToAll = (job_name, company_name) => { //所有人
  return {
    title: `职位推荐：${company_name}正在招聘${job_name}，推荐你去试试~`,
    link: window.location.href,
    imgUrl: logoImg,
    type: `link`,
  }
}

export const wx_config = (wechat_config) => {
  return {
    debug: false,
    appId: wechat_config.appId,
    timestamp: wechat_config.timestamp,
    nonceStr: wechat_config.nonceStr,
    signature: wechat_config.signature,
    jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage','onMenuShareQQ','onMenuShareQZone'],
  }
}