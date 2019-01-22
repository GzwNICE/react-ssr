/**
 * Created by huangchao on 2018/4/13.
 */
import { singleApi } from '../helper/reduxFetch'
export const DELIVERY_HAS_NO = 'DELIVERY_HAS_NO' // 不合适
export const DELETE_DELIVERY_NO = 'DELETE_DELIVERY_NO' // 删除投递记录
export const DELETE_DELIVERY_NO_UNMOUNT = 'DELETE_DELIVERY_NO_UNMOUNT' // 页面卸载

const URLPOST = ':ve.mobile.interface/user/delivery'
const DELETE = ':ve.mobile.interface/user/deliveryDel'

export const getDeliveryNo = singleApi({
  url: URLPOST,
  action: (args, json) => {
    return {
      args,
      type: DELIVERY_HAS_NO,
      data: json.data,
    }
  },
  // cache: () => {
  //   return {
  //     state: 'DeliveryNo',
  //     type: DELIVERY_HAS_NO,
  //   }
  // },
})

export const DeletetDelivery = singleApi({
  url: DELETE,
  action: (args, json) => {
    return {
      args,
      type: DELETE_DELIVERY_NO,
      data: json.data,
    }
  },
})

export const saveScrollTop = (top) => {
  return {
    type: DELETE_DELIVERY_NO_UNMOUNT,
    scrollTop: top,
  }
}