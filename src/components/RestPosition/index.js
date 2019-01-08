import React from 'react'
import { Link } from 'react-router-dom'
import JobList from '../JobList'
import style from './style.less'

const RestPosition = props => {
  let { title, data, noTitle = true } = props
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
      {/*<JobList.JobList data={list} />*/}
      <div className={style.JobList}>
        {list
          ? list.map((item, index) => {
              return (
                <Link
                  rel="stylesheet"
                  to={`/${item.company_id}/${item.job_id}`}
                  key={index}
                >
                  <JobList.JobList data={item} />
                </Link>
              )
            })
          : null}
      </div>
    </div>
  )
}

export default RestPosition
