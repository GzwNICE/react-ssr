import { $ } from '../actions/option'
import storageSync from '../helper/storage-sync'

const initialState = {
}

const reducers = (state = initialState, action) => {
  switch (action.type) {
    case $.load:
      action.payload['time'] = new Date().getTime()
      return {
        ...state,
        ...action.payload,
      }

    default:
      return state
  }
}

export default storageSync('m:option', reducers)
