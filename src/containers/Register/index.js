/**
 * Created by huangchao on 2017/9/27.
 */
import React, { PureComponent } from 'react'
import { InputItem, Toast } from 'antd-mobile'
import { Link } from 'react-router-dom'
import Rectangle from '../../static/back.png'
import { createForm } from 'rc-form'
import queryString from 'query-string'
import F from '../../helper/tool'
import style from './style.less'
import Loginstyle from '../Login/style.less'
import { captcha } from '../../actions/auth'
import { mobile, register } from '../../actions/auth'
import { errCode } from '../../helper/errCode'
import { connect } from 'react-redux'
import County from '../../inputs/County'

@connect(state => ({
  bindExistAccount: state.bindExistAccount,
}))
@createForm()
class Register extends PureComponent {
  state = {
    focused: true,
    password: true,
    tipFont: '获取验证码',
    disableCode: true,
    index: 60,
    needVerify: this.props.bindExistAccount.needVerify,
    phoneCounty: '0086',
  }

  changePasswordType = () => {
    this.setState({
      password: !this.state.password,
    })
  }
  setSst = obj => {
    this.setState({
      phoneCounty: obj.country,
    })
  }
  // changeImg = () => {
  //   captcha().then(data => {
  //     this.setState({
  //       url: data,
  //     })
  //   })
  //   window.zhuge.track('图形验证码')
  // }

  onPhoneNumber = () => {
    this.props.form.validateFields((err, value) => {
      if (err) return
      // console.log(value) && value.imgCode
      if (value.number && value.massageCode) {
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
    // 获取验证码
    this.props.form.validateFields((err, value) => {
      if (err) return
      if (!F.changePhoneNumber(value.number))
        return Toast.info('请输入正确的手机号码', 2)
      window.zhuge.track('获取验证码')

      let send = res => {
        if (this.state.disableCode) {
          mobile({
            mobile: value.number,
            captcha: '',
            sms_type: 2,
            tx_ticket: res.ticket,
            tx_randstr: res.randstr,
            tx_type: 1,
          }).then(data => {
            if (data.flag === 0) {
              this.setState({
                disableCode: false,
              })
              this.timer = setInterval(() => {
                if (this.state.index <= 0) {
                  return this.Clear()
                }

                this.setState({
                  index: this.state.index - 1,
                  tipFont: `${this.state.index - 1}秒后重新获取`,
                })
              }, 999)
            } else if (data.flag === 5012) {
              Toast.info('号码已注册', 2)
              window.zhuge.track('注册失败', {
                手机号已注册: '',
              })
            } else {
              window.zhuge.track('注册失败', {
                验证码错误: '',
              })
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
        if (res.ret === 0) {
          send(res)
        }
      })
      captcha1.show()
    })
  }

  onRegister = () => {
    // 注册
    if (this.state.disabled) {
      this.props.form.validateFields((err, value) => {
        if (err) return
        const { register_page_source } = queryString.parse(
          window.location.search
        )
        // console.log(value)
        register({
          register_page_source: register_page_source || 'https://m.veryeast.cn',
          username: value.number,
          mobile: value.number,
          code: value.massageCode,
          password: '', // 这个密码框去除了，用不到，暂时没有删除，保留字段
          register_type: 'mobile_register',
          user_type: 2,
          platform: 3,
          is_verify: this.state.needVerify,
          appchannel: 'web',
          country: this.state.phoneCounty,
        })
          .then(data => {
            if (data.status) {
              Toast.info('注册成功', 2)
              window.zhuge.track('注册成功', {
                用户ID: data.user_id,
                手机号: data.phone,
                邮箱: data.email,
              })
              setTimeout(() => {
                this.props.history.replace(
                  `/resume/micro${this.props.history.location.search}`
                )
              }, 1200)
            }
          })
          .catch(err => {
            window.zhuge.track('注册失败', {
              服务器返回原因: err.errMsg,
            })
            if (err.errCode === -404) {
              const payload = JSON.parse(err.errMsg)
              console.log(payload)
              this.props.dispatch({ type: 'GET_ACCOUNT_PAGE_DATA', payload })
              this.props.dispatch({
                type: 'ACCOUNT_GET_MOBILE',
                payload: value.number,
              })
              setTimeout(() => {
                this.props.history.replace(
                  `/user/bindExistAccount${this.props.history.location.search}`
                )
              }, 1200)
            } else {
              Toast.info(err.errMsg, 2)
            }
          })
      })
    }
  }

  goRegister = (url, key) => {
    const search = window.location.search

    if (search) {
      this.props.history.replace(`${url}` + search, { key: '登录弹窗' })
    } else {
      this.props.history.replace(url, { key: '登录弹窗' })
    }
  }

  goBack = () => {
    // const { redirect, sss, one } = queryString.parse(window.location.search)
    // let patt1 = new RegExp('service')
    // if (sss) {
    //   return (window.location.href = sss)
    // }
    // if (one) {
    //   return this.props.history.go(-1)
    // }

    // if (patt1.test(redirect)) {
    //   return this.props.history.go(-1)
    // } else if (redirect) {
    //   return this.props.history.replace(redirect)
    // }

    const {redirect} = queryString.parse(window.location.search)
    if(redirect){
      this.props.history.push(redirect)
    }else {
      this.props.history.push('/')
    }
  }

  componentDidMount() {
    const { key } = this.props.location.state || {}
    const { sss } = queryString.parse(window.location.search)
    // const TriggerSource = ''
    if (sss) {
      window.zhuge.track('注册页面打开', {
        触发来源: '首页浮窗',
      })
    } else {
      window.zhuge.track('注册页面打开', {
        触发来源: key || '其他来源',
      })
    }
    // captcha().then(data => {
    //   this.setState({
    //     url: data,
    //   })
    // })
  }

  componentWillUnmount() {
    this.timer && this.Clear()
  }

  render() {
    const { getFieldProps } = this.props.form
    // console.log(this.props.bindExistAccount)
    return (
      <div className={style.RegisterWrap}>
        <div className={style.back} onClick={this.goBack}>
          <img src={Rectangle} alt="返回" />
        </div>
        <div className={style.title}>注册最佳东方</div>
        <div className={style.forms}>
          <div className={style.phoneCode}>
            <InputItem
              {...getFieldProps('number', { onChange: this.onPhoneNumber })}
              className={style.inputHei}
              clear
              placeholder="请输入常用手机号"
              maxLength="11"
            >
            <County setSet={this.setSst.bind(this)}/>
            </InputItem>
          </div>

          <div className={style.massageCode}>
            <InputItem
              {...getFieldProps('massageCode', {
                onChange: this.onPhoneNumber,
              })}
              className={`${style.inputHei} ${style.massageLeft}`}
              clear
              placeholder="请输入短信验证码"
            />
            <div
              onClick={this.getCode}
              id="TencentCaptcha"
              data-appid="2096087700"
              data-cbfn="callbackdfws"
              className={`${style.massage} ${
                this.state.disableCode ? null : style.disabledCode
              }`}
            >
              {this.state.tipFont}
            </div>
          </div>
        </div>
        <div onClick={this.onRegister} className={style.subBtn}>
          <a className={this.state.disabled ? null : `${style.disabled}`}>
            注 册
          </a>

          <div className={Loginstyle.otherLogin}>
            <div />
            <div onClick={() => this.goRegister('/login')}>
              <span>直接登录</span>
            </div>
          </div>
        </div>
        <div className={style.agreement}>
          注册代表你已同意
          <Link
            rel="stylesheet"
            to={`/agreement`}
          >
            《最佳东方用户协议》
          </Link>
        </div>
      </div>
    )
  }
}

export default Register
