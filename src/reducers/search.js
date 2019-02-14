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
  SEARCH_SAVE_STATE,
  SEAND_PAGE_UNMOUNT,
  SEAND_PAGE_GOBACK,
  SEARCH_SALARYSHOW,
  SEARCH_SALARYSTRING,
  SEARCH_SALARYRANGE,
  SEARCH_EMPTY_ALL,
  SEARCH_AREA_SINGLE,
  SEARCH_AREA_SELECTED_CITY,
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
    brand: [],
    keywords: '',
  },
  pager: {
    cur:1,
    count: '',
    allPage: '',
    size: 20,
  },
  company: {},
  salaryShow: false, // 薪资下拉框显示隐藏
  salaryString: '',
  searchEndSalary: {
    defaultRange: [0, 20],
    rangeString: '不限',
    rangeTitle: '薪资',
  },
  searchState: false,
  searchKeyword: '',
  areaCode: [],  // searchPage页city code
  toogleSet: false,
  selectProjectFirst: true,
}

export default (state = initState, action) => {
  switch (action.type) {
    case SEARCH_AREA_SELECTED_CITY:
    return {
      ...state,
      selectProjectFirst: action.payload,
    }
    case SEARCH_AREA_SINGLE:
    return {
      ...state,
      areaCode: action.payload,
    }
    case SEARCH_EMPTY_ALL:
    return {
      ...state,
      hot: [],
      tips: {},
      scrollTop: 0,
      refreshing: false,
      isLoading: false,
      list: [],
      query: {
        ...state.query,
        // area:[],
        more: {},
        brand: [],
        keywords: '',
      },
      pager: {
        cur:1,
        count: '',
        allPage: '',
        size: 20,
      },
      company: {},
      salaryShow: false, // 薪资下拉框显示隐藏
      salaryString: '',
      searchEndSalary: {
        defaultRange: [0, 20],
        rangeString: '不限',
        rangeTitle: '薪资',
      },
      searchState: false,
      selectProjectFirst: true,
    }
    case SEARCH_SALARYRANGE:
    return {
      ...state,
      searchEndSalary: action.payload,
    }
    case SEARCH_SALARYSTRING:
      return {
        ...state,
        salaryString: action.payload,
      }
    case SEARCH_SALARYSHOW: // 薪资下拉框显示隐藏
      return {
        ...state,
        salaryShow: action.payload,
      }
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
            keywords: action.args.keywords,
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
            keywords: action.args.keywords,
            more: {
              ...state.query.more,
              // ...action.args.more,
            },
          },
        }
      }
    case SEARCH_SAVE_STATE:
      return {
        ...state,
        ...action.args,
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
          allPage: Math.ceil(action.data.count / 20),
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
        hot: [],
        tips: {},
        scrollTop: 0,
        refreshing: false,
        isLoading: false,
        list: [],
        query: {
          ...state.query,
          // area:[],
          more: {},
          brand: [],
          keywords: '',
          salary: [0, 1000000],
        },
        pager: {
          cur:1,
          count: '',
          allPage: '',
          size: 20,
        },
        company: {},
        salaryShow: false, // 薪资下拉框显示隐藏
        salaryString: '',
        searchEndSalary: {
          defaultRange: [0, 20],
          rangeString: '不限',
          rangeTitle: '薪资',
        },
        searchState: false,
        selectProjectFirst: true,
      }
    default:
      return state
  }
}