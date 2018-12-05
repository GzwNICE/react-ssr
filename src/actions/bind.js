import Cookies from 'js-cookie'
import { toRealUrl, parseBody } from '../helper/fetching'

/**
 * 获取手机验证码
 */
export const mobile = params => {
  const key = Cookies.get('captcha_key')
  return fetch(toRealUrl(':ve.sso/u/mobile_verify_code'), {
    method: 'post',
    credentials: 'include',
    body: parseBody({
      appid: 1, // 1: 最佳东方；2：先之； sms_type: 1,  //	1：短信登录；2：手机注册；
      return_type: 'json', // json/callback_json
      captcha_key: key,
      ...params,
    }),
  }).then(res => res.json())
}

/**
 * 获取邮箱验证码
 */
export const email_verify_code = params => {
  const key = Cookies.get('captcha_key')
  return fetch(toRealUrl(':ve.mobile.interface/user/email_verify_code'), {
    method: 'post',
    credentials: 'include',
    body: parseBody({
      appid: 1, // 1: 最佳东方；2：先之； sms_type: 1,  //	1：短信登录；2：手机注册；
      return_type: 'json', // json/callback_json
      captcha_key: key,
      ...params,
    }),
  }).then(res => res.json())
}

/**
 * 邮箱绑定
 */
export const email_verify = params => {
  const key = Cookies.get('captcha_key')
  return fetch(toRealUrl(':ve.mobile.interface/user/email_verify'), {
    method: 'post',
    credentials: 'include',
    body: parseBody({
      appid: 1, // 1: 最佳东方；2：先之； sms_type: 1,  //	1：短信登录；2：手机注册；
      return_type: 'json', // json/callback_json
      captcha_key: key,
      ...params,
    }),
  }).then(res => res.json())
}
