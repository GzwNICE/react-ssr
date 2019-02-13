/**
 * Created by huangchao on 2017/10/25.
 */
import { singleApi } from '../helper/reduxFetch'
export const JOB_SEARCH_INIT = 'JOB_SEARCH_INIT' // 搜索数据初始化
export const JOB_SEARCH_ADD = 'JOB_SEARCH_ADD' // 工作添加
export const JOB_SEARCH_REF = 'JOB_SEARCH_REF' // 刷新
export const JOB_SEARCH_ISLODING = 'JOB_SEARCH_ISLODING' // isloding
export const JOB_SEARCH_LODING  = 'JOB_SEARCH_LODING' // loding
export const JOB_SEARCH_SAVE = 'JOB_SEARCH_SAVE' // 保存搜索条件
export const JOB_PAGE_UNMOUNT = 'JOB_PAGE_UNMOUNT' // 页面卸载
export const JOB_PAGE_DELETE_LIST = 'JOB_PAGE_DELETE_LIST' //删除缓存
export const JOB_PAGE_CITY_CODE_SET = 'JOB_PAGE_CITY_CODE_SET' //设置城市code
const URLPOST = ':ve.mobile.interface/job/search'

export const saveQuery = args => {
  return {
    args,
    type: JOB_SEARCH_SAVE,
  }
}

export const getSearchInit = singleApi({
  url: URLPOST,
  action: (args, json) => {
    return {
      args,
      type: JOB_SEARCH_INIT,
      data: json.data,
    }
  },
  cache: () => {
    return {
      state: 'jobpage',
      type: JOB_SEARCH_INIT,
    }
  },
})

export const changeQuery = singleApi({
  url: URLPOST,
  action: (args, json) => {
    return {
      args,
      type: JOB_SEARCH_INIT,
      data: json.data,
    }
  },
})

export const getSearchListref = singleApi({
  url: URLPOST,
  action: (args, json) => {
    return {
      args,
      type: JOB_SEARCH_REF,
      data: json.data,
    }
  },
  prelude: () => {
    return {
      type: JOB_SEARCH_LODING,
    }
  },
})
export const getSearchListadd = singleApi({
  url:URLPOST,
  action: (args, json) => {
    return{
      args,
      type: JOB_SEARCH_ADD,
      data: json.data,
    }
  },
  prelude: () => {
    return {
      type: JOB_SEARCH_ISLODING,
    }
  },
})

export const saveScrollTop = (top) => {
  return {
    type: JOB_PAGE_UNMOUNT,
    scrollTop: top,
  }
}

export const deletecache = () => {
  return {
    type: JOB_PAGE_DELETE_LIST,
  }
}
