import { $ as re$ } from '../actions/resume'
import { $ } from '../actions/other_exps'

const initialState = {
  list: [],
}

export default (state = initialState, action) => {
  switch (action.type) {
    case re$.get_all_info:
      return {
        ...state,
        list:action.payload && action.payload.self_description,
      }
    // case $.edit:
    //   return {
    //     ...state,
    //     ...action.payload,
    //   }
    case $.remove:
      return {
        ...state,
        list: state.list.filter(item => item.id !== action.params.id),
      }

    case $.edit:
      return {
        ...state,
        ...action.payload,
      }
    default:
      return state
  }
}
