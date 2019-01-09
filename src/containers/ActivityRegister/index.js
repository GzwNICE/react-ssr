/**
 * Created by huangchao on 02/02/2018.
 */
import React, { PureComponent } from 'react'
import { InputItem, Toast, List, DatePicker } from 'antd-mobile'
import style from './style.less'
import passwordno from '../../static/paswordno@3x.png'
import paswordimg from '../../static/pasword@3x.png'
import { createForm } from 'rc-form'
import queryString from 'query-string'
import F from '../../helper/tool'
// import {captcha} from '../../actions/auth'
import {mobile, register} from '../../actions/auth'
import logo from '../../static/veryeast-logo.png'
import moment from 'moment'
import Gender from '../../inputs/Gender'
import Post from '../../inputs/Post'
import Industry from '../../inputs/Industry'
import Area from '../../inputs/Area'
import Education from '../../inputs/Education'
import { microDone } from '../../actions/microresume'
import { connect } from 'react-redux'


@connect(state => {
  return {
  }
})
@createForm()
class Register extends PureComponent {
  state = {
    focused: true,
    password: true,
    tipFont: '获取验证码',
    disableCode: true,
    index: 60,
    parcel: {},
  }

  changePasswordType = () => {
    this.setState({
      password: !this.state.password,
    })
  }

  changeImg = () => {
    // captcha().then(data => {
    //   this.setState({
    //     url: data,
    //   })
    // })
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
          } else {
            // this.changeImg()
            Toast.info('验证码错误', 2)
          }
        })
      }
    })
  }

  tipsErr = (tips) => {
    var ok = true;
    for (const value of tips) {
      if (!value[2]) {
        if (!value[0] || !value[0].length) {
          Toast.info(value[1],2)
          ok = false
        }
      }else {
        if (!value[0] || !value[0].length) {
          Toast.info(value[1][0],2)
          ok = false
        }else if(!value[2].test(value[0])){
          Toast.info(value[1][1],2)
          ok = false
        }
      }
    }
    return ok;
  }

  makeSure = () => {
    this.props.form.validateFields((err, value) => {
      this.props.dispatch(microDone({
        ...value,
        mobil: value.number,
      })).then((res) => {
        const {redirect} = queryString.parse(window.location.search)
        if(redirect) {
          window.location.href = redirect
        } else {
          this.props.history.push('/')
        }
      })
        .catch(err => {
          console.log(err)
        })
    })
  }

  onRegister = () => { // 注册
    const _that = this
    this.props.form.validateFields((err, value) => {
      if(err) return
      const mobileReg = /^1[3456789]\d{9}$/
      const passwordReg = /^[0-9a-zA-Z]{6,20}$/
      value.birthday = value.birthday && moment(value.birthday).format('YYYY-MM-DD')
      value.work_date = value.work_date && moment(value.work_date).format('YYYY-MM-DD')
      value.number = value.number && value.number.replace(/\s/g,"")
      const isOk = this.tipsErr([
        [value.degree, '请选择学历'],
        [value.birthday, '请选择出生日期'],
        [value.person_desired_location, '请选择意向地区'],
        [value.person_desired_industry, '请选择意向行业'],
        [value.person_desired_position, '请选择意期望职位'],
        [value.newPassword,  ['请输入密码', '请输入正确的密码'], passwordReg],
        [value.massageCode, ['请输入短信验证码']],
        [value.number, ['请输入手机号', '请输入正确的手机号'], mobileReg],
        [value.true_name_cn, '请输入姓名'],
        // [value.work_date, '请选择参加工作时间'],
      ])

      if(isOk) {
        register({
          username: value.number,
          mobile: value.number,
          code: value.massageCode,
          password: value.newPassword,
          register_type: 'mobile_register',
          user_type: 2,
        }).then(data => {
          if(data.status) {
            _that.makeSure() // 注册微简历
          }
        })
          .catch(err => {
            Toast.info(err.errMsg || err.msg, 1)
          })
      }
    })
  }

  componentDidMount() {
    // captcha().then(data => {
    //   this.setState({
    //     url: data,
    //   })
    // })
    this.setState({
      parcel: queryString.parse(window.location.search),
    })
  }

  componentWillUnmount() {
    this.timer && this.Clear()
  }

  render() {
    const { getFieldProps } = this.props.form;
    const { parcel } = this.state
    return (
      <div className={style.container}>
        <div className={style.header}>
          <img src={logo} alt="logo"/>
          <div>旅游服务业专业的招聘平台</div>
        </div>
        <div className={style.info}>29万个职位，9.2万家企业，等你来撩！</div>
        <div className={style.content}>
          <div className={style.line}>
            <List>
              <InputItem
                {...getFieldProps('true_name_cn', {
                  initialValue: parcel.true_name_cn,
                })}
                placeholder="请输入姓名"
              >姓&emsp;名</InputItem>
            </List>
          </div>
          <div className={style.line}>
            <Gender
              {...getFieldProps('gender', {
                initialValue: parcel.gender || 1,
              })}
            >
              <List.Item>性&emsp;别</List.Item>
            </Gender>
          </div>
          <div className={style.line}>
            <List>
              <InputItem
                {...getFieldProps('number', {
                  initialValue: parcel.number,
                })}
                maxLength="11"
                placeholder="手机号"
              >手机号</InputItem>
            </List>
          </div>
          <div className={style.pictureCode}>
            <InputItem
              {...getFieldProps('imgCode')}
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
              {...getFieldProps('massageCode')}
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
              {...getFieldProps('newPassword')}
              className={`${style.inputHei} ${style.passwordLeft}`}
              type={this.state.password ? 'password' : 'text'}
              clear
              maxLength="20"
              placeholder="请输入6-20个字母或数字的密码"
            >密  码</InputItem>
            <div className={style.password} onClick={this.changePasswordType}>
              <img src={this.state.password ? passwordno : paswordimg} alt="显示" />
            </div>
          </div>
          <div className={style.line}>
            <Post
              {...getFieldProps('person_desired_position', {
              })}
              maxLength={5}
            >
              <List.Item arrow="horizontal">意向职位</List.Item>
            </Post>
          </div>
          <div className={style.line}>
            <Industry
              {...getFieldProps('person_desired_industry', {
              })}
              maxLength={1}
            >
              <List.Item arrow="horizontal">意向行业</List.Item>
            </Industry>
          </div>
          <div className={style.line}>
            <Area
              {...getFieldProps('person_desired_location', {})}
            >
              <List.Item arrow="horizontal">意向地区</List.Item>
            </Area>
          </div>
          <div className={style.line}>
            <DatePicker
              {...getFieldProps('birthday', {
              })}
              mode="date"
              title="出生日期"
              extra="请选择"
              minDate={moment().year(moment().year() - 100)}
              maxDate={moment().year(moment().year() - 15)}
            >
              <List.Item arrow="horizontal">出生日期</List.Item>
            </DatePicker>
          </div>
          <div className={style.line}>
            <Education
              {...getFieldProps('degree', {
                initialValue: [],
              })}
              title="最高学历"
              extra="请选择"
            >
              <List.Item arrow="horizontal">最高学历</List.Item>
            </Education>
          </div>
        </div>
        <div onClick={this.onRegister} className={style.makeSure}>
          <a>注 册</a>
        </div>
      </div>
    )
  }
}

export default Register
