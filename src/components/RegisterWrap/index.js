import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import style from './style.less'
const triggerFrom = '触发来源'

export default class RegisterWrap extends Component {
  handleCloseRegClick() {
    this.props.onCloseReg()
  }

  openRegister = key => {
    switch (key) {
      case '首页底部推荐注册':
        return window.zhuge.track('注册页面打开', {
          [`${triggerFrom}`]: '首页底部推荐注册',
        })
      case '名企页底部推荐注册':
        return window.zhuge.track('注册页面打开', {
          [`${triggerFrom}`]: '名企页底部推荐注册',
        })
      case '职位列表页底部推荐注册':
        return window.zhuge.track('注册页面打开', {
          [`${triggerFrom}`]: '职位列表页底部推荐注册',
        })
      case '企业详情页底部推荐注册':
        return window.zhuge.track('注册页面打开', {
          [`${triggerFrom}`]: '企业详情页底部推荐注册',
        })
      case '登录页点击注册':
        return window.zhuge.track('注册页面打开', {
          [`${triggerFrom}`]: '登录页点击注册',
        })
      case '首页个人中心icon':
        return window.zhuge.track('注册页面打开', {
          [`${triggerFrom}`]: '首页个人中心icon',
        })
      case '名企列表页个人中心icon':
        return window.zhuge.track('注册页面打开', {
          [`${triggerFrom}`]: '名企列表页个人中心icon',
        })
      case '职位列表页个人中心icon':
        return window.zhuge.track('注册页面打开', {
          [`${triggerFrom}`]: '职位列表页个人中心icon',
        })
      case '职位详情页个人中心icon':
        return window.zhuge.track('注册页面打开', {
          [`${triggerFrom}`]: '职位详情页个人中心icon',
        })
      case '企业详情页个人中心icon':
        return window.zhuge.track('注册页面打开', {
          [`${triggerFrom}`]: '企业详情页个人中心icon',
        })
      case '投递简历':
        return window.zhuge.track('注册页面打开', {
          [`${triggerFrom}`]: '投递简历',
        })
      case '关注企业':
        return window.zhuge.track('注册页面打开', {
          [`${triggerFrom}`]: '关注企业',
        })
      case '企业联系方式获取':
        return window.zhuge.track('注册页面打开', {
          [`${triggerFrom}`]: '企业联系方式获取',
        })
      default:
        return true
    }
  }

  render() {
    return (
      <div className={style.registerWrap}>
        <Link
          to={`/register?redirect=${this.props.location}`}
          onClick={() => this.openRegister(this.props.zhugeFrom)}
        >
          <div className={style.left}>
            <div className={style.title}>找酒店餐饮工作？</div>
            <div className={style.des}>业内人士首选最佳东方</div>
          </div>
          <div className={style.regist_btn}>立即注册</div>
        </Link>
        <div
          className={style.close}
          onClick={this.handleCloseRegClick.bind(this)}
        />
      </div>
    )
  }
}
