/**
 * Created by gaozhiwen on 2019/1/22.
 */
import {
  BLOC_PAGE_UNMOUNT,
  GET_BLOCDETAIL_LIST,
  GET_BLOCDETAIL_CATEGORY,
  GET_BLOCDETAIL_SEARCH,
  GET_BLOCDETAIL_SEARCH_CLEAR,
  GET_BLOCDETAIL_LIST_CLEAR,
  SEARCH_BLOC_END_SAVE,
  SEARCH_SAVE_STATE,
} from '../actions/bloc'

const initState = {
  scrollTop: 0,
  list: [],
  pager: {},
  listPhoto: {},
  group_company_name: '',
  brand: [],
  brand_index: [],
  searchList: [],
  searchPager: {},
  query: {
    area:[],
    brand: [],
    keywords: '',
  },
}

export default (state = initState, action) => {
  switch (action.type) {
    case BLOC_PAGE_UNMOUNT:
      return {
        ...state,
        scrollTop: action.scrollTop,
      }
    case GET_BLOCDETAIL_LIST:
      return {
        ...state,
        list: action.data ? action.data.list : [],
        pager: {
          allPage: action.data.pager.allpages,
          cur: action.data.pager.cur,
          per: action.data.pager.per,
          total: action.data.pager.total,
        },
        listPhoto: {
          company_file: action.data.listPhoto.company_file,
        },
        group_company_name: action.data.group_company_name,
      }
    case GET_BLOCDETAIL_CATEGORY:
      return {
        ...state,
        brand: action.data.map(i => {
          return {
            code: i.id,
            value: i.category_name,
            hassub: 0,
            mode: 1,
          }
        }),
        brand_index: action.data.map(i => {
          return i.category_name
        }),
      }
    case GET_BLOCDETAIL_SEARCH:
      return {
        ...state,
        searchList: state.searchList.concat(action.data.data),
        searchPager: action.data.pager,
      }
    case GET_BLOCDETAIL_SEARCH_CLEAR:
      return {
        ...state,
        searchList: [],
        searchPager: {},
      }
    case GET_BLOCDETAIL_LIST_CLEAR:
      return {
        ...state,
        listPhoto: {},
      }
    case  SEARCH_BLOC_END_SAVE: // search_end 的条件保存
      return {
        ...state,
        query: {
          ...state.query,
          ...action.args,
          keywords: action.args.keywords,
        },
      }
    case SEARCH_SAVE_STATE:
      return {
        ...state,
        ...action.args,
      }
    default:
      return state
  }
}
