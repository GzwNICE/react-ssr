import React, { Component } from 'react'
import detailLogo from '../../static/detailLogo.png'
import { withRouter, Link } from 'react-router-dom'
import style from './style.less'
const triggerFrom = '触发来源'
class JobList extends Component {
  render() {
    const d = this.props.data
    return (
      <div className={style.single}>
        <div className={style.payJob}>
          <h1 className={style.Job}>{d.job_name}</h1>
          <span className={style.Pay}>{d.salary}</span>
        </div>
        <div className={style.benefits}>
          <div className={style.scale}>
            {d.work_place ? <span>{d.work_place}</span> : null}
            {d.exp ? <span><span className={style.rule}>|</span>{d.exp}</span> : null}
            {d.education ? <span><span className={style.rule}>|</span>{d.education}</span> : null}
            {d.room_board ? <span><span className={style.rule}>|</span>{d.room_board}</span> : null}
          </div>
          <span className={style.time}>{d.update_time}</span>
        </div>
        <div className={style.hotelInfo}>
          <img
            src={d.company_logo === '' ? detailLogo : d.company_logo}
            alt="img"
          />
          <div className={style.right}>
            <h1>{d.company_name}</h1>
            <div className={style.scale}>
              {d.industry_star ? <span>{d.industry_star}</span> : null}
              {d.company_size ? <span>{d.company_size}</span> : null}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

class PostList extends Component {
  goPosition = key => {
    if (key === '企业详情页-在招职位') {
      window.zhuge.track('职位详情页打开', {
        [`${triggerFrom}`]: '企业详情页-在招职位',
      })
    } else {
    }
  }
  
  render() {
    let { data } = this.props
    let list = data || []
    return (
      <div className={style.PostList}>
        {list
          ? list.map((item, index) => {
              return (
                <Link
                  rel="stylesheet"
                  to={`/${item.company_id}/${item.job_id}?redirect=${this.props.history.location.pathname}`}
                  key={index}
                  onClick={() => {
                    this.goPosition(this.props.zhugeFrom)
                  }}
                >
                  <div className={style.PostCard}>
                    <div className={style.PostTop}>
                      <h1>{item.job_name}</h1>
                      <span>{item.salary}</span>
                    </div>
                    <div className={style.PostBot}>
                      <div className={style.scale}>
                        {item.work_place ? (
                          <span>{item.work_place}</span>
                        ) : null}
                        {item.exp ? <span><span className={style.rule}>|</span>{item.exp}</span> : null}
                        {item.education ? <span><span className={style.rule}>|</span>{item.education}</span> : null}
                        {item.room_board ? (
                          <span><span className={style.rule}>|</span>{item.room_board}</span>
                        ) : null}
                      </div>
                      <span className={style.day}>{item.update_time}</span>
                    </div>
                  </div>
                </Link>
              )
            })
          : null}
      </div>
    )
  }
}

export default {
  JobList: withRouter(JobList),
  PostList: withRouter(PostList),
}