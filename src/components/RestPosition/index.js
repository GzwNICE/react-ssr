/**
 * Created by huangchao on 2017/10/11.
 */
import React from 'react'
import style from './style.less'
import JobCard from '../../components/JobCard/typeTwo'

const RestPosition = (props) => {
  let {src, title, data, noTitle = true} = props
  let list = data || []
  return (
    <div className={`${style.RestPositionWrap} ${noTitle ? null : style.noTitle}`}>
      {noTitle ? <div className={style.title}>
        <img className={style.titleImg} src={src} alt="图片" />
        <span>{title}</span>
      </div> : null}
      {list.map((d, i) => {
        return <div key={i} className={`${style.listItem} ${noTitle ? null : style.noBottom}`} onClick={()=>{props.callback(d.job_id, (d.c_userid || d.company_id))}}>
          <JobCard data={d} />
        </div>
      })}
    </div>
  )
}

export default RestPosition
