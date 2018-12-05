/**
 * Created by huangchao on 2018/4/13.
 */
import {
  MESSAGE_PAGE_UNMOUNT,
} from '../actions/massage'

import {
  HOME_POST_ISLODING,
} from '../actions/home'

const  initState = {
  scrollTop: 0,
}

export default (state = initState, action = {}) => {
  switch (action.type) {
    case MESSAGE_PAGE_UNMOUNT:
      return {
        ...state,
        scrollTop: action.scrollTop,
      }
    case HOME_POST_ISLODING:
      return {
        ...state,
        scrollTop: 0,
      }
    default:
      return state
  }
}