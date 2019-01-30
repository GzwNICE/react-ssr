import { singleApi } from '../helper/reduxFetch'
export const BLOC_PAGE_UNMOUNT = 'BLOC_PAGE_UNMOUNT'
export const GET_BLOCDETAIL_LIST = 'GET_BLOCDETAIL_LIST' // 名企专区
export const GET_BLOCDETAIL_CATEGORY = 'GET_BLOCDETAIL_CATEGORY' // 名企专区品牌分类
export const GET_BLOCDETAIL_SEARCH = 'GET_BLOCDETAIL_SEARCH' // 名企专区搜索
export const GET_BLOCDETAIL_LIST_CLEAR = 'GET_BLOCDETAIL_LIST_CLEAR' // 名企专区清空数据
export const GET_BLOCDETAIL_SEARCH_CLEAR = 'GET_BLOCDETAIL_SEARCH_CLEAR' // 名企专区搜索

const CATEGORY = ':ve.mobile.interface/h5-new/company-mobile-index/child_category'
const BLOCLIST = ':ve.mobile.interface/h5-new/company-mobile-index/child'
const BLOCSEARCH = ':ve.mobile.interface/h5-new/company-mobile-index/search'

export const saveScrollTop = top => {
  return {
    type: BLOC_PAGE_UNMOUNT,
    scrollTop: top,
  }
}

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

// 名企列表清空数据
export const blocListClear = () => {
  return {
    type: GET_BLOCDETAIL_LIST_CLEAR,
  }
}
