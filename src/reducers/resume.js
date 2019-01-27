import { $ } from '../actions/resume'
import F from '../helper/tool'

export default (state = {}, action) => {
  switch (action.type) {
    case $.resumetoogle:
    // console.log(action.payload)
      return {
        ...state,
        toogleSet: action.payload,
      }
      case $.get_all_info:
      return {
        ...(action.payload && action.payload.get_base),
      }
    case $.edit:
      return {
        ...state,
        ...action.payload,
      }
    case 'TEMPORARY_SAVE':
      return {
        ...state,
        ...action.payload,
      }
    case 'CHANGE_BIND_EMAIL_VALUE':
      return {
        ...state,
        is_email_bind: '1',
        email: action.payload,
        hidden_email: F.hidden_email(action.payload),
      }
    case 'CHANGE_BIND_MOBILE_VALUE':
      return {
        ...state,
        is_phone_bind: '1',
        mobile: action.payload,
        hidden_mobile: F.hidden_mobile(action.payload),
      }
    default:
      return state
  }
}
