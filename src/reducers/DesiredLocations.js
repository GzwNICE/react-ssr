import { $ } from '../actions/resume'

const initialState = {
  list: [],
}

export default (state = initialState, action) => {
  switch (action.type) {
    case $.get_all_info:
      return {
        ...state,
        list: action.payload && action.payload.get_intention.PersonDesiredLocation,
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
