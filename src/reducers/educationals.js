import { $ as re$ } from '../actions/resume'
import { $ } from '../actions/educationals'

const initialState = {
  list: [],
  school: [],
  major: [],
}

export default (state = initialState, action) => {
  switch (action.type) {
    case $.get_major_tips:
      return {
        ...state,
        major: action.payload,
      }
    case $.get_school_tips:
      return {
        ...state,
        school: action.payload,
      }
    case re$.get_all_info:
      return {
        ...state,
        list: action.payload && action.payload.get_edu_exps,
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

    default:
      return state
  }
}
