import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import style from './style.less'

export default class RegisterWrap extends Component {
  handleCloseRegClick() {
    this.props.onCloseReg()
  }

  render() {
    return (
      <div className={style.registerWrap}>
        <Link to={`/register?redirect=${this.props.location}`}>
          <div className={style.left}>
            <div className={style.title}>找酒店餐饮工作？</div>
            <div className={style.des}>业内人士首选最佳东方</div>
          </div>
          <div className={style.regist_btn}>立即注册</div>
          <div
            className={style.close}
            onClick={this.handleCloseRegClick.bind(this)}
          />
        </Link>
      </div>
    )
  }
}
