/**
 * Created by gaozhiwen on 2019/1/22.
 */
import { singleApi } from '../helper/reduxFetch'
export const GET_DELIVERY_ALL = 'GET_DELIVERY_ALL' // 全部
export const DELIVERY_REMIND_HR = 'DELIVERY_REMIND_HR' // 提醒企业
export const DELETE_DELIVERY_ALL = 'DELETE_DELIVERY_ALL' // 删除投递记录
export const DELIVERY_ALL_PAGE_UNMOUNT = 'DELIVERY_ALL_PAGE_UNMOUNT' // 页面卸载

const URLPOST = ':ve.mobile.interface/user/delivery'
const DELETE = ':ve.mobile.interface/user/deliveryDel'
const hr = ':ve.mobile.interface/resume/remindhr'

export const getDeliveryAll = singleApi({
  url: URLPOST,
  action: (args, json) => {
    return {
      args,
      type: GET_DELIVERY_ALL,
      data: json.data,
    }
  },
  // cache: () => {
  //   return {
  //     state: 'DeliveryAll',
  //     type: GET_DELIVERY_ALL,
  //   }
  // },
})

export const DeletetDelivery = singleApi({
  url: DELETE,
  action: (args, json) => {
    return {
      args,
      type: DELETE_DELIVERY_ALL,
      data: json.data,
    }
  },
})

export const remindHr = singleApi({
  url: hr,
  action: (args, json) => {
    return {
      args,
      type: DELIVERY_REMIND_HR,
      data: json.data,
    }
  },
})

export const saveScrollTop = (top) => {
  return {
    type: DELIVERY_ALL_PAGE_UNMOUNT,
    scrollTop: top,
  }
}