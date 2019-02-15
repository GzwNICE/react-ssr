/**
 * Created by huangchao on 2017/11/3.
 */
import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import store from 'store'
import style from './style.less'
import { NavBar, Toast } from 'antd-mobile'
import F from '../../helper/tool'
import { email_verify_code, email_verify } from '../../actions/bind'

// import LisetItem from '../../components/ListItem'
// import { NavBar, Toast } from 'antd-mobile'

@connect(state => {
  return {
    auth: state.auth,
  }
})
class BindEmail extends PureComponent {
  state = {
    disabled: false,
    email: '',
    code: '',
    tipFont: '获取验证码',
    disableCode: true,
    index: 60,
  }

  onChange = () => {
    const code = this.refs.code.value
    if (code.length > 0) {
      this.setState({
        disable: true,
      })
    }
    this.setState({
      code,
    })
  }

  emailOnchange = () => {
    const email = this.refs.email.value
    if (email.length > 0) {
      this.setState({
        disabled: true,
        email,
      })
    }
  }

  Clear = () => {
    this.setState({
      disableCode: true,
      index: 60,
      tipFont: '获取验证码',
    })
    clearInterval(this.timer)
  }

  onBlurInput = ()=>{
    document.body.scrollTop=0
  }

  getCode = () => {
    if (!F.changeEmail(this.state.email))
      return Toast.info('请输入正确的邮箱', 2)
    if (this.state.disableCode) {
      let send = res => {
        email_verify_code({
          email: this.state.email,
          tx_ticket: res.ticket,
          tx_randstr: res.randstr,
          tx_type: 1,
        }).then(data => {
          const { msg, errMsg, status } = data
          if (status === 0) {
            if (msg || errMsg) {
              Toast.fail(msg || errMsg, 2)
            }
          } else {
            this.timer = setInterval(() => {
              if (this.state.index <= 0) {
                return this.Clear()
              }
              this.setState({
                disableCode: false,
                index: this.state.index - 1,
                tipFont: `已发送(${this.state.index - 1}s)`,
              })
            }, 1000)
          }
        })
      }

      let captcha1 = new window.TencentCaptcha('2096087700', function(res) {
        if (res.ret === 0) {
          send(res)
        }
      })
      captcha1.show()
    }
  }

  // 781945110@qq.com
  bindEmail = () => {
    if (this.state.disabled) {
      const email = this.state.email
      const code = this.state.code
      if (F.changeEmail(email)) {
        email_verify({
          email,
          code,
          return_type: 'json',
        })
          .then(data => {
            const { msg, errMsg, status } = data
            if (status !== 1) {
              this.props.form.setFieldsValue({
                code: '',
              })
              if (errMsg || msg) {
                Toast.fail(errMsg || msg, 2)
              }
            } else {
              Toast.success('绑定成功', 2, () => {
                store.set('m:auth', { ...this.props.auth, email })
                this.props.dispatch({ type: 'CHANGE_BIND_EMAIL' })
                this.props.history.goBack()
              })
            }
          })
          .catch(err => {
            return Toast.info(err.errMsg, 2)
          })
      } else {
        Toast.info('请输入正确的邮箱', 2)
      }
    }
  }

  render() {
    const { email } = this.props.auth
    const desc = !email ? (
      <div>请绑定常用邮箱，绑定后，可用于接收投递简历反馈通知，找回密码等</div>
    ) : (
      <div>
        <p>
          当前绑定邮箱：{F.hidden_email(email)}
          ，更改后，请用新邮箱接收投递简历反馈通知、找回密码等
        </p>
      </div>
    )
    return (
      <div className={style.bindEmailWrap}>
        <NavBar
          mode="dark"
          onLeftClick={() => {
            this.props.history.go(-1)
          }}
        >
          绑定邮箱
        </NavBar>
        <div className={style.inputBox}>
          {desc}
          <div className={style.userItem}>
            <div className={style.inputItem}>
              <input
                onChange={this.emailOnchange}
                ref="email"
                placeholder="请输入邮箱"
                type="text"
                onBlur={this.onBlurInput}
              />
            </div>
          </div>
          <div className={style.userItem}>
            <div className={style.inputItem}>
              <input
                onChange={this.onChange}
                ref="code"
                placeholder="请输入邮箱验证码"
                type="text"
                onBlur={this.onBlurInput}
              />
            </div>
            <div
              onClick={this.getCode}
              id="TencentCaptcha"
              data-appid="2096087700"
              data-cbfn="callbackdfws"
              className={`${style.clickBox} ${
                this.state.disableCode ? null : style.disabledCode
              }`}
            >
              {this.state.tipFont}
            </div>
          </div>
        </div>
        <div
          onClick={this.bindEmail}
          className={`${style.btn} ${
            this.state.disabled ? null : style.disable
          }`}
        >
          <p>{email ? '更改绑定' : '立即绑定'}</p>
        </div>
      </div>
    )
  }
}

export default BindEmail
