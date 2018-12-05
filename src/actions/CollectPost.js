/**
 * Created by huangchao on 2017/11/1.
 */
import { singleApi } from '../helper/reduxFetch'
export const GET_COLLECTPOST_INIT = 'GET_COLLECTPOST_INIT' // 获取收藏的职位
export const DELETE_COLLECT_POST = 'DELETE_COLLECT_POST' // 删除收藏的职位
export const GET_COLLECTPOST_ADD = 'GET_COLLECTPOST_ADD' // 上拉加载
export const GET_COLLECTPOST_ISLODING = 'GET_COLLECTPOST_ISLODING' // isloding
export const COLLECT_PAGE_UN_MOUNT = 'COLLECT_PAGE_UN_MOUNT' //页面卸载
export const COLLECT_PAGE_DELETE_CACHE = 'COLLECT_PAGE_DELETE_CACHE' // 删除缓存

const URLPOST = ':ve.mobile.interface/user/favorited_jobs'
const DELETE = ':ve.mobile.interface/user/delete_favorite_job'

export const getCollectPostInit = singleApi({
  url: URLPOST,
  action: (args, json) => {
    return {
      type: GET_COLLECTPOST_INIT,
      data: json.data,
    }
  },
  cache: () => {
    return {
      state: 'CollectPost',
      type: GET_COLLECTPOST_INIT,
    }
  },
})

export const deletePost = singleApi({
  url: DELETE,
  action: (args, json) => {
    return {
      args,
      type: DELETE_COLLECT_POST,
      data: json.data,
    }
  },
})

export const getCollectCompantInitAdd = singleApi({
  url:URLPOST,
  action: (args, json) => {
    return{
      args,
      type: GET_COLLECTPOST_ADD,
      data: json.data,
    }
  },
  prelude: () => {
    return {
      type: GET_COLLECTPOST_ISLODING,
    }
  },
})

export const saveScrollTop = (top) => {
  return {
    type: COLLECT_PAGE_UN_MOUNT,
    scrollTop: top,
  }
}

export const deleteCache = () => {
   return {
     type: COLLECT_PAGE_DELETE_CACHE,
   }
}

