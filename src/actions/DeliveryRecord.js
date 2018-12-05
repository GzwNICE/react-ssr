/**
 * Created by huangchao on 2017/11/1.
 */
import { singleApi } from '../helper/reduxFetch'

export const DELETE_DELIVERY_RECORD_CACHE = 'DELETE_DELIVERY_RECORD_CACHE' // 清除投递记录的缓存
const read = ':ve.mobile.interface/user/ReadResume' // 已读信息接口

export const readResume = singleApi({
  url: read,
  action: (args, json) => {
    return {
      args,
      data: json.data,
    }
  },
})

export const deleteCache = () => {
  return {
    type : DELETE_DELIVERY_RECORD_CACHE,
  }
}
