/**
 * Created by huangchao on 2017/10/10.
 */
import React, { PureComponent } from 'react'
import { withRouter } from 'react-router-dom'
import {
  NavBar,
  Flex,
  InputItem,
  Toast,
  Icon,
} from 'antd-mobile'
import { createForm } from 'rc-form'
import store from 'store'
import _ from 'lodash'
import { connect } from 'react-redux'
import F from '../../helper/tool'
import { email_verify_code, email_verify } from '../../actions/bind'
import style from './style.less'
import BorderBottomLine from '../../components/BorderBottomLine/index'

@connect(state => {
  return {
    auth: state.auth,
  }
})
@createForm()
@withRouter
class EmailBind extends PureComponent {
  state = {
    timeStamp: '',
    tipFont: '获取验证码',
    index: 60,
    disableCode: true,
    status: 1,
    hidden_email: '',
    text: '立即绑定',
    emailPlacehold: '请输入邮箱',
    disabled: false,
  }
  onUserName = () => {
    this.props.form.validateFields((err, value) => {
      if (err) return
      if (value.email && value.code) {
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
  componentDidMount() {
    const email = this.props.match.params.email
    const hidden_email = this.props.match.params.hidden_email
    const status = this.props.match.params.status
    if (status === '1') {
      this.setState({
        status: 3,
        text: '更改绑定',
        emailPlacehold: '请输入新邮箱',
        hidden_email: hidden_email,
      })
    } else {
      if (_.toInteger(email) || (status === '0' && email !== '0')) {
        this.setState({
          status: 2,
          hidden_email: hidden_email,
        })
        this.props.form.setFieldsValue({
          email: hidden_email,
        })
      }
    }
  }

  componentWillUnmount() {
    clearInterval(this.timer)
  }

  alertFail = err => {
    const newErr = F.sortObj(err)
    for (const key in newErr) {
      if (newErr.hasOwnProperty(key)) {
        const ele = newErr[key]
        if (ele.errors.length > 0) {
          Toast.fail(ele.errors[0].message, 2)
        }
      }
    }
  }

  handleSubmit = e => {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (err) {
        this.alertFail(err)
        return
      }
      let emailVal = values.email
      if (emailVal.indexOf('*') !== -1) {
        emailVal = this.props.match.params.email
      }
      let reg = new RegExp(
        '^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$'
      ) //正则表达式
      if (!reg.test(emailVal)) {
        //正则验证不通过，格式不对
        Toast.fail('请输入正确的邮箱', 2)
        return
      }
      email_verify({
        ...values,
        email: emailVal,
        appchannel: 'web',
      }).then(data => {
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
            store.set('m:auth', { ...this.props.auth, email: emailVal })
            this.props.dispatch({ type: 'CHANGE_BIND_EMAIL' })
            this.props.dispatch({
              type: 'CHANGE_BIND_EMAIL_VALUE',
              payload: emailVal,
            })
            this.props.history.replace('/resume/info')
          })
        }
      })
    })
  }

  getCode = () => {
    this.props.form.validateFields(['email'], (err, value) => {
      if (err) {
        this.alertFail(err)
        return
      }
      if (this.state.disableCode) {
        let emailVal = value.email
        if (emailVal.indexOf('*') !== -1) {
          emailVal = this.props.match.params.email
        }
        // checkEmail(emailVal)
        let reg = new RegExp(
          '^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$'
        ) //正则表达式
        if (!reg.test(emailVal)) {
          //正则验证不通过，格式不对
          Toast.fail('请输入正确的邮箱', 2)
          return
        }
        email_verify_code({
          ...value,
          email: emailVal,
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

  onBlurInput = ()=>{
    document.body.scrollTop=0
  }

  render() {
    const { form } = this.props
    const {
      status,
      hidden_email,
      text,
      emailPlacehold,
    } = this.state
    const { getFieldProps } = form
    const desc =
      status === 1 ? (
        <div>
          请绑定常用邮箱，绑定后，可用于接收投递简历反馈通知、找回密码等
        </div>
      ) : status === 2 ? (
        <div>
          当前邮箱未绑定，绑定后，可用于接收投递简历反馈通知、找回密码等
        </div>
      ) : (
        <div>
          <p>
            当前绑定邮箱：{hidden_email}
            ，更改后，请用新邮箱接收投递简历反馈通知、找回密码等
          </p>
        </div>
      )
    return (
      <Flex direction="column" align="stretch" className={style.root}>
        <NavBar
          mode="light"
          className={style.nav}
          icon={<Icon type="left" />}
          onLeftClick={() => this.props.history.goBack()}
        >
          绑定邮箱
        </NavBar>
        <Flex.Item className={style.wrap}>
          <div>
            <div>{desc}</div>
            <div className={style.list}>
              <div>
                <InputItem
                  {...getFieldProps('email', {
                    initialValue: '',
                    rules: [
                      {
                        required: true,
                        message: '请输入邮箱',
                      },
                    ],
                    onChange: this.onUserName,
                  })}
                  clear
                  placeholder={emailPlacehold}
                  onBlur={this.onBlurInput}
                />
                <BorderBottomLine />
                <div className={style.tip}>
                  <InputItem
                    {...getFieldProps('code', {
                      initialValue: '',
                      rules: [
                        {
                          required: true,
                          message: '请输入短信验证码',
                        },
                      ],
                      onChange: this.onUserName,
                    })}
                    clear
                    className={style.authCode}
                    placeholder="请输入验证码"
                    onBlur={this.onBlurInput}
                  />
                </div>
                <div
                  onClick={this.getCode}
                  className={`${style.massage} ${
                    this.state.disableCode ? null : style.disabledCode
                  }`}
                >
                  {this.state.tipFont}
                </div>

                <BorderBottomLine />
              </div>
              <p className={style.footer}>
                注：请登录邮箱查看验证码，并填写到输入框
              </p>

              <div className={style.btn}>
              <a
                className={this.state.disabled ? null : `${style.disabled}`}
                onClick={this.handleSubmit}
              >
                {text}
              </a>
            </div>
            </div>
          </div>
        </Flex.Item>
      </Flex>
    )
  }
}

export default EmailBind

// <Button
//                   onClick={this.getCode}
//                   disabled={!disableCode}
//                   className={style.emailCode}
//                   type="ghost"
//                   size="small"
//                   inline
//                 >
//                   {tipFont}
//                 </Button>
