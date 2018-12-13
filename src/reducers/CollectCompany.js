/**
 * Created by huangchao on 2017/10/31.
 */
import {
  GET_COLLECTCOMPANY_INIT,
  GET_COLLECTCOMPANY_ISLODING,
  GET_COLLECTCOMPANY_ADD,
  DELETE_COMPANY,
  COLLECT_COMPANY_PAGE_UNMOUNT,
  DELETE_COMPANY_PAGE_CACHR,
} from '../actions/CollectCompany'

const initState = {
  refreshing: false,
  isLoading: false,
  list: [],
  scrollTop: 0,
  pager: {
    cur:1,
    count: '',
    allPage: '',
    size: 20,
  },
}

export default (state = initState, action) => {
  switch (action.type) {
    case GET_COLLECTCOMPANY_ISLODING:
      return {
        ...state,
        isLoading: true,
      }
    case GET_COLLECTCOMPANY_INIT:
      return {
        ...state,
        list: [...action.data.list],
        pager: {
          ...state.pager,
          cur: 1,
          count: action.data.count,
          allPage: Math.ceil(action.data.count / 20),
        },
      }
    case DELETE_COMPANY:
      return {
        ...state,
        list: state.list.filter(v => {
          return v.company_id !== action.args.company_id
        }),
      }
    case GET_COLLECTCOMPANY_ADD:
      return {
        ...state,
        isLoading: false,
        list: [
          ...state.list,
          ...action.data.list,
        ],
        pager: {
          ...state.pager,
          cur: action.args.page,
        },
      }
    case COLLECT_COMPANY_PAGE_UNMOUNT:
      return {
        ...state,
        scrollTop: action.scrollTop,
      }
    case DELETE_COMPANY_PAGE_CACHR:
      return {
        ...state,
        list: [],
        scrollTop: 0,
      }
    default:
      return state
  }
}