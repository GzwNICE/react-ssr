/**
 * Created by huangchao on 2018/4/13.
 */
import {
  DELIVERY_HAS_NO,
  DELETE_DELIVERY_NO,
  DELETE_DELIVERY_NO_UNMOUNT,
} from '../actions/DeliveryNo'

import {
  DELETE_DELIVERY_RECORD_CACHE,
} from '../actions/DeliveryRecord'

const initState = {
  scrollTop: 0,
  list: [],
}

export default (state = initState, action) => {
  switch (action.type) {
    case DELIVERY_HAS_NO:
      return {
        ...state,
        list: [...action.data],
      }
    case DELETE_DELIVERY_NO:
      return {
        ...state,
        list: state.list.filter(d => {
          return d.job_id !== action.args.job_id
        }),
      }
    case DELETE_DELIVERY_NO_UNMOUNT:
      return {
        ...state,
        scrollTop: action.scrollTop,
      }
    case DELETE_DELIVERY_RECORD_CACHE:
      return {
        ...state,
        scrollTop: 0,
        list: [],
      }
    default:
      return state
  }
}