/**
 * Created by huangchao on 2017/10/10.
 */
import React, { PureComponent } from 'react'
import { withRouter } from 'react-router-dom'
import {
  NavBar,
  Flex,
  WingBlank,
  InputItem,
  Button,
  Toast,
  Icon,
} from 'antd-mobile'
import { createForm } from 'rc-form'
import store from 'store'
import _ from 'lodash'
import { connect } from 'react-redux'
// import PrefixMobile from '../../inputs/PrefixMobile'
import { bindMobile } from '../../actions/auth'
import { mobile } from '../../actions/bind'
import F from '../../helper/tool'
import style from './style.less'
import County from '../../inputs/County'
import BorderBottomLine from '../../components/BorderBottomLine/index'

// const isPoneAvailable = (str) => {
//   var myreg=/^[1][3,4,5,7,8][0-9]{9}$/;
//   if (!myreg.test(str)) {
//       return false;
//   } else {
//       return true;
//   }
// }
// console.log(isPoneAvailable('18 50 00 00 00'))
@connect(state => {
  return {
    auth: state.auth,
    options: state.option.opt_phone_rules,
  }
})
@createForm()
@withRouter
class MobileBind extends PureComponent {
  state = {
    timeStamp: '',
    tipFont: '获取验证码',
    index: 60,
    disableCode: true,
    status: 1,
    hidden_mobile: '',
    text: '立即绑定',
    mobilePlacehold: '请输入手机号',
    phoneCounty: '0086',
  }

  componentDidMount() {
    const mobile = this.props.match.params.mobile
    const hidden_mobile = this.props.match.params.hidden_mobile
    const status = this.props.match.params.status
    if (status === '1') {
      this.setState({
        status: 3,
        text: '更改绑定',
        mobilePlacehold: '请输入新手机号',
        hidden_mobile: hidden_mobile,
      })
    } else {
      if (_.toInteger(mobile)) {
        this.setState({
          status: 2,
          hidden_mobile: hidden_mobile,
        })
        this.props.form.setFieldsValue({
          mobile: hidden_mobile,
        })
      }
    }
  }
  setSst = obj => {
    this.setState({
      phoneCounty: obj.country,
    })
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
    const { phoneCounty } = this.state
    this.props.form.validateFields((err, values) => {
      let mobileVal = values.mobile
      if (mobileVal.indexOf('*') !== -1) {
        mobileVal = this.props.match.params.mobile
      }
      if (phoneCounty === '0086' && !/^1[3456789]\d{9}$/.test(mobileVal)) {
        Toast.fail('请输入正确的手机号', 2)
        return
      }
      if (err) {
        this.alertFail(err)
        return
      }
      bindMobile({
        ...values,
        appid: 1,
        appchannel: 'web',
        smsType: 3,
        page_source: 3,
        user_id: this.props.user_id,
        version: '9.9.9',
        mobile: mobileVal,
      }).then(data => {
        const { msg, errMsg, status } = data
        if (status !== 1) {
          this.props.form.setFieldsValue({
            code: '',
          })
          console.log(errMsg)
          if (errMsg || msg) {
            Toast.fail(errMsg || msg, 2)
          }
        } else {
          Toast.success('绑定成功', 2, () => {
            store.set('m:auth', { ...this.props.auth, phone: mobileVal })
            this.props.dispatch({ type: 'CHANGE_BIND_MOBILE' })
            this.props.dispatch({
              type: 'CHANGE_BIND_MOBILE_VALUE',
              payload: mobileVal,
            })
            this.props.history.replace('/resume/info')
          })
        }
      })
    })
  }

  getCode = () => {
    const { options } = this.props
    const { phoneCounty } = this.state

    this.props.form.validateFields(['mobile'], (err, value) => {
      let mobileVal = value.mobile
      if (mobileVal.indexOf('*') !== -1) {
        mobileVal = this.props.match.params.mobile
      }
      if (phoneCounty === '0086') {
        if (!/^[1][3456789][0-9]{9}$/.test(mobileVal)) {
          Toast.fail('请输入正确的手机号', 2)
          return
        }
      }
      const opt = options.filter(
        item => parseInt(phoneCounty, 10) === parseInt(phoneCounty, 10)
      )
      if (opt && mobileVal.length !== parseInt(opt[0].length, 10))
        return Toast.fail(
          phoneCounty === '0086'
            ? '请输入正确的手机号'
            : '该手机号与归属地不匹配',
          2
        )

      if (err) {
        this.alertFail(err)
        return
      }
      if (this.state.disableCode) {
        mobile({
          ...value,
          country: phoneCounty,
          sms_type: 3,
          page_source: 3,
          user_id: this.props.user_id,
          version: '9.9.9',
          mobile: mobileVal,
        }).then(data => {
          const { msg, errCode } = data
          if (errCode !== 0) {
            if (msg) {
              Toast.fail(msg, 2)
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

  render() {
    const { form } = this.props
    const {
      tipFont,
      disableCode,
      status,
      hidden_mobile,
      text,
      mobilePlacehold,
    } = this.state

    const { getFieldProps } = form
    const desc =
      status === 1 ? (
        <div>请绑定常用手机号，绑定后，可用于帐号登录、找回密码等</div>
      ) : status === 2 ? (
        <div>当前手机号未绑定，绑定后，可用于帐号登录、找回密码等</div>
      ) : (
        <div>
          <p>当前绑定手机号：{hidden_mobile},更改后请用新手机号登录</p>
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
          绑定手机
        </NavBar>
        <Flex.Item className={style.wrap}>
          <div>
            <WingBlank size="md">{desc}</WingBlank>
            <div className={style.list}>
              <div>
                <InputItem
                  {...getFieldProps('mobile', {
                    initialValue: '',
                    rules: [
                      {
                        required: true,
                        message: '请输入手机号码',
                      },
                    ],
                  })}
                  clear
                  placeholder={mobilePlacehold}
                >
                  <County setSet={this.setSst.bind(this)} />
                </InputItem>
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
                    })}
                    clear
                    className={style.authCode}
                    placeholder="请输入验证码"
                  />
                </div>

                <Button
                  className={style.mobieCode}
                  onClick={this.getCode}
                  disabled={!disableCode}
                  type="ghost"
                  size="small"
                  inline
                >
                  {tipFont}
                </Button>
                <BorderBottomLine />
              </div>
              <div className={style.btn}>
                <Button type="primary" onClick={this.handleSubmit}>
                  {text}
                </Button>
              </div>
            </div>
          </div>
        </Flex.Item>
      </Flex>
    )
  }
}

export default MobileBind
