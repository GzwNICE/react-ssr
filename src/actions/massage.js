/**
 * Created by huangchao on 2018/4/13.
 */
export const MESSAGE_PAGE_UNMOUNT = 'MESSAGE_PAGE_UNMOUNT' // 页面卸载

export const saveScrollTop = (top) => {
  return {
    type: MESSAGE_PAGE_UNMOUNT,
    scrollTop: top,
  }
}