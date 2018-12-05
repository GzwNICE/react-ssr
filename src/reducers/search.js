/**
 * Created by huangchao on 2017/10/20.
 */
import {
  SEARCH_HOT,
  SEARCH_TIPS,
  SEARCH_LIST_INIT,
  SEARCH_LIST_ISLODING,
  SEARCH_LIST_ADD,
  SEARCH_END_SAVE,
  SEAND_PAGE_UNMOUNT,
  SEAND_PAGE_GOBACK,
} from '../actions/search'

import {
  JOB_SEARCH_SAVE,
} from '../actions/jobPage'

import {
  HOME_CHANGE_CITY,
} from '../actions/home'

const initState = {
  hot: [],
  tips: {},
  scrollTop: 0,
  refreshing: false,
  isLoading: false,
  list: [],
  query: {
    area:[],
    more: {},
  },
  pager: {
    cur:1,
    count: '',
    allPage: '',
    size: 15,
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
    case SEARCH_HOT:
      return {
        ...state,
        hot: [...action.data],
      }
    case SEARCH_TIPS:
      return {
        ...state,
        tips: {...action.data},
      }
    case SEARCH_LIST_ISLODING:
      return {
        ...state,
        isLoading: true,
        scrollTop: 0,
      }
    case SEARCH_LIST_INIT:
      return {
        ...state,
        list: [...action.data.list],
        company: action.data.company,
        pager: {
          ...state.pager,
          count: action.data.count,
          allPage: Math.ceil(action.data.count / 15),
        },
      }
    case SEARCH_LIST_ADD:
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
    case SEAND_PAGE_UNMOUNT:
      return {
        ...state,
        scrollTop: action.scrollTop,
      }
    case SEAND_PAGE_GOBACK:
      return {
        ...state,
        list: [],
        scrollTop: 0,
      }
    default:
      return state
  }
}