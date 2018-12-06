import React, { Component } from 'react'
import hotjobs from '@static/hotJobs@3x.png'
import style from './style.less'

export default class HotJobs extends Component {
  state = {
    jobs: [
      '总经理',
      '总工程师',
      '行政管家',
      '餐饮部长',
      '西厨厨师长',
      '前厅经理',
      '前厅员工',
      '餐饮员工',
    ],
  }
  render() {
    const { jobs } = this.state
    return (
      <div className={style.hotjobs}>
        <i />
        <div className={style.jobList}>
          <img src={hotjobs} alt="img" />
          <div className={style.jobs}>
            {jobs
              ? jobs.map(item => {
                  return <span>{item}</span>
                })
              : null}
          </div>
        </div>
      </div>
    )
  }
}
