/**
 * Created by huangchao on 2017/10/18.
 */

import React, { PureComponent } from 'react'
import { InputItem, Toast } from 'antd-mobile'
import queryString from 'query-string'
import style from './style.less'
// import Rectangle from '../../static/Rectangle@3x.png'
// import logopng from '../../static/logo@320x.png'
import passwordno from '../../static/paswordno@3x.png'
import paswordimg from '../../static/pasword@3x.png'
import { createForm } from 'rc-form'
import * as auth from '../../actions/auth'
import { withRouter } from 'react-router-dom'
import { loggingStatus } from '../../actions/userStatus'
import { connect } from 'react-redux'
import Cookies from 'js-cookie'

@createForm()
@withRouter
@connect(state => ({}))
class Login extends PureComponent {
  state = {
    focused: true,
    password: true,
    disabled: false,
    loginNum: 0,
  }
  changePasswordType = () => {
    this.setState({
      password: !this.state.password,
    })
  }
  onUserName = () => {
    this.props.form.validateFields((err, value) => {
      if (err) return
      if (value.username && value.password) {
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
    if (key) {
      // window.zhuge.track('手机号注册')
    }
    if (search) {
      this.props.history.replace(`${url}` + search, { key: '登录弹窗' })
    } else {
      this.props.history.replace(url, { key: '登录弹窗' })
    }
  }

  goBack = () => {
    const { redirect, sss, one } = queryString.parse(window.location.search)
    let patt1 = new RegExp('service')
    if (sss) {
      return (window.location.href = sss)
    }
    if (one) {
      return this.props.history.go(-1)
    }

    if (patt1.test(redirect)) {
      return this.props.history.go(-1)
    } else if (redirect) {
      return this.props.history.replace(redirect)
    }
  }

  handleLogin = () => {
    // window.zhuge.track('登录')
    this.props.form.validateFields((err, value) => {
      if (err) return
      const parsed = queryString.parse(window.location.search)
      let _url = `${parsed.redirect}?`
      Object.keys(parsed).map(k => {
        if (k !== 'redirect') {
          _url += `${k}=${parsed[k]}&`
        } else {
          _url = `${parsed.redirect}`
        }
        return null
      })

      if (!value.username) {
        return Toast.info('请输入账号', 2)
      }
      if (!value.password) {
        return Toast.info('请输入密码', 2)
      }

      let login = res => {
        let params = {
          ...value,
        }
        if (res) {
          params = {
            ...value,
            tx_ticket: res.ticket,
            tx_randstr: res.randstr,
            tx_type: 1,
          }
        }
        auth
          .login({ platform: 2, ...params })
          .then(data => {
            if (data) {
              Toast.info('登录成功', 2)
              // window.zhuge.track('登录页面填写', {
              //   登录成功: '',
              //   用户ID: data.user_id,
              //   手机号: data.phone,
              //   邮箱: data.email,
              // })
              window.zhuge.identify(data.user_id)
              Cookies.set('reigsterMobile', data.phone)
              this.props.dispatch(loggingStatus()).then(() => {
                setTimeout(() => {
                  if (parsed.redirect) {
                    if (_url.indexOf('service') > -1) {
                      window.location.replace(_url)
                    } else {
                      this.props.history.replace(_url)
                    }
                  } else {
                    this.props.history.push('/user')
                  }
                }, 999)
              })
            }
          })
          .catch(err => {
            // window.zhuge.track('登录页面填写', {
            //   登录失败: err.errMsg,
            // })
            Toast.info(err.errMsg, 2)
          })
      }
      const captcha = new window.TencentCaptcha('2096087700', function(res) {
        if (res.ret === 0) {
          login(res)
        }
      })
      captcha.show()
    })
  }

  // componentDidMount() {
  //   const {key} = this.props.location.state || {}
  //   window.zhuge.track('登录页面打开', {
  //     '触发来源': key || '我的',
  //   })
  // }

  render() {
    const { getFieldProps } = this.props.form
    return (
      <div className={style.LoginWrap}>
        <div className={style.forms}>
          <InputItem
            {...getFieldProps('username', { onChange: this.onUserName })}
            className={`${style.inputHei} ${style.name}`}
            clear
            placeholder="手机号/邮箱/用户名"
          />
          <div className={style.passwordBox}>
            <InputItem
              {...getFieldProps('password', { onChange: this.onUserName })}
              className={`${style.inputHei} ${style.name}`}
              clear
              type={this.state.password ? 'password' : 'text'}
              placeholder="请输入登录密码"
            />
            <div className={style.changeType} onClick={this.changePasswordType}>
              <img
                src={this.state.password ? passwordno : paswordimg}
                alt="显示"
              />
            </div>
          </div>
          <div className={style.subBtn} onClick={this.handleLogin}>
            <a
              id="TencentCaptcha"
              data-appid="2096087700"
              data-cbfn="callbackdfws"
              className={this.state.disabled ? null : `${style.disabled}`}
            >
              登 录
            </a>
          </div>
          <div className={style.otherLogin}>
            <div onClick={() => this.goRegister(`/register`, '手机号注册')}>
              <span>立即注册</span>
            </div>
            <div className={style.rule} />
            <div onClick={() => this.goRegister(`/user/forgetPassword`)}>
              <div className={style.forgetPassword}>忘记密码</div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Login
