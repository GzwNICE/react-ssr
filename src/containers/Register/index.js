/**
 * Created by zhangji on 2019/1/10.
 */
import React, { PureComponent } from 'react'
import { InputItem, Toast } from 'antd-mobile'
import { Link } from 'react-router-dom'
import Rectangle from '../../static/back.png'
import { createForm } from 'rc-form'
import queryString from 'query-string'
import style from './style.less'
import Loginstyle from '../Login/style.less'
import { mobile, register } from '../../actions/auth'
import { errCode } from '../../helper/errCode'
import { connect } from 'react-redux'
import Alert from '../../components/Alert'
import County from '../../inputs/County'
import { loggingStatus } from '../../actions/userStatus'
import { appShare } from '../../actions/auth'
import Cookies from 'js-cookie'
import BorderBottomLine from '../../components/BorderBottomLine'
import F from '../../helper/tool'
// import F from '../../helper/tool'
const triggerType = '类型'
const triggerFrom = '触发来源'

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
    upperLimit: false,
    registered: false,
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

  showModal = key => e => {
    if (e) e.preventDefault() // 修复 Android 上点击穿透
    this.setState({
      [key]: true,
    })
  }

  onClose = key => () => {
    this.setState({
      [key]: false,
    })
  }

  onBlurInput = ()=>{
    document.body.scrollTop=0
  }

  getCode = () => {
    // 获取验证码
    const upperLimit = this.showModal('upperLimit')
    const registered = this.showModal('registered')
    this.props.form.validateFields((err, value) => {
      if (err) return
      if (!value.number) return Toast.info('请输入手机号', 2)
      if (this.state.phoneCounty === '0086') {
        if (!/^1[3456789]\d{9}$/.test(value.number)) {
          Toast.info('请输入正确的手机号', 2)
          return
        }
      }
      window.zhuge.track('获取验证码_注册')
      let send = res => {
        if (this.state.disableCode) {
          mobile({
            mobile: value.number,
            sms_type: 2,
            tx_ticket: res.ticket,
            tx_randstr: res.randstr,
            tx_type: 1,
            country: this.state.phoneCounty,
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
                  tipFont: `${this.state.index - 1}s`,
                })
              }, 999)
              window.zhuge.track('获取验证码成功_注册')
            } else {
              const flag = data.flag
              const errMs = errCode[flag]
              if (data.flag === 5117 && errMs) {
                upperLimit()
              } else if (data.flag === 5014) {
                Toast.info('手机号与归属地不匹配', 2)
              } else if (data.flag === 5012) {
                registered()
              } else {
                Toast.info(errMs, 2)
              }
              window.zhuge.track('获取验证码失败_注册', {
                [`${triggerType}`]: errMs,
              })
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
              window.zhuge.track('注册成功')
              Cookies.set('reigsterMobile', value.number)
              this.props.dispatch(loggingStatus()).then(() => {
                setTimeout(() => {
                  this.props.history.replace(
                    `/resume/micro${this.props.history.location.search}`
                  )
                }, 999)
              })
            }
          })
          .catch(err => {
            window.zhuge.track('注册失败', {
              [`${triggerType}`]: err.errMsg,
            })
            if (err.errCode === -404) {
              const payload = JSON.parse(err.errMsg)
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

  goLogin = (url, key) => {
    if (key) {
      window.zhuge.track('登录页面打开', {
        [`${triggerFrom}`]: '注册页点击登录',
      })
    } else {
      window.zhuge.track('登录页面打开', {
        [`${triggerFrom}`]: '手机号已注册弹框点击登录',
      })
    }
    const search = window.location.search
    if (search) {
      this.props.history.replace(`${url}` + search, { key: '注册页面' })
    } else {
      this.props.history.replace(url, { key: '注册页面' })
    }
  }

  goBack = () => {
    const { redirect } = queryString.parse(window.location.search)
    if (redirect) {
      this.props.history.push(redirect)
    } else {
      this.props.history.push('/')
    }
  }

  componentDidMount() {
    // console.log(1111)
    
    // console.log(!!Cookies.get('ticket'))
      Cookies.remove('ticket')
      Cookies.remove('user_ticket')
      localStorage.removeItem('is_login')
      localStorage.removeItem('photo')
      Cookies.remove('photo')
    // const login = localStorage.getItem('is_login')
    // const login = F.getUserInfo().is_login
    // if (login === 1) {
    //   this.props.history.push('/user')
    // }
    window.wx.ready(() => {
      window.wx.updateTimelineShareData(appShare()) // 分享到朋友圈
      window.wx.updateAppMessageShareData(appShare()) // 分享给朋友
    })
  }

  componentWillUnmount() {
    this.timer && this.Clear()
    this.props.dispatch({ type: 'ACCOUNT_IS_VERIFY', payload: '' })
  }

  render() {
    const { getFieldProps } = this.props.form
    return (
      <div className={style.RegisterWrap}>
        <div className={style.back} onClick={this.goBack}>
          <img src={Rectangle} alt="返回" />
        </div>
        <div className={style.registerCent}>
          <div className={style.title}>注册最佳东方</div>
          <div className={style.forms}>
            <div>
              <InputItem
                {...getFieldProps('number', { onChange: this.onPhoneNumber })}
                className={style.inputHei}
                clear
                placeholder="请输入常用手机号"
                maxLength="11"
                type="number"
                onBlur={this.onBlurInput}
              >
                <County setSet={this.setSst.bind(this)} />
              </InputItem>
              <BorderBottomLine/>
            </div>

            <div className={style.massageCode}>
              <InputItem
                {...getFieldProps('massageCode', {
                  onChange: this.onPhoneNumber,
                })}
                className={`${style.inputHei} ${style.massageLeft}`}
                clear
                placeholder="请输入短信验证码"
                type="number"
                onBlur={this.onBlurInput}
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
            <BorderBottomLine/>

          </div>
          <div onClick={this.onRegister} className={style.subBtn}>
            <a className={this.state.disabled ? null : `${style.disabled}`}>
              注 册
            </a>

            <div className={Loginstyle.otherLogin}>
              <div />
              <div onClick={() => this.goLogin('/user/login', '注册页点击登录')}>
                <span>直接登录</span>
              </div>
            </div>
          </div>
          <div className={style.agreement}>
            注册代表你已同意
            <Link rel="stylesheet" to={`/agreement`}>
              《最佳东方用户协议》
            </Link>
          </div>
        </div>
        
        <Alert
          title="验证码上限提醒"
          height={120}
          closable={0}
          visible={this.state.upperLimit}
          onClose={this.onClose('upperLimit')}
          message={`当前手机号请求验证码次数过多，请稍后再试`}
          actions={[
            {
              text: '我知道了',
              onPress: this.onClose('upperLimit'),
              type: 'know',
            },
          ]}
        />
        <Alert
          title="手机号已注册"
          height={130}
          closable={0}
          visible={this.state.registered}
          onClose={this.onClose('registered')}
          message="该手机号已被注册，请直接登录"
          actions={[
            {
              text: '取消',
              onPress: this.onClose('registered'),
              type: 'close',
            },
            {
              text: '登录',
              onPress: () => this.goLogin('/user/login'),
              type: 'ok',
            },
          ]}
        />
      </div>
    )
  }
}

export default Register
