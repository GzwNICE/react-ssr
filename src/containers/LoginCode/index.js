/**
 * Created by huangchao on 2017/10/18.
 */

import React, { PureComponent } from 'react'
import { InputItem, Toast } from 'antd-mobile'
import style from './style.less'
import Rectangle from '@static/Rectangle@3x.png'
import queryString from 'query-string'
import F from '../../helper/tool'
import { createForm } from 'rc-form'
import {captcha} from '../../actions/auth'
// import ThirdPartyLogin from '../../components/ThirdPartyLogin'
import {mobile, loginCode} from '../../actions/auth'

@createForm()
class LoginCode extends PureComponent {
  state = {
    url: '',
    focused: true,
    password: true,
    disabled: false,
    tipFont: '获取验证码',
    disableCode: true,
    index: 60,
  }
  changePasswordType = () => {
    this.setState({
      password: !this.state.password,
    })
  }

  changeImg = () => {
    captcha().then(data => {
      this.setState({
        url: data,
      })
    })
  }

  onPhoneNumber = () => {
    this.props.form.validateFields((err, value) => {
      if(err) return
      if(value.number && value.imgCode && value.massageCode) {
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

  Clear = () => {
    this.setState({
      disableCode: true,
      index: 60,
      tipFont: '获取验证码',
    })
    clearInterval(this.timer)
  }

  getCode = () => {
    window.zhuge.track('验证码登录', {
      '获取验证码': '',
    })

    this.props.form.validateFields((err, value) => {
      if(err) return
      if(!F.changePhoneNumber(value.number)) return  Toast.info('请输入正确的手机号码' ,2)
      if(!value.imgCode) return Toast.info('请输入图形验证码' ,2)
      if (this.state.disableCode){
        mobile({
          mobile: value.number,
          captcha: value.imgCode,
          sms_type: 7,
        }).then((data) => {
          if(data.flag === 0) {
            this.setState({
              disableCode: false,
            })
            this.timer = setInterval(() => {

              if(this.state.index <= 0) {
                return this.Clear()
              }

              this.setState({
                index: this.state.index -1,
                tipFont: `${this.state.index -1}秒后重新获取`,
              })

            }, 999)
          } else {
            this.changeImg()
            Toast.info('验证码错误', 2)
          }
        })
      }
    })
  }

  login = () => {
    if(this.state.disabled) {
      this.props.form.validateFields((err, value) => {
        if(err) return
        const parsed = queryString.parse(window.location.search)
        let _url = `${parsed.redirect}?`
        Object.keys(parsed).map( k => {
          if(k !== 'redirect') {
            _url += `${k}=${parsed[k]}&`
          }
          return null
        })
        console.log(_url)
        loginCode({
          username: value.number,
          password: value.massageCode,
          platform: 2,
        }).then(data => {
          if(data) {
            Toast.info('登录成功', 2)
            window.zhuge.track('验证码登录', {
              '登录成功': '',
              '用户ID': data.user_id,
              '手机号': data.phone,
              '邮箱': data.email,
            })
            setTimeout(() => {
              if(parsed.redirect) {
                // window.location.href = redirect
                this.props.history.replace(_url)
              } else {
                this.props.history.replace('/tabs/user')
              }
            },1200)
          }
        })
          .catch(err => {
            window.zhuge.track('验证码登录', {
              '登录失败': err.errMsg,
            })
            Toast.info(err.errMsg, 2)
          })
      })
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

  componentDidMount() {
    captcha().then(data => {
      this.setState({
        url: data,
      })
    })
  }

  componentWillUnmount() {
    this.timer && this.Clear()
  }

  render() {
    const { getFieldProps } = this.props.form
    // console.log(this.props)
    return (
      <div className={style.RegisterWrap}>
        <div className={style.back} onClick={this.goBack}>
          <img src={Rectangle} alt="返回" />
        </div>
        <div className={style.title}>验证码登录</div>
        <div className={style.forms}>
          <InputItem
            {...getFieldProps('number', {onChange: this.onPhoneNumber})}
            className={style.inputHei}
            clear
            placeholder="手机号"
            maxLength="11"
          />
          <div className={style.pictureCode}>
            <InputItem
              {...getFieldProps('imgCode', {onChange: this.onPhoneNumber})}
              className={`${style.inputHei} ${style.picLeft}`}
              clear
              placeholder="验证码"
            />
            <div onClick={this.changeImg} className={style.picture}>
              <img src={this.state.url} alt="图片验证码" />
            </div>
          </div>
          <div className={style.massageCode}>
            <InputItem
              {...getFieldProps('massageCode', {onChange: this.onPhoneNumber})}
              className={`${style.inputHei} ${style.massageLeft}`}
              clear
              placeholder="请输入获取验证码"
            />
            <div onClick={this.getCode}
                 className={`${style.massage} ${this.state.disableCode ? null : style.disabledCode}`}>
              {this.state.tipFont}
            </div>
          </div>
        </div>
        <div onClick={this.login} className={style.subBtn}>
          <a className={this.state.disabled ? null : `${style.disabled}`}>登 录</a>
        </div>
        {/*<div className={style.bottom}>*/}
        {/*<ThirdPartyLogin />*/}
        {/*</div>*/}
      </div>
    )
  }
}

export default LoginCode
