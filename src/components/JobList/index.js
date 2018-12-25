import React, { Component } from 'react'
import logo from '../../static/weixin@3x.png'
import { withRouter } from 'react-router-dom'
import style from './style.less'

class JobList extends Component {
  render() {
    return (
      <div className={style.single}>
        <div className={style.payJob}>
          <h1 className={style.Job}>
            前厅副经理前厅副经理前厅副经理前厅副经理前厅副经理
          </h1>
          <span className={style.Pay}>2万-3万</span>
        </div>
        <div className={style.benefits}>
          <div className={style.scale}>
            <span>北京</span>
            <span>3年以上</span>
            <span>大专</span>
            <span>包吃住</span>
          </div>
          <span className={style.time}>15:30</span>
        </div>
        <div className={style.hotelInfo}>
          <img src={logo} alt="" />
          <div className={style.right}>
            <h1>丽思卡尔顿酒店</h1>
            <div className={style.scale}>
              <span>国际高端酒店/5星级</span>
              <span>500-2000人</span>
            </div>
          </div>
        </div>
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
                <div
                  className={style.PostCard}
                  key={index}
                  onClick={() => {
                    this.props.history.push(
                      `/${item.company_id}/${item.job_id}`
                    )
                  }}
                >
                  <div className={style.PostTop}>
                    <h1>{item.job_name}</h1>
                    <span>{item.salary}</span>
                  </div>
                  <div className={style.PostBot}>
                    <div className={style.scale}>
                      <span>{item.work_place}</span>
                      <span>{item.exp}</span>
                      <span>{item.education}</span>
                      <span>{item.room_board}</span>
                    </div>
                    <span className={style.day}>{item.update_time}</span>
                  </div>
                </div>
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
