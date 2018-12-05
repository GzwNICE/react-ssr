import {
  VISITY_INIT,
  VISITY_PAGE_UNMOUNT,
} from '../actions/visity'

const initState = {
  list: [],
  page: {},
  scrollTop: 0,
  refreshing: false,
}

export default (state = initState, action) => {
  switch(action.type) {
    case VISITY_INIT:
      return {
        ...state,
        list: action.data.list.splice(0,100),
      }
    case VISITY_PAGE_UNMOUNT:
      return {
        ...state,
        scrollTop: action.scrollTop,
      }
    default: 
      return state
  }
}