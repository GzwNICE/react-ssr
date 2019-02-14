import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import style from './style.less'
import { loggingStatus } from '../../actions/userStatus'
import { Button, Icon, Toast } from 'antd-mobile'
import queryString from 'query-string'
import * as auth from '../../actions/auth'
import Rectangle from '../../static/back.png'

@connect(state => {
  return {
    bindExistAccount: state.bindExistAccount,
  }
})
class BindExistAccount extends PureComponent {
  state = {
    collapsed: true, // 下拉选择默认收起
    listData: this.props.bindExistAccount.listData,
    userName:
      this.props.bindExistAccount.listData.length > 0
        ? this.props.bindExistAccount.listData[0].user_name
        : '', // 展示的值
    trueNameEncoded:
      this.props.bindExistAccount.listData.length > 0
        ? this.props.bindExistAccount.listData[0].true_name_encoded
        : '', // 展示的姓名
    trueName:
      this.props.bindExistAccount.listData.length > 0
        ? this.props.bindExistAccount.listData[0].true_name
        : '', // 展示的姓名
    mobile: this.props.bindExistAccount.mobile, // 手机号码
  }

  toogle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    })
  }
  handleHide = () => {
    this.setState({
      collapsed: true,
    })
  }
  handleLi = item => {
    this.setState({
      userName: item.user_name,
      trueNameEncoded: item.true_name_encoded,
    })
  }
  comfirmAccount = () => {
    const { userName, mobile, trueName } = this.state
    const parsed = queryString.parse(window.location.search)
    let _url = `${parsed.redirect}?`
    Object.keys(parsed).map(k => {
      if (k !== 'redirect') {
        _url += `${k}=${parsed[k]}&`
      }
      return null
    })
    auth
      .login({
        username: userName,
        password: trueName,
        platform: 2,
        appchannel: 'web',
        mobile,
      })
      .then(data => {
        if (data) {
          Toast.info('绑定成功', 2)
          this.props.dispatch(loggingStatus()).then(() => {
            setTimeout(() => {
              if (parsed.redirect) {
                this.props.history.replace(_url)
              } else {
                this.props.history.replace('/user')
              }
            }, 1200)
          })
        }
      })
      .catch(err => {
        Toast.info(err.errMsg, 2)
      })
  }
  goRegister = () => {
    this.props.dispatch({ type: 'ACCOUNT_IS_VERIFY', payload: '1' })
    this.props.history.replace(`/user/register${this.props.history.location.search}`)
  }
  goBack = () => {
    this.props.history.goBack()
  }
  render() {
    const {
      collapsed,
      listData,
      userName,
      mobile,
      trueNameEncoded,
    } = this.state
    const myIcon = collapsed ? (
      <Icon type="down" className={style['select-icon']} />
    ) : (
      <Icon type="up" className={style['select-icon']} />
    )
    const ulWraper =
      listData.length > 1 ? (
        <ul
          className={collapsed ? style['hide'] : style['select-wraper']}
          onClick={this.handleHide}
        >
          <div className={style['select-wraper-sanjiao-wraper']}>
            <div className={style['select-wraper-sanjiao']} />
          </div>
          {listData.length < 2
            ? null
            : listData.map((item, index) => (
                <li key={index} onClick={this.handleLi.bind(this, item)}>
                  {item.user_name}
                </li>
              ))}
        </ul>
      ) : null
    return (
      <div className={style.wraper}>
        <div className={style.back}>
          <img src={Rectangle} alt="返回" onClick={this.goBack} />
        </div>
        <p className={style.title}>绑定已有账号</p>
        <p className={style.content}>
          手机号
          <span>{mobile}</span>
          已被使用,请先确认以下账号是否属于你本人，如果是，请直接绑定，绑定后可用该手机号登录；如果不是，请注册新账号
        </p>
        <div className={style.contentWrap}>
          <div className={style.select}>
            <div onClick={this.toogle}>
              <span className={style['select-input']}>{userName}</span>
              {myIcon}
            </div>
            {ulWraper}
          </div>
          <div className={style.name}>
            <span>简历姓名: {trueNameEncoded || '暂无'}</span>
          </div>
          <Button
            onClick={this.comfirmAccount}
            // disabled={listData.length === 0}
          >
            确认绑定
          </Button>
          <div className={style.newAccount}>
            <div onClick={this.goRegister}>注册新账号</div>
          </div>
        </div>
      </div>
    )
  }
}
export default BindExistAccount
