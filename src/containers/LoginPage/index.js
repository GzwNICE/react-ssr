import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
// import { InputItem, Toast } from 'antd-mobile'
// import queryString from 'query-string'
// import logopng from '../../static/logo@320x.png'
// import passwordno from '../../static/paswordno@3x.png'
// import paswordimg from '../../static/pasword@3x.png'
// import { createForm } from 'rc-form'
// import * as auth from '../../actions/auth'
// import { loggingStatus } from "../../actions/userStatus";
import { Tabs, Badge, Toast } from 'antd-mobile'
import Login from '../Login'
import LoginCode from '../LoginCode'
import style from './style.less'
import Rectangle from '../../static/back.png'
import queryString from 'query-string'


@connect(state => ({}))
class LoginPage extends PureComponent {

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

  render() {
    // const { getFieldProps } = this.props.form
    const tabs = [
      { title: <Badge key="1">验证码登录</Badge> },
      { title: <Badge key="2">密码登录</Badge> },
    ]
    return (
      <div className={style.loginPage}>
        <div className={style.back} onClick={this.goBack}>
          <img src={Rectangle} alt="返回" onClick={this.goBack} />
        </div>
        <div className={style.loginTab}>
          <Tabs
            tabs={tabs}
            initialPage={0}
            swipeable={false}
            animated={false}
          >
            <LoginCode />
            <Login />
          </Tabs>
        </div>
      </div>
    )
  }
}

export default LoginPage
