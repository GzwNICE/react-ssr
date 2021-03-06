/**
 * Created by huangchao on 2017/10/23.
 */
import { singleApi } from '../helper/reduxFetch'
export const HOME_POST_INIT = 'HOME_POST_INIT' // 获取首页推荐职位
export const HOME_POST_REF = 'HOME_POST_REF' // 刷新职位
export const HOME_POST_ADD = 'HOME_POST_ADD' // 下拉加载职位
export const HOME_POST_STARING = 'HOME_POST_STARING' // 请求开始
export const HOME_POST_ISLODING = 'HOME_POST_ISLODING' // isloding
export const HOME_PAGE_UNMOUNT = 'HOME_PAGE_UNMOUNT' // 页面卸载
export const HOME_CHANGE_CITY = 'HOME_CHANGE_CITY' // 搜索页用户重新选择了城市
export const HOME_FAM_COMPANY = 'HOME_FAM_COMPANY' //首页名企专区 
export const HOME_HOT_TRADE = 'HOME_HOT_TRADE' //首页热门企业 
export const QUESTION_ANSWER = 'QUESTION_ANSWER' // 常见问题解答问题
export const QUESTION_ANSWER_PAGE = 'QUESTION_ANSWER_PAGE' // 常见问题解答详情

const URLPOST = ':ve.mobile.interface/user/recommended_jobs'
const URLCOMPANY = ':ve.mobile.interface/h5-new/company-mobile-index/index'
const URLTRADE = ':ve.mobile.interface/h5-new/company-mobile-index/company'
const QUESTION = ':ve.mobile.interface/util/faqs' // 常见问题解答
const ANSWER = ':ve.mobile.interface/util/get_faq' // 常见问题解答

export const getPostInit = singleApi({
  url: URLPOST,
  action: (args, json) => {
    return {
      type: HOME_POST_INIT,
      data: json.data,
    }
  },
  cache: () => {
    return {
      state: 'home',
      type: HOME_POST_INIT,
    }
  },
})

export const changeCity = singleApi({
  url: URLPOST,
  action: (args, json) => {
    return {
      type: HOME_POST_INIT,
      data: json.data,
    }
  },
})

export const refReshPost = singleApi({
  url: URLPOST,
  action: (args, json) => {
    return {
      type: HOME_POST_REF,
      data: json.data,
    }
  },
  prelude: () => {
    return {
      type:HOME_POST_STARING,
    }
  },
})

export const addPost = singleApi({
  url: URLPOST,
  action: (args, json) => {
    return {
      args,
      type: HOME_POST_ADD,
      data: json.data,
    }
  },
  prelude: () => {
    return {
      type: HOME_POST_ISLODING,
    }
  },
})

export const changeAllCity = (area) => {
  return {
    type: HOME_CHANGE_CITY,
    area: area,
  }
}

export const saveScrollTop = (top) => {
  return {
    type: HOME_PAGE_UNMOUNT,
    scrollTop: top,
  }
}

// 首页名企专区
export const famCompany = singleApi({
  url: URLCOMPANY,
  action: (args, json) => {
    return {
      args,
      type: HOME_FAM_COMPANY,
      data: json.data,
    }
  },
})

// 首页热门企业
export const hotTrade = singleApi({
  url: URLTRADE,
  action: (args, json) => {
    return {
      args,
      type: HOME_HOT_TRADE,
      data: json.data,
    }
  },
})

//个人中心常见问题列表
export const questionOpinion = singleApi({
  url: QUESTION,
  action: (args, json) => {
    return {
      args,
      data: json.data,
      type: QUESTION_ANSWER,
    }
  },
})

//个人中心常见问题详情
export const answerOpinion = singleApi({
  url: ANSWER,
  action: (args, json) => {
    return {
      args,
      data: json.data,
      type: QUESTION_ANSWER_PAGE,
    }
  },
})


