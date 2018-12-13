import React from 'react'
import { Card } from 'antd-mobile'
import style from './style.less'
import area from '../../static/area@3x.png'
import experience from '../../static/experience@3x.png'
import education from '../../static/education@3x.png'
import jobType from '../../static/jobType@3x.png'
import F from '../../helper/tool'

const JobDetailsCard = (props) => {
  const data = props.position || {}
  const datalabel = props.position.company_detail || {}
  const age = data.conditions ? `${data.conditions}岁` : '年龄不限'
  const job_name = data.job_name && data.job_name.replace(/&amp;/g, '&')
  const room_board = data.room_board ? `${data.room_board}/` : null
  return (
    <div className={style.jobCard}>
        <div className={style.cardHeader}>
          <div className={style.name}>{job_name}</div>
          <span className={style.salary}>{data.salary}</span>
        </div>
        <div className={style.inner}>
          <ul className={style.mustBeCon}>
            <li style={{background: `url(${area}) no-repeat left center/0.12rem`}}>{data.work_place}</li>
            <li style={{background: `url(${experience}) no-repeat left center/0.14rem`}}>{data.exp}</li>
            <li style={{background: `url(${education}) no-repeat left center/0.14rem`}}>{data.education}</li>
            <li style={{background: `url(${jobType}) no-repeat left center/0.14rem`}}>{data.nature}</li>
          </ul>
        </div>
      <Card.Body className={style.cardCenter}>
        
      </Card.Body>
    </div>
  )
}
export default JobDetailsCard
