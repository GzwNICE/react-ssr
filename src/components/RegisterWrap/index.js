import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import style from './style.less'

export default class RegisterWrap extends Component {
  
  
  handleCloseRegClick(){
    this.props.onCloseReg()
  }

  render() {
    return (
      <div className={style.registerWrap}>
        <div className={style.left}>
          <div className={style.title}>找酒店餐饮工作？</div>
          <div className={style.des}>业内人士首选最佳东方</div>
        </div>
        <div className={style.regist_btn}>
          <Link
            to={`/user/register?redirect=${this.props.location}`}
          >
            立即注册
          </Link>
        </div>
        <div className={style.close} onClick={this.handleCloseRegClick.bind(this)} />
      </div>
    )
  }
}