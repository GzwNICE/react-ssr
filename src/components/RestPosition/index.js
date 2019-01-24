import React from 'react'
import { Link } from 'react-router-dom'
import JobList from '../JobList'
import style from './style.less'
const triggerFrom = '触发来源'

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
      <div className={style.JobList}>
        {list
          ? list.map((item, index) => {
              return (
                <Link
                  rel="stylesheet"
                  to={`/${item.company_id}/${item.job_id}`}
                  key={index}
                  onClick={()=>{
                    window.zhuge.track('职位详情页打开', {
                      [`${triggerFrom}`]: '职位详情页-相似职位推荐',
                    })
                  }}
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
