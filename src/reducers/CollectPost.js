/**
 * Created by huangchao on 2017/11/1.
 */
import {
  GET_COLLECTPOST_INIT,
  DELETE_COLLECT_POST,
  COLLECT_PAGE_UN_MOUNT,
  COLLECT_PAGE_DELETE_CACHE,
} from '../actions/CollectPost'

const initState = {
  refreshing: false,
  isLoading: false,
  scrollTop: 0,
  list: [],
  pager: {
    cur:1,
    count: '',
    allPage: '',
    size: 20,
  },
}

export default (state = initState, action) => {
  switch (action.type) {
    case GET_COLLECTPOST_INIT:
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
    case DELETE_COLLECT_POST:
      return {
        ...state,
        list: state.list.filter(v => {
          return v.job_id !== action.args.job_id
        }),
      }
    case COLLECT_PAGE_UN_MOUNT:
      return{
        ...state,
        scrollTop: action.scrollTop,
      }
    case COLLECT_PAGE_DELETE_CACHE:
      return {
        ...state,
        scrollTop: 0,
        list: [],
      }
    default:
      return state
  }
}
