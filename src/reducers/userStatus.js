/**
 * Created by huangchao on 2017/10/30.
 */
import {
  GET_USER_STATUS,
  LOGIN_OUT,
  SAVE_USER_CITY_CODE,
  GET_USER_LOGIN,
} from '../actions/userStatus'
import {
  POSITION_APPLIED,
  POSITION_FAVORITED,
  POSITION_UN_FAVORITED,
} from '../actions/position'
import {
  FLLOW_COMPANY,
  UN_FLLOW_COMPANY,
} from '../actions/company'

import { // 设置简历状态
  SET_RESUME_STATUS,
} from '../actions/Privacy'

import {
  HOME_CHANGE_CITY,
} from '../actions/home'

import {
  SEARCH_END_SAVE,
} from '../actions/search'

// import {
//   JOB_SEARCH_SAVE,
// } from '../actions/jobPage'

const initState = {
  code: [],
  is_login: '',
  photo: '',
}

export default (state = initState, action) => {
  switch (action.type) {
    case SEARCH_END_SAVE:
      if(action.args.area) {
        return {
          ...state,
          code: action.args.area,
        }
      } else {
        return {
          ...state,
        }
      }
    // case JOB_SEARCH_SAVE:
    //   if(action.args.area) {
    //     // return {
    //     //   ...state,
    //     //   code: action.args.area,
    //     // }
    //   } else {
    //     return {
    //
    //     }
    //   }
    //   break
    case GET_USER_STATUS:
      return {
        ...state,
        ...action.data,
      }
    case GET_USER_LOGIN:
      // localStorage.setItem('is_login', action.data.is_login)
      localStorage.setItem('photo', action.data.photo)
      return {
        ...state,
        // ...action.data,
        is_login: action.data.is_login,
        photo: action.data.photo,
      }
    case HOME_CHANGE_CITY:
      return {
        ...state,
        code: action.area,
      }
    case POSITION_APPLIED:
      return {
        ...state,
        deliver_success_num: state.deliver_success_num + 1,
      }
    case POSITION_FAVORITED:
      return {
        ...state,
        favorited_num:state.favorited_num + 1,
      }
    case POSITION_UN_FAVORITED:
      return {
        ...state,
        favorited_num:state.favorited_num - 1,
      }
    case FLLOW_COMPANY:
      return {
        ...state,
        followed_num: state.followed_num + 1,
      }
    case UN_FLLOW_COMPANY:
      return {
        ...state,
        followed_num: state.followed_num - 1,
      }
    case SET_RESUME_STATUS:
      return {
        ...state,
        resume_status: action.args.privacy,
      }
    case SAVE_USER_CITY_CODE:
      return{
        ...state,
        code: action.code.code,
      }
    case LOGIN_OUT:
      return {}
    default:
      return state
  }
}