import store from 'store'
import { LOGIN_OUT } from '../actions/userStatus'
import storageSync from '../helper/storage-sync'
import { WEIXIN_SHARE_INIT } from '../actions/auth'

const initialState = { wxconfig: {}}

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
    default:
      return store.get('m:auth') || {}
  }
}

export default storageSync('m:auth', reducers)
