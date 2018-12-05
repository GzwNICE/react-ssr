/**
 * Created by huangchao on 2017/10/18.
 */

import React, { PureComponent } from 'react'
import { InputItem, Toast } from 'antd-mobile'
import queryString from 'query-string'
import style from './style.less'
import Rectangle from '@static/Rectangle@3x.png'
import logopng from '@static/logo@320x.png'
import passwordno from '@static/paswordno@3x.png'
import paswordimg from '@static/pasword@3x.png'
import { createForm } from 'rc-form'
import * as auth from '../../actions/auth'

@createForm()
class Login extends PureComponent {
  state = {
    focused: true,
    password: true,
    disabled: false,
  }
  changePasswordType = () => {
    this.setState({
      password: !this.state.password,
    })
  }
  onUserName = () => {
    this.props.form.validateFields((err, value) => {
      if(err) return
      if(value.username && value.password) {
        this.setState({
          disabled: true,
        })
      } else {
        this.setState({
          disabled: false,
        })
      }
    })
  }
  goRegister = (url, key) => {
    const search = window.location.search
    // console.log(window.location.search)
    if(key) {
      window.zhuge.track('手机号注册')
    }
    if(search) {
      this.props.history.replace(`${url}` + search, {key: '登录弹窗'})
    } else {
      this.props.history.replace(url, {key: '登录弹窗'})
    }
  }

  goBack = () => {
    const {redirect, sss, one} = queryString.parse(window.location.search)
    let patt1 = new RegExp("service")
    if(sss) {
      return window.location.href = sss
    }
    if(one) {
      return this.props.history.go(-1)
    }

    if(patt1.test(redirect)) {
      return this.props.history.go(-1)
    } else if(redirect){
      return this.props.history.replace(redirect)
    }
  }

  handleLogin = () => {
    window.zhuge.track('登录')
    this.props.form.validateFields((err, value) => {
      if(err) return
      const parsed = queryString.parse(window.location.search)
      let _url = `${parsed.redirect}?`
      Object.keys(parsed).map( k => {
        if(k !== 'redirect') {
          _url += `${k}=${parsed[k]}&`
        }else{
          _url = `${parsed.redirect}`
        }
        return null
      })

      if(!value.username) {
        return Toast.info('请输入用户名', 2)
      }
      if(!value.password) {
        return Toast.info('请输入密码', 2)
      }
      auth.login({platform: 2, ...value}).then(data => {
        if(data) {
          Toast.info('登录成功', 2)
          window.zhuge.track('登录页面填写', {
            '登录成功': '',
            '用户ID': data.user_id,
            '手机号': data.phone,
            '邮箱': data.email,
          })
          window.zhuge.identify(data.user_id)

          setTimeout(() => {
            if(parsed.redirect) {
              if(_url.indexOf('service') > -1) {
                window.location.replace(_url)
              } else {
                this.props.history.replace(_url)
              }
            } else {
              this.props.history.push('/tabs/user')
            }
          },1200)
        }
      })
        .catch(err => {
          window.zhuge.track('登录页面填写', {
            '登录失败': err.errMsg,
          })
          Toast.info(err.errMsg, 2)
        })
    })
  }

  componentDidMount() {
    const {key} = this.props.location.state || {}
    console.log(key)
    window.zhuge.track('登录页面打开', {
      '触发来源': key || '我的',
    })
  }

  render() {
    // console.log(this.props)
    return (
      <div className={style.LoginWrap}>
        <div className={style.back}>
          <img src={Rectangle} alt="返回" onClick={this.goBack} />
        </div>
        <div className={style.logon}>
          <img src={logopng} alt="logon" />
        </div>
        <div className={style.forms}>
          <div className={style.userName}>
            <div className={style.title}>账号</div>
            <InputItem
              {...this.props.form.getFieldProps('username', {onChange: this.onUserName})}
              className={`${style.inputHei} ${style.name}`}
              clear
              placeholder="手机号/邮箱/用户名"
            />
          </div>
          <div className={style.passwordBox}>
            <div className={style.title}>密码</div>
            <InputItem
              {...this.props.form.getFieldProps('password', {onChange: this.onUserName})}
              className={`${style.inputHei} ${style.name}`}
              clear
              type={this.state.password ? 'password' : 'text'}
              placeholder="请输入登录密码"
            />
            <div className={style.changeType} onClick={this.changePasswordType}>
              <img src={this.state.password ? passwordno : paswordimg} alt="显示" />
            </div>
          </div>
          <div onClick={() => this.goRegister('/user/forgetPassword')}>
            <div className={style.forgetPassword}>忘记密码？</div>
          </div>
          <div className={style.subBtn} onClick={this.handleLogin}>
            <a className={this.state.disabled ? null : `${style.disabled}`}>登 录</a>
          </div>
          <div className={style.otherLogin}>
            <div onClick={() => this.goRegister('/user/logincode')}>
              <span>验证码登录</span>
            </div>
            <div onClick={() => this.goRegister('/user/register', "手机号注册")}>
              <span>手机注册</span>
            </div>
          </div>
          {/*<Link className={style.activityRegister} to="/activityRegister">
            <span>活动注册</span>
          </Link>*/}
        </div>
        {/*<div className={style.bottom}>*/}
        {/*<ThirdPartyLogin />*/}
        {/*</div>*/}
      </div>
    )
  }
}

export default Login
