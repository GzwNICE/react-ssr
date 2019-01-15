import { MICRODONW } from '../actions/microresume'
import { MICRODONWPARAMS } from '../actions/microresume'

const initState = {}

export default (state = initState, action) => {
  switch (action.type) {
    case MICRODONW:
      return {
        ...state,
        ...action.data,
      }
    case MICRODONWPARAMS:
    console.log(action)
      return {
        ...state,
        ...action.paload,
      }
    default:
      return state
  }
}
