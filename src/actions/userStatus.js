/**
 * Created by huangchao on 2017/10/30.
 */
import { singleApi } from '../helper/reduxFetch'
export const GET_USER_STATUS = 'GET_USER_STATUS' // 获取用户状态
export const GET_USER_LOGIN = 'GET_USER_LOGIN' // 获取用户状态(新)
export const USER_REFERSH_RESUME = 'USER_REFERSH_RESUME' // 刷新简历
export const LOGIN_OUT = 'LOGIN_OUT' // 登出
export const SAVE_USER_CITY_CODE = 'SAVE_USER_CITY_CODE' // 储存用户选择的城市id

const URLHOT = ':ve.mobile.interface/user/status'
const LOGGIN = ':ve.mobile.interface/user/photo'
const RESUME = ':ve.mobile.interface/resume/set_base'

export const getUserStatus = singleApi({
  url: URLHOT,
  action: (args, json) => {
    return {
      type: GET_USER_STATUS,
      data: json.data,
    }
  },
})

// 获取当前登录状态（带头像） 
export const loggingStatus = singleApi({
  url: LOGGIN,
  action: (args, json) => {
    return {
      type: GET_USER_LOGIN,
      data: json.data,
    }
  },
})


export const userRefResume = singleApi({
  url: RESUME,
  action: (args, json) => {
    return {
      type: USER_REFERSH_RESUME,
      data: json.data,
    }
  },
})

export const login_out = {
  type: LOGIN_OUT,
}

export const saveCityCode = (code) => {
  return {
    code,
    type: SAVE_USER_CITY_CODE,
  }
}

