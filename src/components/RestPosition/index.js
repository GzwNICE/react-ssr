/**
 * Created by huangchao on 2017/10/11.
 */
import React from 'react'
import JobList from '../JobList'
import style from './style.less'


const RestPosition = (props) => {
  let {src, title, data, noTitle = true} = props
  // let list = data || []
  return (
    <div className={`${style.RestPositionWrap} ${noTitle ? null : style.noTitle}`}>
      {noTitle ? <div className={style.title}>
        <span>{title}</span>
      </div> : null}
      <JobList />
    </div>
  )
}

export default RestPosition
