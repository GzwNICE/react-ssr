/**
 * Created by huangchao on 2018/5/3.
 */
import {
  SAVE_PAGE_SCROLL_TOP,
} from '../actions/PageScroll'

const initState = {}


export default (state = initState, action) => {
  switch (action.type) {
    case SAVE_PAGE_SCROLL_TOP:
      const page = action.page
      state[page] = {
        page: action.scrollTop,
        key: action.key,
      }
      return {
        ...state,
      }
    default:
      return state
  }
}