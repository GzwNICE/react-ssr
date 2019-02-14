/**
 * Created by huangchao on 2017/9/28.
 */
import React, { PureComponent } from 'react'
import { InputItem, Toast, Modal } from 'antd-mobile'
import style from './style.less'
import queryString from 'query-string'
import Rectangle from '@static/Rectangle@3x.png'
import passwordno from '@static/paswordno@3x.png'
import paswordimg from '@static/pasword@3x.png'
import { createForm } from 'rc-form'
import F from '../../helper/tool'
import {errCode} from '../../helper/errCode'
import {mobile, findPassword} from '../../actions/auth'

@createForm()
class ForgetPassword extends PureComponent {

  state = {
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
      // console.log(value)
      if(value.number && value.massageCode && value.newPassword) {
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

  getCode = () => {
    this.props.form.validateFields((err, value) => {
      if(err) return
      if(!F.changePhoneNumber(value.number)) return  Toast.info('请输入正确的手机号码' ,2)
      // if(!value.imgCode) return Toast.info('请输入图形验证码' ,2)

      let send = (res) => {
        if (this.state.disableCode){
          mobile({
            mobile: value.number,
            captcha: '',
            sms_type: 1,
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
              const flag = data.flag
              const errMs = errCode[flag]
              if (errMs) {
                Toast.info(errMs, 2)
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

  findPass = () => {
    if(this.state.disabled) {
      this.props.form.validateFields((err, value) => {
        if(err) return
        if(value.newPassword.length < 6 || value.newPassword.length > 20){
          return Toast.info('密码格式为6-20位字母或数字', 2)
        }
        findPassword({
          mobile: value.number,
          code: value.massageCode,
          password: value.newPassword,
        }).then(data => {
          if(data.status) {
            Toast.info('密码重置成功', 2)
            setTimeout(() => {
              this.props.history.replace(`${this.props.history.location.search}`)
            }, 1200)
          } else {
            Modal.alert('密码重置失败', '请联系0571-88866108', [
              { text: '知道了', style: 'default' },
              { text: '确定'},
            ])
          }
        })
          .catch(err => {
            // Toast.info(err.errMsg, 2)
            Modal.alert('密码重置失败', '请联系0571-88866108', [
              { text: '知道了', style: 'default' },
              { text: '确定'},
            ])
          })

      })
    }
  }

  goBack = () => {
    // const {redirect, sss, one} = queryString.parse(window.location.search)
    // let patt1 = new RegExp("service")
    // if(sss) {
    //   return window.location.href = sss
    // }
    // if(one) {
    //   return this.props.history.go(-1)
    // }

    // if(patt1.test(redirect)) {
    //   return this.props.history.go(-1)
    // } else if(redirect){
    //   return this.props.history.replace(redirect)
    // }
    const {redirect} = queryString.parse(window.location.search)
    if(redirect){
      this.props.history.push(redirect)
    }else {
      this.props.history.push('/')
    }
    
  }

  // componentDidMount() {
  //   window.wx.ready(() => {
  //     window.wx.updateTimelineShareData(appShare()) // 分享到朋友圈
  //     window.wx.updateAppMessageShareData(appShare()) // 分享给朋友
  //   })
  // }

  componentWillUnmount() {
    this.timer && this.Clear()
  }

  render() {
    const { getFieldProps } = this.props.form
    return (
      <div className={style.ForgetPasswordWrap}>
        <div className={style.back} onClick={this.goBack}>
          <img src={Rectangle} alt="返回" />
        </div>
        <div className={style.title}>找回密码</div>
        <div className={style.forms}>
          <InputItem
            {...getFieldProps('number', {onChange: this.onPhoneNumber})}
            className={style.inputHei}
            clear
            placeholder="手机号"
            maxLength="11"
          />
          <div className={style.massageCode}>
            <InputItem
              {...getFieldProps('massageCode', {onChange: this.onPhoneNumber})}
              className={`${style.inputHei} ${style.massageLeft}`}
              clear
              placeholder="短信验证码"
            />
            <div
              onClick={this.getCode}
              id="TencentCaptcha" data-appid="2096087700" data-cbfn="callbackdfws"
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
              placeholder="请设置新密码"
            />
            <div className={style.password} onClick={this.changePasswordType}>
              <img src={this.state.password ? passwordno : paswordimg} alt="显示" />
            </div>
          </div>
        </div>
        <div onClick={this.findPass} className={style.subBtn}>
          <a className={this.state.disabled ? null : `${style.disabled}`}>提 交</a>
        </div>
      </div>
    )
  }
}

export default ForgetPassword
