/**
 * Created by huangchao on 2018/5/3.
 */
export const SAVE_PAGE_SCROLL_TOP = 'SAVE_PAGE_SCROLL_TOP' // 存储页面滚动的距离

export const saveScrollTop = (page, top = 0, key = "1") => {
  return {
    type: SAVE_PAGE_SCROLL_TOP,
    page: page,
    scrollTop: top,
    key: key,
  }
}