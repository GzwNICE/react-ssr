import React from 'react'
// import { withRouter } from 'react-router-dom'
import JobList from '../JobList'
import style from './style.less'

const RestPosition = props => {
  let { title, data, noTitle = true} = props
  let list = data || []
  return (
    <div
      className={`${style.RestPositionWrap} ${noTitle ? null : style.noTitle}`}
    >
      {noTitle ? (
        <div className={style.title}>
          <span>{title}</span>
        </div>
      ) : null}
      <JobList.JobList  data={list}/>
    </div>
  )
}

export default RestPosition
