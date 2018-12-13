import React, { Component } from 'react'
import logo from '../../../static/weixin@3x.png'
import style from '../style.less'

export default class JobList extends Component {
  render() {
    return (
      <div className={style.listBox}>
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
            <img src={logo} alt=""/>
            <div className={style.right}>
              <h1>丽思卡尔顿酒店</h1>
              <div className={style.scale}>
                <span>国际高端酒店/5星级</span>
                <span>500-2000人</span>
              </div>
            </div>
          </div>
        </div>
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
            <img src={logo} alt=""/>
            <div className={style.right}>
              <h1>丽思卡尔顿酒店</h1>
              <div className={style.scale}>
                <span>国际高端酒店/5星级</span>
                <span>500-2000人</span>
              </div>
            </div>
          </div>
        </div>
        
      </div>
    )
  }
}
