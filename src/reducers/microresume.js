import { MICRODONW, MICRODONWPARAMS } from '../actions/microresume'

const initState = {
  microresumeParams: {
    // gender: '1',  // 完善简历接口默认需要
  },
}

export default (state = initState, action) => {
  switch (action.type) {
    case MICRODONW:
      return {
        ...state,
        ...action.data,
      }
    case MICRODONWPARAMS:
      return {
        ...state,
        microresumeParams: action.paload,
      }
    default:
      return state
  }
}
