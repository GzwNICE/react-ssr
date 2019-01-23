import React from 'react'
import F from '../../helper/tool'
import style from './style.less'
// import { Card } from 'antd-mobile'
import jizhaoIcon from '../../static/jizhao@3x.png'

const JobCard = (props) => {
  const data = props.data || {}
  const exp = data.exp ? ` | ${data.exp}` : null
  const education = data.education ? ` | ${data.education}` : null
  const room_board = data.room_board ? ` | ${data.room_board}` : null
  const company_size = data.company_size ? ` | ${data.company_size}` : null

  // console.log(data)
  const job_name = data.job_name && data.job_name.replace(/&amp;/g, '&')
  return <div className={style.JobCardTwoWrap}>
    <div className={style.top}>
      <div className={style.left}>
        <div className={style.position}>
        <span className={style.ellipsis}>{job_name}</span>
        {data.is_urgent === '1'
          ? <img className={style.jizhao} src={jizhaoIcon} /> : null }
        </div>
        
      </div>
      <div className={style.salary}>
        {data.salary}
      </div>
    </div>
    <div className={style.middle}>
      <div className={style.companyName}>
        {data.work_place}{exp}{education}{room_board}
      </div>
      <div className={style.time}>
        {F.procesTime(data.update_time)}
      </div>
    </div>
    <div className={style.footerBox}>
    <img src={data.company_logo} />
      <div>
        <p className={style.ellipsis2}>{data.company_name}</p>
        <p>{data.industry_star}{company_size}</p>
      </div>
    </div>
  </div>
}
export default JobCard

/*
 <Card className={style.jobCard}>
 <Card.Header
 className={style.cardHeader}
 title={
 <div className={style.cardTiele}>
 {data.job_name}
 {data.is_urgent === '1'
 ? <span className={style.hot}>热招</span> : null }
 </div>
 }
 extra={<span className={style.salary}></span>}
 />
 <Card.Body className={style.cardCenter}>
 <div className={style.inner}>
 <div className={style.hotelName}>{data.company_name}</div>
 <div className={style.dataTime}>{F.procesTime(data.update_time)}</div>
 </div>
 </Card.Body >
 <Card.Footer
 className={style.cardFooter}
 content={data.work_place || data.job_area}
 />
 </Card>
*/
