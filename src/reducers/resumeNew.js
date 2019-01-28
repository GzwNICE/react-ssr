/**
 * Created by huangchao on 2017/10/20.
 */
import {
  RESUMETOOGLE,
} from '../actions/resumeNew'


const initState = {
  
  toogleSet: false,
}

export default (state = initState, action) => {
  switch (action.type) {
    case RESUMETOOGLE:
    return { 
      toogleSet: action.payload,
    }
    default:
      return state
  }
}