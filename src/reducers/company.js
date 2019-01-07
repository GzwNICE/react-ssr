/**
 * Created by huangchao on 2017/10/24.
 */
import {
  GET_COMPANYDETAIL,
  FLLOW_COMPANY,
  UN_FLLOW_COMPANY,
  GET_COMPANYDETAIL_LIST,
  DELETE_COMPANY_INFO,
  GET_BLOCDETAIL_CATEGORY,
  GET_BLOCDETAIL_LIST,
} from '../actions/company'

const initState = {
  list: [],
  pager: {},
  listPhoto: {},
  brand: [],
  brand_index: [],
}

export default (state = initState, action) => {
  switch (action.type) {
    case GET_COMPANYDETAIL:
      return {
        ...state,
        ...action.data,
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
    case UN_FLLOW_COMPANY:
      return {
        ...state,
        is_followed: 0,
      }
    case DELETE_COMPANY_INFO:
      return {}
    case GET_BLOCDETAIL_CATEGORY:
      return {
        ...state,
        brand: action.data.map(i=>{
          return {
            code: i.id,
            value: i.category_name,
            hassub: 0,
            mode: 1,
          }
        }),
        brand_index: action.data.map(i=>{
          return i.category_name
        }),
      }
    case GET_BLOCDETAIL_LIST:
      return {
        ...state,
        list: action.data.list || [],
        pager: {
          allPage: action.data.pager.allpages,
          cur: action.data.pager.cur,
          per: action.data.pager.per,
          total: action.data.pager.total,
        },
        listPhoto: {
          company_file: action.data.listPhoto.company_file,
        },
      }
    default:
      return state
  }
}

