/**
 * Created by huangchao on 2018/4/13.
 */
import { singleApi } from '../helper/reduxFetch'
export const DELIVERY_HAS_INVITE = 'DELIVERY_HAS_INVITE' // 面试
export const DELETE_DELIVERY_INVITE = 'DELETE_DELIVERY_INVITE' // 删除投递记录
export const DELETE_INVITE_PAGE_UNMOUNT = 'DELETE_INVITE_PAGE_UNMOUNT' // 页面卸载

const URLPOST = ':ve.mobile.interface/user/delivery'
const DELETE = ':ve.mobile.interface/user/deliveryDel'

export const getDeliveryInvite = singleApi({
  url: URLPOST,
  action: (args, json) => {
    return {
      args,
      type: DELIVERY_HAS_INVITE,
      data: json.data,
    }
  },
  cache: () => {
    return {
      state: 'DeliveryInvite',
      type: DELIVERY_HAS_INVITE,
    }
  },
})

export const DeletetDelivery = singleApi({
  url: DELETE,
  action: (args, json) => {
    return {
      args,
      type: DELETE_DELIVERY_INVITE,
      data: json.data,
    }
  },
})

export const saveScrollTop = (top) => {
  return {
    type: DELETE_INVITE_PAGE_UNMOUNT,
    scrollTop: top,
  }
}