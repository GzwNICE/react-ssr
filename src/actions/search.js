/**
 * Created by huangchao on 2017/10/20.
 */
import { singleApi } from '../helper/reduxFetch'
export const SEARCH_HOT = 'SEARCH_HOT' // 获取热门搜索
export const SEARCH_TIPS = 'SEARCH_TIPS' // 获取搜索分类
export const SEARCH_LIST_INIT = 'SEARCH_LIST_INIT' // 搜索结果
export const SEARCH_LIST_ADD = 'SEARCH_LIST_ADD' // 添加搜索结果
export const SEARCH_LIST_ISLODING = 'SEARCH_LIST_ISLODING' // isloding
export const SEARCH_END_SAVE = 'SEARCH_END_SAVE' // 保存搜索条件
export const SEAND_PAGE_UNMOUNT = 'SEAND_PAGE_UNMOUNT' // 页面卸载，保存scrolltop
export const SEAND_PAGE_GOBACK = 'SEAND_PAGE_GOBACK' // 返回删除数据

const URLHOT = ':ve.mobile.interface/job/hotword'
const URLTIP = ':ve.mobile.interface/job/searchtips'
const URLEND = ':ve.mobile.interface/job/search'

export const saveQuery = args => {
  return {
    args,
    type: SEARCH_END_SAVE,
  }
}

export const getSearchHot = singleApi({
  url: URLHOT,
  action: (args, json) => {
    return {
      type: SEARCH_HOT,
      data: json.data,
    }
  },
})

export const getSearchTips = singleApi({
  url:URLTIP,
  action: (args, json) => {
    return {
      args,
      type: SEARCH_TIPS,
      data: json.data,
    }
  },
})

export const getSearchListInit = singleApi({
  url:URLEND,
  action: (args, json) => {
    return{
      args,
      type: SEARCH_LIST_INIT,
      data: json.data,
    }
  },
  cache: () => {
    return {
      state: 'search',
      type: SEARCH_LIST_INIT,
    }
  },
})

export const changeQuery = singleApi({
  url:URLEND,
  action: (args, json) => {
    return{
      args,
      type: SEARCH_LIST_INIT,
      data: json.data,
    }
  },
})

export const getSearchListadd = singleApi({
  url:URLEND,
  action: (args, json) => {
    return{
      args,
      type: SEARCH_LIST_ADD,
      data: json.data,
    }
  },
  prelude: () => {
    return {
      type: SEARCH_LIST_ISLODING,
    }
  },
})

export const saveScrollTop = (top) => {
  return {
    type: SEAND_PAGE_UNMOUNT,
    scrollTop: top,
  }
}

export const deleteList = () => {
  return {
    type: SEAND_PAGE_GOBACK,
  }
}
