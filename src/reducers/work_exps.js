import { $ as re$ } from '../actions/resume'
import { $ } from '../actions/work_exps'

const initialState = {
  list: [],
  companyTipsList: [], // 获取公司联想词
  jcategoryTipsList: [], // 获取职位联想词
}

export default (state = initialState, action) => {
  switch (action.type) {
    case re$.get_all_info:
      return {
        ...state,
        list: action.payload && action.payload.get_work_exps,
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
    case $.getCompanyTips:
      return {
        ...state,
        companyTipsList: action.payload,
      }
    case $.getJcategoryTips:
      return {
        ...state,
        jcategoryTipsList: action.payload,
      }
    default:
      return state
  }
}
