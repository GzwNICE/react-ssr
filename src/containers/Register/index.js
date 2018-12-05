/**
 * Created by huangchao on 2017/9/27.
 */
import React, { PureComponent } from 'react'
import { InputItem, Toast } from 'antd-mobile'
import Rectangle from '@static/Rectangle@3x.png'
import passwordno from '@static/paswordno@3x.png'
import paswordimg from '@static/pasword@3x.png'
import { createForm } from 'rc-form'
import queryString from 'query-string'
import F from '../../helper/tool'
import style from './style.less'
import Loginstyle from '../Login/style.less'
import {captcha} from '../../actions/auth'
import {mobile, register} from '../../actions/auth'

@createForm()
class Register extends PureComponent {
  state = {
    focused: true,
    password: true,
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
    window.zhuge.track('图形验证码')
  }

  onPhoneNumber = () => {
    this.props.form.validateFields((err, value) => {
      if(err) return
      // console.log(value)
      if(value.number && value.imgCode && value.massageCode && value.newPassword) {
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
      index: 60,
      disableCode: true,
      tipFont: '获取验证码',
    })
    clearInterval(this.timer)
  }

  getCode = () => { // 获取验证码
    this.props.form.validateFields((err, value) => {
      if(err) return
      if(!F.changePhoneNumber(value.number)) return  Toast.info('请输入正确的手机号码' ,2)
      if(!value.imgCode) return Toast.info('请输入图形验证码' ,2)
      window.zhuge.track('获取验证码')
      if (this.state.disableCode){
        mobile({
          mobile: value.number,
          captcha: value.imgCode,
          sms_type: 2,
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
          } else if(data.flag === 5012) {
            Toast.info('号码已注册', 2)
            window.zhuge.track('注册失败', {
              '手机号已注册': '',
            })
          } else {
            this.changeImg()
            Toast.info('验证码错误', 2)
            window.zhuge.track('注册失败', {
              '验证码错误': '',
            })
          }
        })
      }
    })
  }

  onRegister = () => { // 注册
    if(this.state.disabled) {
      this.props.form.validateFields((err, value) => {
        if(err) return
        if(value.newPassword.length < 6 || value.newPassword.length > 20){
          return Toast.info('密码格式为6-20位字母或数字', 2)
        }
        const {register_page_source} = queryString.parse(window.location.search)
        // console.log(value)
        register({
          register_page_source:register_page_source || 'https://m.veryeast.cn',
          username: value.number,
          mobile: value.number,
          code: value.massageCode,
          password: value.newPassword,
          register_type: 'mobile_register',
          user_type: 2,
          platform: 3,
        }).then(data => {
          if(data.status) {
            Toast.info('注册成功', 2)
            window.zhuge.track('注册成功', {
              '用户ID': data.user_id,
              '手机号': data.phone,
              '邮箱': data.email,
            })
            setTimeout(() => {
              this.props.history.replace(`/resume/micro${this.props.history.location.search}`)
            }, 1200)
          }
        })
          .catch(err => {
            Toast.info(err.errMsg, 2)
            window.zhuge.track('注册失败', {
              '服务器返回原因': err.errMsg,
            })
          })
      })
    }
  }

  goRegister = (url, key) => {
    const search = window.location.search

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

  componentWillMount() {
    captcha().then(data => {
      this.setState({
        url: data,
      })
    })
  }

  componentDidMount() {
    const {key} = this.props.location.state || {}
    const {sss} = queryString.parse(window.location.search)
    console.log(key)
    if(sss) {
      window.zhuge.track('注册页面打开', {
        '触发来源': '首页浮窗',
      })
    } else {
      window.zhuge.track('注册页面打开', {
        '触发来源': key || '其他来源',
      })
    }
  }

  componentWillUnmount() {
    this.timer && this.Clear()
  }

  render() {
    const { getFieldProps } = this.props.form;
    return (
      <div className={style.RegisterWrap}>
        <div className={style.back} onClick={this.goBack}>
          <img src={Rectangle} alt="返回" />
        </div>
        <div className={style.title}>手机号注册</div>
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
              placeholder="短信验证码"
            />
            <div
              onClick={this.getCode}
              className={`${style.massage} ${this.state.disableCode ? null : style.disabledCode}`}>
              {this.state.tipFont}
            </div>
          </div>
          <div className={style.passwordCode}>
            <InputItem
              {...getFieldProps('newPassword', {onChange: this.onPhoneNumber})}
              className={`${style.inputHei} ${style.passwordLeft}`}
              type={this.state.password ? 'password' : 'text'}
              clear
              placeholder="请输入6-20个字母或数字的密码"
            />
            <div className={style.password} onClick={this.changePasswordType}>
              <img src={this.state.password ? passwordno : paswordimg} alt="显示" />
            </div>
          </div>
        </div>
        <div onClick={this.onRegister} className={style.subBtn}>
          <a className={this.state.disabled ? null : `${style.disabled}`}>注 册</a>

          <div className={Loginstyle.otherLogin}>
            <div>
            </div>
            <div onClick={() => this.goRegister('/user/login')}>
              <span>直接登录</span>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Register
