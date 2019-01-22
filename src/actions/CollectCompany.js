/**
 * Created by huangchao on 2017/10/31.
 */
import { singleApi } from '../helper/reduxFetch'
export const GET_COLLECTCOMPANY_INIT = 'GET_COLLECTCOMPANY_INIT' // 获取关注企业
export const DELETE_COMPANY = 'DELETE_COMPANY' // 删除关注的企业
export const GET_COLLECTCOMPANY_ADD = 'GET_COLLECTCOMPANY_ADD' // 上拉加载
export const GET_COLLECTCOMPANY_ISLODING = 'GET_COLLECTCOMPANY_ISLODING' // isloding
export const COLLECT_COMPANY_PAGE_UNMOUNT = 'COLLECT_COMPANY_PAGE_UNMOUNT' //页面卸载
export const DELETE_COMPANY_PAGE_CACHR = 'DELETE_COMPANY_PAGE_CACHR' // 删除缓存

const URLPOST = ':ve.mobile.interface/user/followed_companies'
const DELETE = ':ve.mobile.interface/user/unfollow_company'

export const getCollectCompantInit = singleApi({
  url: URLPOST,
  action: (args, json) => {
    return {
      type: GET_COLLECTCOMPANY_INIT,
      data: json.data,
    }
  },
  // cache: () => {
  //   return {
  //     state: 'CollectCompany',
  //     type: GET_COLLECTCOMPANY_INIT,
  //   }
  // },
})

export const deleteCompany = singleApi({
  url: DELETE,
  action: (args, json) => {
    return {
      args,
      type: DELETE_COMPANY,
      data: json.data,
    }
  },
})

export const getCollectCompantInitAdd = singleApi({
  url:URLPOST,
  action: (args, json) => {
    return{
      args,
      type: GET_COLLECTCOMPANY_ADD,
      data: json.data,
    }
  },
  prelude: () => {
    return {
      type: GET_COLLECTCOMPANY_ISLODING,
    }
  },
})

export const saveScrollTop = (top) => {
  return {
    type: COLLECT_COMPANY_PAGE_UNMOUNT,
    scrollTop: top,
  }
}

export const deleteCache = () => {
  return {
    type: DELETE_COMPANY_PAGE_CACHR,
  }
}
