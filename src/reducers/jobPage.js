/**
 * Created by huangchao on 2017/10/25.
 */
import {
  JOB_SEARCH_INIT,
  JOB_SEARCH_ADD,
  JOB_SEARCH_ISLODING,
  JOB_SEARCH_LODING,
  JOB_SEARCH_REF,
  JOB_SEARCH_SAVE,
  JOB_PAGE_UNMOUNT,
  JOB_PAGE_DELETE_LIST,
} from '../actions/jobPage'

import {
  HOME_CHANGE_CITY,
} from '../actions/home'

import {
  SEARCH_END_SAVE,
} from '../actions/search'

const initState = {
  refreshing: false,
  isLoading: false,
  scrollTop:0,
  list: [],
  query: {
    more: {},
  },
  pager: {
    cur:1,
    count: '',
    allPage: '',
    size: 20,
  },
  company: {},
}

export default (state = initState, action) => {
  switch (action.type) {
    case JOB_SEARCH_SAVE: // job_page 的条件保存
      if(action.args.more) { // more 里面有值的话，覆盖state
        return {
          ...state,
          query: {
            ...state.query,
            ...action.args,
            more: {
              // ...state.query.more,
              ...action.args.more,
            },
          },
        }
      }  else {
        return {
          ...state,
          query: {
            ...state.query,
            ...action.args,
            more: {
              ...state.query.more,
              // ...action.args.more,
            },
          },
        }
      }
    case  SEARCH_END_SAVE: // search_end 的条件保存
      if(action.args.more){
        return {
          ...state,
          query: {
            ...state.query,
            ...action.args,
            more: {
              // ...state.query.more,
              ...action.args.more,
            },
          },
        }
      } else {
        return {
          ...state,
          query: {
            ...state.query,
            ...action.args,
            more: {
              ...state.query.more,
              // ...action.args.more,
            },
          },
        }
      }
    case HOME_CHANGE_CITY:
      return {
        ...state,
        query: {
          ...state.query,
          area: action.area,
          more: {
            ...state.query.more,
          },
        },
      }
    case JOB_SEARCH_ISLODING:
      return {
        ...state,
        isLoading: true,
        scrollTop: 0,
      }
    case JOB_SEARCH_LODING:
      return {
        ...state,
        refreshing: true,
      }
    case JOB_SEARCH_INIT:
      return {
        ...state,
        list: [...action.data.list],
        pager: {
          ...state.pager,
          count: action.data.count,
          allPage: Math.ceil(action.data.count / 20),
        },
        company: {
          ...action.company,
        },
      }
    case JOB_SEARCH_REF:
      return {
        ...state,
        refreshing: false,
        list: [...action.data.list],
        pager: {
          ...state.pager,
          cur: 1,
          count: action.data.count,
          allPage: Math.ceil(action.data.count / 20),
        },
      }
    case JOB_SEARCH_ADD:
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
    case JOB_PAGE_UNMOUNT:
      return {
        ...state,
        scrollTop: action.scrollTop,
      }
    case JOB_PAGE_DELETE_LIST:
      return {
        ...state,
        list: [],
      }
    default:
      return state
  }
}
