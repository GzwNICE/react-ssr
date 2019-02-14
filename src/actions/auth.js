import store from 'store'
import Cookies from 'js-cookie'
import { pipeline, toRealUrl, parseBody } from '../helper/fetching'
import axios from 'axios'
import { singleApi } from '../helper/reduxFetch'

export const WEIXIN_SHARE_INIT = 'WEIXIN_SHARE_INIT' // 微信分享config
const SHAREURLPOST = ':ve.mobile.interface/h5-new/company-mobile-index/share'

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
export const login = params => {
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
export const loginCode = params => {
  return pipeline(':ve.mobile.interface/user/code_login', params).then(
    payload => {
      if (payload.status !== 0) {
        store.set('m:auth', payload.data)
        Cookies.set('ticket', payload.data.user_ticket)
        return payload.data
      }
      throw payload
    }
  )
}

/*
 找回密码
 params ={
 password: '密码',
 mobile: '手机号'
 code: '', 	短信验证码
 }
 * */
export const findPassword = params => {
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
export const logout = params => {
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

export const register = params => {
  return pipeline(':ve.mobile.interface/user/register', params).then(
    payload => {
      if (payload.status !== 0) {
        store.set('m:auth', payload.data)
        Cookies.set('ticket', payload.data.user_ticket)
        return payload
      }
      throw payload
    }
  )
}

/**
 * 获取手机验证码
 */
export const mobile = params => {
  const key = Cookies.get('captcha_key')
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
export const changePassword = params => {
  return pipeline(':ve.mobile.interface/user/rest_password', params).then(
    payload => {
      if (payload.status !== 0) {
        return payload
      }
      throw payload
    }
  )
}

/*
绑定手机
* */

export const bindMobile = params => {
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

export const handleBindEmail = params => {
  return axios({
    url: toRealUrl(':ve.sso/user/email_authenticate'),
    credentials: 'include',
    method: 'post',
    data: parseBody({
      return_type: 'json',
      ...params,
    }),
  }).then(res => res.data)
}

/*
 * 获取微信分享配置信息
 * */
export const wxconfig = singleApi({
  url: SHAREURLPOST,
  action: (args, json) => {
    return {
      args,
      type: WEIXIN_SHARE_INIT,
      data: wx_config(json.data),
    }
  },
})

·export const shareToPeople = (job_name, company_name, type, link) => {
  // 给个人
  return {
    title: type === 1 ? `职位推荐：${job_name}` : `${company_name}`,
    desc:
      type === 1
        ? `${company_name}正在招聘人才，机会特别好，推荐你去试试~`
        : `我们正在最佳东方上招募人才，不要错过哦，赶快进来看看吧！`,
    link: link || window.location.href,
    imgUrl: 'https://f3-v.veimg.cn/m/v3/logo.jpg',
  }
}

export const shareToAll = (job_name, company_name, type, link) => {
  //所有人
  return {
    title:
      type === 1
        ? `职位推荐：${company_name}正在招聘${job_name}，推荐你去试试~`
        : `${company_name}正在最佳东方上招募人才，不要错过哦，赶快进来看看吧！`,
    link: link || window.location.href,
    imgUrl: 'https://f3-v.veimg.cn/m/v3/logo.jpg',
  }
}

export const appShare = link => {
  //全站分享
  return {
    title: `【最佳东方】旅游服务业的招聘求职平台`,
    desc: `平台入驻企业已累计达6w+家，涵盖酒店、餐饮、公寓、海外、邮轮、物业、航空、景区、养老、地产等领域。`,
    link: link || window.location.href,
    imgUrl: 'https://f3-v.veimg.cn/m/v3/logo.jpg',
  }
}

export const wx_config = wechat_config => {
  return {
    debug: false,
    appId: wechat_config.appId,
    timestamp: wechat_config.timestamp,
    nonceStr: wechat_config.nonceStr,
    signature: wechat_config.signature,
    jsApiList: ['onMenuShareAppMessage', 'onMenuShareTimeline'],
  }
}
