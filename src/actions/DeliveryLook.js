/**
 * Created by huangchao on 2018/4/13.
 */
import { singleApi } from '../helper/reduxFetch'
export const DELIVERY_HAS_LOOK = 'DELIVERY_HAS_LOOK' // 已查看
export const DELETE_DELIVERY_LOOK = 'DELETE_DELIVERY_LOOK' // 删除投递记录
export const DELETE_DELIVERY_LOOK_UNMOUNT = 'DELETE_DELIVERY_LOOK_UNMOUNT' // 页面卸载

const URLPOST = ':ve.mobile.interface/user/delivery'
const DELETE = ':ve.mobile.interface/user/deliveryDel'

export const getDeliveryLook = singleApi({
  url: URLPOST,
  action: (args, json) => {
    return {
      args,
      type: DELIVERY_HAS_LOOK,
      data: json.data,
    }
  },
  // cache: () => {
  //   return {
  //     state: 'DeliveryLook',
  //     type: DELIVERY_HAS_LOOK,
  //   }
  // },
})

export const DeletetDelivery = singleApi({
  url: DELETE,
  action: (args, json) => {
    return {
      args,
      type: DELETE_DELIVERY_LOOK,
      data: json.data,
    }
  },
})

export const saveScrollTop = (top) => {
  return {
    type: DELETE_DELIVERY_LOOK_UNMOUNT,
    scrollTop: top,
  }
}