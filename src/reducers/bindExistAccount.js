import {
  GET_ACCOUNT_PAGE_DATA,
  ACCOUNT_IS_VERIFY,
  ACCOUNT_GET_MOBILE,
} from '../actions/bindExistAccount'

const initState = {
  listData: [],
  mobile: '',  // 手机号码
  needVerify: '',  // 默认为空，验证是否到绑定页面
}

export default (state = initState, action) => {
  switch (action.type) {
    case GET_ACCOUNT_PAGE_DATA: // bindExistAccount页面数据获取
      return {
        ...state,
        listData: action.payload,
      }
    case ACCOUNT_GET_MOBILE: // bindExistAccount页面数据获取
      return {
        ...state,
        mobile: action.payload,
      }
    case ACCOUNT_IS_VERIFY:
      return {
        ...state,
        needVerify: action.payload,
      }
    default:
      return state
  }
}