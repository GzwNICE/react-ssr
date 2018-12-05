/**
 * Created by huangchao on 2017/11/2.
 */

import {
  GET_SYSTEMMESSAEG_INIT,
  GET_SYSTEMMESSAEG_DETAIL,
  SYSTEM_MESSAGE_UN_MOUNT,
} from '../actions/SystemMessage'

const initState = {
  scrollTop: 0,
  list: [],
  detail: {},
}

export default (state = initState, action) => {
  switch (action.type) {
    case GET_SYSTEMMESSAEG_INIT:
      return {
        ...state,
        list: [...action.data.list],
      }
    case GET_SYSTEMMESSAEG_DETAIL:
      return {
        ...state,
        detail: action.data,
      }
    case SYSTEM_MESSAGE_UN_MOUNT:
      return {
        ...state,
        scrollTop: action.scrollTop,
      }
    default:
      return state
  }
}

