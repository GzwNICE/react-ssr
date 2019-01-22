/**
 * Created by huangchao on 2017/10/24.
 */
import { singleApi } from '../helper/reduxFetch'
export const GET_COMPANYDETAIL = 'GET_COMPANYDETAIL' // 获取公司详情
export const GET_COMPANYDETAIL_CLEAR = 'GET_COMPANYDETAIL_CLEAR'  //清空公司信息
export const FLLOW_COMPANY = 'FLLOW_COMPANY' // 关注企业
export const UN_FLLOW_COMPANY = 'UN_FLLOW_COMPANY' // 取消关注企业
export const GET_COMPANYDETAIL_LIST = 'GET_COMPANYDETAIL_LIST' // 该企业其他职位
export const DELETE_COMPANY_INFO = 'DELETE_COMPANY_INFO' // 清楚数据
export const GET_BLOCDETAIL_CATEGORY = 'GET_BLOCDETAIL_CATEGORY' // 名企专区品牌分类
export const GET_BLOCDETAIL_LIST = 'GET_BLOCDETAIL_LIST' // 名企专区
export const GET_BLOCDETAIL_SEARCH = 'GET_BLOCDETAIL_SEARCH' // 名企专区搜索
export const GET_BLOCDETAIL_SEARCH_CLEAR = 'GET_BLOCDETAIL_SEARCH_CLEAR' // 名企专区搜索

const URLPOST = ':ve.mobile.interface/job/company_detail'
const URLLIST = ':ve.mobile.interface/job/company_recruit_jobs'
const FLLOW = ':ve.mobile.interface/user/follow_company'
const UN_FLOOW = ':ve.mobile.interface/user/unfollow_company'
const CATEGORY = ':ve.mobile.interface/h5-new/company-mobile-index/child_category'
const BLOCLIST = ':ve.mobile.interface/h5-new/company-mobile-index/child'
const BLOCSEARCH = ':ve.mobile.interface/h5-new/company-mobile-index/search'

export const companydetail = singleApi({
  url: URLPOST,
  action: (args, json) => {
    return {
      type: GET_COMPANYDETAIL,
      data: json.data,
    }
  },
})

// 企业详情清空数据
export const companydetailClear = () => {
  return {
    type: GET_COMPANYDETAIL_CLEAR,
  }
}

export const companyCollect = singleApi({
  url: FLLOW,
  action: (args, json) => {
    return {
      type: FLLOW_COMPANY,
      data: json.data,
    }
  },
})

export const companyUnCollect = singleApi({
  url: UN_FLOOW,
  action: (args, json) => {
    return {
      type: UN_FLLOW_COMPANY,
      data: json.data,
    }
  },
})

export const companyList = singleApi({
  url: URLLIST,
  action: (args, json) => {
    return {
      type: GET_COMPANYDETAIL_LIST,
      data: json.data,
    }
  },
})

// 名企列表页品牌分类
export const blocCategory = singleApi({
  url: CATEGORY,
  action: (args, json) => {
    return {
      type: GET_BLOCDETAIL_CATEGORY,
      data: json.data,
    }
  },
})

// 名企列表
export const blocList = singleApi({
  url: BLOCLIST,
  action: (args, json) => {
    return {
      type: GET_BLOCDETAIL_LIST,
      data: json.data,
    }
  },
})


// 名企搜索
export const blocSearch = singleApi({
  url: BLOCSEARCH,
  action: (args, json) => {
    return {
      type: GET_BLOCDETAIL_SEARCH,
      data: json.data,
    }
  },
})

// 名企搜索清空数据
export const blocSearchClear = () => {
  return {
    type: GET_BLOCDETAIL_SEARCH_CLEAR,
  }
}

export const emptyInfo = {
  type: DELETE_COMPANY_INFO,
}

