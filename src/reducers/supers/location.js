import { $ as location$ } from '../../actions/supers/location'
import { SAVE_USER_CITY_CODE } from '../../actions/userStatus'
import { JOB_SEARCH_SAVE, JOB_PAGE_CITY_CODE_SET } from '../../actions/jobPage'
import { SEARCH_END_SAVE } from '../../actions/search'

export * from './location'

const initialState = {
  address: {
    code: [],
  },
  address2: {
    code: [],
  },
}

export default (state = initialState, action) => {
  switch (action.type) {
    case location$.location_load:
      return {
        ...state,
        // ...action.payload,
        address2: {
          ...initialState.address2,
          ...action.payload.address,
        },
      }
    case JOB_PAGE_CITY_CODE_SET:
      return {
        ...state,
        address: {
          code: action.area,
        },
      }
    case JOB_SEARCH_SAVE:
      if (action.args.area && action.args.area.length > 0) {
        return {
          ...state,
          ...action.payload,
          address: {
            ...initialState.address,
            code: action.args.area,
          },
        }
      } else {
        return {
          ...state,
        }
      }
    case SEARCH_END_SAVE:
      if (action.args.area && action.args.area.length > 0) {
        return {
          ...state,
          ...action.payload,
          address: {
            ...initialState.address,
            code: action.args.area,
          },
        }
      } else {
        return {
          ...state,
        }
      }
    case SAVE_USER_CITY_CODE:
      return {
        ...state,
        // ...action.payload,
        // address: {
        //   ...initialState.address,
        //   code: action.code.code,
        // },
      }
    default:
      return state
  }
}
