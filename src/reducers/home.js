/**
 * Created by huangchao on 2017/10/23.
 */
import {
  HOME_POST_INIT,
  HOME_POST_STARING,
  HOME_POST_ISLODING,
  HOME_POST_REF,
  HOME_POST_ADD,
  HOME_PAGE_UNMOUNT,
  HOME_FAM_COMPANY,
  HOME_HOT_TRADE,
} from '../actions/home'

import {
  LOGIN_OUT,
} from '../actions/userStatus'

const initState = {
  scrollTop: 0,
  refreshing: false,
  isLoading: false,
  list: [],
  pager: {
    cur:  1,
  },
  photoData: [],
  tradeDtata: [],
}

export default (state = initState, action = {}) => {
  switch (action.type) {
    case HOME_POST_INIT:
      return {
        ...state,
        list: action.data && [...action.data.list.data],
        pager: {...action.data.list.pager},
      }
    case HOME_POST_STARING:
      return {
        ...state,
        refreshing: true,
      }
    case HOME_POST_ISLODING:
      return {
        ...state,
        scrollTop: 0,
        isLoading: true,
      }
    case HOME_POST_REF:
      return {
        ...state,
        list: [...action.data.list.data],
        pager: {...action.data.list.pager},
        refreshing: false,
      }
    case HOME_POST_ADD:
      return {
        ...state,
        isLoading: false,
        list: [
          ...state.list,
          ...action.data.list.data,
        ],
        pager: {
          ...state.pager,
          cur: action.args.page,
        },
      }
    case HOME_PAGE_UNMOUNT:
      return {
        ...state,
        scrollTop: action.scrollTop,
      }
    case LOGIN_OUT:
      return {
        ...state,
        list: [],
      }
    case HOME_FAM_COMPANY:
      return {
        ...state,
        photoData: action.data,
      }
    case HOME_HOT_TRADE:
      return {
        ...state,
        tradeDtata: action.data,
      }
    default:
      return state
  }
}
