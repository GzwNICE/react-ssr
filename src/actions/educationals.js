/**
 * 教育经历
 */

import transport from '../helper/fetching'
import constants from '../helper/constants'
import Standard from '../helper/standard'

export const standard = new Standard()

export const $ = constants('educationals', [
  'load', // 获取用户信息
  'edit', // 编辑用户信息
  'add',
  'remove',
  'get_school_tips', // 学校联想
  'get_major_tips', // 专业联想
])

const URL_MAJOR_TIPS = ':ve.mobile.interface/resume/get_major_tips'
const URL_SChOOL_TIPS = ':ve.mobile.interface/resume/get_school_tips'
const URL_LOAD = ':ve.mobile.interface/resume/get_edu_exps'
const URL_EDIT = ':ve.mobile.interface/resume/set_edu_exp'
const URL_REMOVE = ':ve.mobile.interface/resume/delete_edu_exp'

export const get_major_tips = transport({
  url: URL_MAJOR_TIPS,
  type: $.get_major_tips,
  done(payload, params, getState) {
    return {
      params,
      payload: payload.data,
    }
  },
})

export const get_school_tips = transport({
  url: URL_SChOOL_TIPS,
  type: $.get_school_tips,
  done(payload, params, getState) {
    return {
      params,
      payload: payload.data,
    }
  },
})

export const load = transport({
  url: URL_LOAD,
  type: $.load,
  done(payload, params, getState) {
    return {
      params,
      payload: payload.data,
    }
  },
})

export const edit = transport({
  url: URL_EDIT,
  type: $.edit,
  done(payload, params, getState) {
    return {
      params,
      payload: params,
    }
  },
})

export const add = transport({
  url: URL_EDIT,
  type: $.add,
  done(payload, params, getState) {
    return {
      params,
      payload: params,
    }
  },
})

export const remove = transport({
  url: URL_REMOVE,
  type: $.remove,
  done(payload, params, getState) {
    return {
      params: {
        ...params,
        id: params.edu_exp_id,
      },
      payload: payload.data,
    }
  },
})
