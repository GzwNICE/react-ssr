/**
 * Created by huangchao on 2017/10/18.
 */

import React, { PureComponent } from 'react'
import { InputItem, Toast } from 'antd-mobile'
import {connect} from 'react-redux'
import style from './style.less'
import Rectangle from '../../static/Rectangle@3x.png'
import queryString from 'query-string'
import F from '../../helper/tool'
import { createForm } from 'rc-form'
import {captcha} from '../../actions/auth'
// import ThirdPartyLogin from '../../components/ThirdPartyLogin'
import {mobile, loginCode} from '../../actions/auth'
import {errCode} from "../../helper/errCode";
import { withRouter } from 'react-router-dom'
import {ACCOUNT_GET_MOBILE, GET_ACCOUNT_PAGE_DATA} from "../../actions/bindExistAccount";

@createForm()
@withRouter
@connect(state => ({
}))
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

  onPhoneNumber = () => {
    this.props.form.validateFields((err, value) => {
      if(err) return
      if(value.number && value.massageCode) {
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
      let send = (res) => {
        if (this.state.disableCode){
          mobile({
            mobile: value.number,
            captcha: '',
            sms_type: 7,
            tx_ticket: res.ticket,
            tx_randstr: res.randstr,
            tx_type: 1,
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
              // this.changeImg()
              const flag = data.flag
              const errMs = errCode[flag]
              if (errMs) {
                Toast.info(errMs, 2)
              } else {
                Toast.info('验证码错误', 2)
              }
            }
          })
        }
      }

      let captcha1 = new window.TencentCaptcha('2096087700', function(res) {
        if(res.ret === 0){
          send(res)
        }
      })
      captcha1.show()
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
        loginCode({
          username: value.number,
          password: value.massageCode,
          platform: 2,
          appchannel: 'web',
        }).then(data => {
          console.log(data)
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
            if (err.errCode === -404) {
              const payload = JSON.parse(err.errMsg)
              this.props.dispatch({type: 'GET_ACCOUNT_PAGE_DATA', payload })
              this.props.dispatch({type: 'ACCOUNT_GET_MOBILE', payload: value.number })
              setTimeout(() => {
                this.props.history.replace(`/user/bindExistAccount${this.props.history.location.search}`)
              },1200)
            } else {
              Toast.info(err.errMsg, 2)
            }
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

  goRegister = (url, key) => {
    const search = window.location.search
    if(key) {
      window.zhuge.track('手机号注册')
    }
    if(search) {
      this.props.history.replace(`${url}` + search, {key: '登录弹窗'})
    } else {
      this.props.history.replace(url, {key: '登录弹窗'})
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
    return (
      <div className={style.RegisterWrap}>
        {/*<div className={style.back} onClick={this.goBack}>
          <img src={Rectangle} alt="返回" />
        </div>
        <div className={style.title}>验证码登录</div>*/}
        <div className={style.forms}>
          <div className={style.numberCode}>
            <InputItem
              {...getFieldProps('number', {onChange: this.onPhoneNumber})}
              className={style.inputHei}
              clear
              placeholder="请输入常用手机号"
              maxLength="11"
            />
          </div>
          <div className={style.massageCode}>
            <InputItem
              {...getFieldProps('massageCode', {onChange: this.onPhoneNumber})}
              className={`${style.inputHei} ${style.massageLeft}`}
              clear
              placeholder="请输入短信验证码"
            />
            <div onClick={this.getCode}
                 id="TencentCaptcha" data-appid="2096087700" data-cbfn="callbackdfws"
                 className={`${style.massage} ${this.state.disableCode ? null : style.disabledCode}`}>
              {this.state.tipFont}
            </div>
          </div>
        </div>
        <div onClick={this.login} className={style.subBtn}>
          <a className={this.state.disabled ? null : `${style.disabled}`}>登 录</a>
        </div>
        <div onClick={() => this.props.history.replace(`/user/register${window.location.search}`)} className={style.goRegister}>
          <span>立即注册</span>
        </div>
        {/*<div className={style.bottom}>*/}
        {/*<ThirdPartyLogin />*/}
        {/*</div>*/}
      </div>
    )
  }
}

export default LoginCode
