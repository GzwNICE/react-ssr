/**
 * Created by gaozhiwen on 2019/1/22.
 */
import {
  GET_COMPANYDETAIL,
  FLLOW_COMPANY,
  UN_FLLOW_COMPANY,
  GET_COMPANYDETAIL_LIST,
  DELETE_COMPANY_INFO,
  GET_COMPANYDETAIL_CLEAR,
  COMPANY_PAGE_UNMOUNT,
} from '../actions/company'

const initState = {
  list: [],
  pager: {},
  listPhoto: {},
  brand: [],
  brand_index: [],
  searchList: [],
  searchPager: {},
  label: [],
  album: [],
  scrollTop: 0,
}

export default (state = initState, action) => {
  switch (action.type) {
    case GET_COMPANYDETAIL:
      return {
        ...state,
        ...action.data,
        album: action.data.album,
      }
    case GET_COMPANYDETAIL_CLEAR:
      return {
        ...state,
        label: [],
      }
    case GET_COMPANYDETAIL_LIST:
      return {
        ...state,
        list: action.data.list,
      }
    case FLLOW_COMPANY:
      return {
        ...state,
        is_followed: 1,
      }
    case COMPANY_PAGE_UNMOUNT:
      return {
        ...state,
        scrollTop: action.scrollTop,
      }
    case UN_FLLOW_COMPANY:
      return {
        ...state,
        is_followed: 0,
      }
    case DELETE_COMPANY_INFO:
      return {}

    default:
      return state
  }
}
