/**
 * Created by huangchao on 2017/10/31.
 * 仅用于收藏的ITEM
 */

import React from 'react'
import style from './style.less'
import text from '../../static/icon_feedback_im.png'

const CollectCompanyItem = (props) => {
  const {company_logo, company_name, current_location, industry_star,employees_number,followed_date,new_job_name, jobs_num, myfollowed_job_new } = props
  return (
    <div className={style.CollectCompanyItemWrap}>
      <div className={style.innerContent}>
        <div className={style.leftContent}>
          <img src={company_logo || text} alt="logo" />
          {myfollowed_job_new ? <div className={style.drop} /> : null }
        </div>
        <div className={style.rightContent}>
          <div className={style.top}>
            {company_name}
          </div>
          <div className={style.middle}>
            {/*<div className={style.middLeft}>
              <span>{jobs_num}个</span>在招职位
            </div>
            <div className={style.middRight}>
              {followed_date.split(' ')[0]}关注
            </div>*/}
            <span>{current_location}</span>
            <span>{industry_star}</span>
            <span>{employees_number}</span>
          </div>
        </div>
      </div>
      <div className={style.middLeft}>
        热招：<span>{new_job_name}</span> 等{jobs_num}个在招职位
      </div>
    </div>
  )
}

export default CollectCompanyItem
