import React, { Component } from 'react'
import detailLogo from '../../static/detailLogo.png'
import { withRouter, Link } from 'react-router-dom'
import style from './style.less'

class JobList extends Component {
  render() {
    const { data } = this.props
    let list = data || []
    return (
      <div className={style.JobList}>
        {list
          ? list.map((item, index) => {
              return (
                <Link
                  rel="stylesheet"
                  to={`/${item.company_id}/${item.job_id}`}
                  key={index}
                >
                  <div className={style.single}>
                    <div className={style.payJob}>
                      <h1 className={style.Job}>{item.job_name}</h1>
                      <span className={style.Pay}>{item.salary}</span>
                    </div>
                    <div className={style.benefits}>
                      <div className={style.scale}>
                        {item.work_place ? (
                          <span>{item.work_place}</span>
                        ) : null}
                        {item.exp ? <span>{item.exp}</span> : null}
                        {item.education ? <span>{item.education}</span> : null}
                        {item.room_board ? (
                          <span>{item.room_board}</span>
                        ) : null}
                      </div>
                      <span className={style.time}>{item.update_time}</span>
                    </div>
                    <div className={style.hotelInfo}>
                      <img
                        src={item.company_logo ? item.company_logo : detailLogo}
                        alt="img"
                      />
                      <div className={style.right}>
                        <h1>{item.company_name}</h1>
                        <div className={style.scale}>
                          {item.industry_star ? (
                            <span>{item.industry_star}</span>
                          ) : null}
                          {item.company_size ? (
                            <span>{item.company_size}</span>
                          ) : null}
                        </div>
                      </div>
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

class PostList extends Component {
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
                  to={`/${item.company_id}/${item.job_id}`}
                  key={index}
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
                        {item.exp ? <span>{item.exp}</span> : null}
                        {item.education ? <span>{item.education}</span> : null}
                        {item.room_board ? (
                          <span>{item.room_board}</span>
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
