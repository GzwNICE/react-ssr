/**
 * Created by huangchao on 2018/4/13.
 */
import {
  GET_DELIVERY_ALL,
  DELETE_DELIVERY_ALL,
  DELIVERY_REMIND_HR,
  DELIVERY_ALL_PAGE_UNMOUNT,
} from '../actions/DeliveryAll'

import {
  DELETE_DELIVERY_RECORD_CACHE,
} from '../actions/DeliveryRecord'

const initState = {
  scrollTop: 0,
  list: [],
}

export default (state = initState, action) => {
  switch (action.type) {
    case GET_DELIVERY_ALL:
      return {
        ...state,
        list: [...action.data],
      }
    case DELETE_DELIVERY_ALL:
      return {
        ...state,
        list: state.list.filter(d => {
          return d.job_id !== action.args.job_id
        }),
      }
    case DELIVERY_REMIND_HR:
      return {
        ...state,
        list: state.list1.map((data) => {
          if(data.company_id === action.args.company_id) {
            data.clickable = 0
          }
          return data
        }),
      }
    case DELIVERY_ALL_PAGE_UNMOUNT:
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