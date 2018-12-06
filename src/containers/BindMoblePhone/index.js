/**
 * Created by huangchao on 2017/11/3.
 */
import React, { PureComponent } from 'react'
import { NavBar, Toast, List } from 'antd-mobile'
import store from 'store'
import style from './style.less'
import {connect} from 'react-redux'
import { createForm } from 'rc-form'
import {captcha} from '../../actions/auth'
import F from '../../helper/tool'
import {bindMobile} from '../../actions/auth'
import { mobile as mobile_bind } from '../../actions/bind'
import PrefixMobile from '../../inputs/PrefixMobile'
// import {bindMobile} from '../../actions/moreSeeting'
// import LisetItem from '../../components/ListItem'
// import { NavBar, Toast } from 'antd-mobile'

@connect(state => {
  return {
    auth: state.auth,
    options: state.option.opt_phone_rules,
  }
})
@createForm()
class BindMoblePhone extends PureComponent {

  state = {
    url: '',
    disable:false,
    mobile: '',
    code: '',
    tipFont: '获取验证码',
    disableCode: true,
    index: 60,
    defaultPhone: '',
  }

  changeImg = () => {
    captcha().then(data => {
      this.setState({
        url: data,
      })
    })
  }

  onChange = () => {
    const mobile = this.refs.mobile.value
    const code = this.refs.code.value
    if(mobile.length> 0 && code.length > 0) {
      this.setState({
        disable: true,
      })
    }
    this.setState({
      mobile,
      code,
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
    const { mobile, disableCode} = this.state
    const { options,form,auth } = this.props
    const country = form.getFieldValue('country')[0]
    const opt = options.filter(item => parseInt(item.country,10) === parseInt(country,10))
    if(!F.changePhoneNumber(mobile) && (opt && mobile.length!==parseInt(opt[0].length,10))) return Toast.fail(country==='0086' ? '请输入正确的手机号' : '该手机号与归属地不匹配', 2)
    if (country === '0086') {
      if(!/^1[3456789]\d{9}$/.test(mobile)) {
        Toast.fail('请输入正确的手机号', 2)
        return
      }
    }
    if (disableCode){
      let send = (res) => {
        mobile_bind({
          country: country,
          mobile: mobile,
          sms_type: 3,
          page_source: 3,
          user_id: auth.user_id,
          version: '9.9.9',
          tx_ticket: res.ticket,
          tx_randstr: res.randstr,
          tx_type: 1,
        }).then((data) => {
          const { msg, errCode } = data
          if(errCode === 0) {
            this.setState({
              disableCode: false,
            })
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
          } else {
            if (msg) {
              Toast.fail(msg, 2)
            }
            captcha().then(data => {
              this.setState({
                url: data,
              })
            })
          }
        })
      }
      let captcha1 = new window.TencentCaptcha('2096087700', function(res) {
        if(res.ret === 0){
          send(res)
        }
      })
      captcha1.show()
    }
  }

  bindPhone = () => {
    if(this.state.disable) {
      if(this.state.mobile === '') return Toast.info('请输入手机号', 2)
      if(this.state.code === '') return Toast.info('请输入短信验证码', 2)
      const { mobile} = this.state
      const { options,form } = this.props
      const country = form.getFieldValue('country')[0]
      const opt = options.filter(item => parseInt(item.country,10) === parseInt(country,10))
      if(!F.changePhoneNumber(mobile) && (opt && mobile.length!==parseInt(opt[0].length,10))) return Toast.fail(country==='0086' ? '请输入正确的手机号' : '该手机号与归属地不匹配', 2)
      if (country === '0086') {
        if(!/^1[3456789]\d{9}$/.test(mobile)) {
          Toast.fail('请输入正确的手机号', 2)
          return
        }
      }
      bindMobile({
        smsType: 3,
        country: this.props.form.getFieldValue('country')[0],
        mobile: this.state.mobile,
        code: this.state.code,
        appid: 1,
        appchannel: 'web',
        page_source: 3,
        user_id: this.props.auth.user_id,
        version: '9.9.9',
      }).then(data => {
        console.log(data)
        if(data.status === 1) {
          store.set('m:auth', {...this.props.auth, phone: this.state.mobile})
          this.props.dispatch({type: 'CHANGE_BIND_MOBILE'})
          Toast.info('绑定成功', 2, ()=>{
            this.props.history.goBack()
          })
        } else {
          Toast.info(data.errMsg, 2)
        }
      })
        .catch(err => {
          Toast.info(err.errMsg, 2)
         // console.log(err)
        })
    }
  }

  onScrollChange= (value) => {
    console.log(value)
  }

  componentDidMount() {
    // console.log(this.props.auth.phone)
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
    const { form } = this.props
    const {phone} = this.props.auth
    const { getFieldProps } = form
    const desc =
    !phone ? (
      <div>请绑定常用手机号，绑定后，可用于帐号登录、找回密码等</div>
    ) : (
      <div>
        <p>当前绑定手机号：{F.hidden_mobile(phone)}</p>
        <p>更改后请用新手机号登录</p>
      </div>
    )
    return (
      <div className={style.BindMoblePhoneWrap}>
        <NavBar
          mode="dark"
          onLeftClick={() => {this.props.history.go(-1)}}
        >绑定手机</NavBar>
        <div className={style.inputBox}>
          {desc}
          <div className={style.country}>
          <List>
            <PrefixMobile
              {...getFieldProps('country', {
                initialValue: ['0086'],
              })}
              title="国际区号"
              extra="请选择"
            >
              <List.Item arrow="horizontal"></List.Item>
            </PrefixMobile>
            </List>
          </div>
          <div className={style.inputItem}>
            <input onChange={this.onChange} maxLength="11" ref="mobile" placeholder="请输入手机号码" type="number" />
          </div>
          <div className={style.userItem}>
            <div className={style.inputItem}>
              <input onChange={this.onChange}  ref="code" placeholder="请输入手机验证码" type="text" />
            </div>
            <div onClick={this.getCode}
                 id="TencentCaptcha" data-appid="2096087700" data-cbfn="callbackdfws"
                 className={`${style.clickBox} ${this.state.disableCode ? null : style.disabledCode}`}>
              {this.state.tipFont}
            </div>
          </div>
        </div>
        <div onClick={this.bindPhone} className={`${style.btn} ${this.state.disable ? null : style.disable}`}>
          <p>{phone ? '更改绑定' : '立即绑定'}</p>
        </div>
      </div>
    )
  }
}

export default BindMoblePhone

