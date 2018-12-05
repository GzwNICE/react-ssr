import { singleApi } from '../helper/reduxFetch'
export const VISITY_INIT = 'VISITY_INIT'
export const VISITY_PAGE_UNMOUNT = 'VISITY_PAGE_UNMOUNT' // 页面卸载

const URLPOST = ':ve.mobile.interface/user/resume_viewed_list'

export const getVisityList = singleApi({
  url: URLPOST,
  action: (args, json) => {
    return {
      type: VISITY_INIT,
      data: json.data,
    }
  },
  cache: () => {
    return {
      state: 'visity',
      type: VISITY_INIT,
    }
  },
})

export const saveScrollTop = (top) => {
  return {
    type: VISITY_PAGE_UNMOUNT,
    scrollTop: top,
  }
}
