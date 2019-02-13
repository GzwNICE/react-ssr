import store from 'store'
import { LOGIN_OUT } from '../actions/userStatus'
import storageSync from '../helper/storage-sync'
import { WEIXIN_SHARE_INIT, WEIXIN_SHARE_TEXT } from '../actions/auth'

const initialState = { wxconfig: {}, wxShare: {}}

const reducers = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_OUT: {
      return {}
    }
    case WEIXIN_SHARE_INIT:
      return {
        ...state,
        wxconfig: action.data,
      }
    case WEIXIN_SHARE_TEXT:
      return {
        ...state,
        wxShare: action.data,
      }
    default:
      return store.get('m:auth') || {}
  }
}

export default storageSync('m:auth', reducers)
