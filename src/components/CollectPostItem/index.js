/**
 * Created by huangchao on 2017/11/1.
 * 仅用于收藏的职位ITEM
 */
import React from 'react'
import end from '@static/icon_deliver_stop.png'
import style from './style.less'
// import text from '@static/icon_feedback_im.png'

const CollectPostItem = (props) => {
  const {company_name, is_stop,salary, job_name, job_area, favorite_date} = props
  const name = job_name && job_name.replace(/&amp;/g, '&')
  return (
    <div className={style.CollectPostItemWrap}>
      <div className={style.JobCardTwoWrap}>
        <div className={style.top}>
          <div className={style.left}>
            <div className={style.position}>{name}</div>
          </div>
          <div className={style.salary}>
            {salary}
          </div>
          
        </div>
        <div className={style.middle}>
          <div className={style.companyName}>
            {company_name}
          </div>
          <div className={style.time}>
            {favorite_date.split(' ')[0]}
          </div>
        </div>
        <div className={style.footerBox}>
          <div className={style.footerLeft}>
            {job_area}
          </div>
        </div>
        {is_stop ? <div className={style.hot} style={{ background: `url(${end}) center/ cover no-repeat` }}></div> : null }
      </div>
    </div>
  )
}

export default CollectPostItem
