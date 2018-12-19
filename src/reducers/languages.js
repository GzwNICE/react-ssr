import { $ as re$ } from '../actions/resume'
import { $ } from '../actions/languages'

const initialState = {
  list: [],
  get_languages: [],
  get_skills: [],
}

export default (state = initialState, action) => {
  switch (action.type) {
    case re$.get_all_info:
      return {
        ...state,
        list: action.payload && action.payload.get_languages,
      }
    // case $.edit:
    //   return {
    //     ...state,
    //     ...action.payload,
    //   }
    case $.lanSkills:
      return {
        ...state,
        get_languages: action.payload && action.payload.get_languages,
        get_skills: action.payload && action.payload.get_skills,
      }
    case $.remove:
      return {
        ...state,
        list: state.list.filter(item => item.id !== action.params.id),
      }
      
    default:
      return state
  }
}
