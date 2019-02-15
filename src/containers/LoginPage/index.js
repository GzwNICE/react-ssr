import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { Tabs, Badge } from 'antd-mobile'
import Login from '../Login'
import LoginCode from '../LoginCode'
import style from './style.less'
import Rectangle from '../../static/back.png'
import { appShare } from '../../actions/auth'
import queryString from 'query-string'
import F from '../../helper/tool'
const triggerFrom = "触发来源"

@connect(state => ({}))
class LoginPage extends PureComponent {

  goBack = () => {
    // const {redirect} = queryString.parse(window.location.search)
    // if(redirect){
    //   this.props.history.push(redirect)
    // }else {
    //   this.props.history.push('/')
    // }
    let search = this.props.history.location.search
    if (search.indexOf('?redirect=') !== -1) {
      let redirect = search.split('?redirect=')[1]
      this.props.history.replace(redirect)
    } else {
      this.props.history.replace('/')
    }
  }

  componentDidMount(){
    window.zhuge.track('登录页面打开', { [`${triggerFrom}`]: '登录链接直接打开' })
    const login = F.getUserInfo().is_login
    if(login){
      this.props.history.push('/user')
    }
    window.wx.ready(() => {
      window.wx.updateTimelineShareData(appShare()) // 分享到朋友圈
      window.wx.updateAppMessageShareData(appShare()) // 分享给朋友
    })
  }

  render() {
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
