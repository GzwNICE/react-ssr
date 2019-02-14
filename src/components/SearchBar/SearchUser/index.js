import React, { Component } from 'react'
import { SearchBar } from 'antd-mobile'
import { Link, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import * as Ad from '../../Ad'
import back from '../../../static/back.png'
import unHome from '../../../static/unHome@3x.png'
import personal from '../../../static/personal.png'
import Userdefault from '../../../static/portrait@3x.png'
import PropTypes from 'prop-types'
import style from '../style.less'
// import { loggingStatus } from '../../../actions/userStatus'
const triggerFrom = '触发来源'

@connect(state => ({
  is_login: state.userStatus.is_login,
  photo: state.userStatus.photo,
}))
class SearchUser extends Component {
  static propTypes = {
    autoFocus: PropTypes.bool,
  }
  constructor(props) {
    super(props)
    this.state = {
      show: true,
      is_login: '',
      photo: '',
    }
  }

  /* 诸葛 下载或者打开app */
  downLoadAd = (key) => {
    window.location.href = 'share2js://app?type=1'
    if(key === 1){
      window.zhuge.track('下载APP', { [`${triggerFrom}`]: '企业详情页顶部推荐' })
      setTimeout(() => {
        window.location.href = 'https://m.veryeast.cn/mobile/ariadownload?utm_source=h506'
      }, 2000)
    }else {
      window.zhuge.track('下载APP', { [`${triggerFrom}`]: '职位详情页顶部推荐' })
      setTimeout(() => {
        window.location.href = 'https://m.veryeast.cn/mobile/ariadownload?utm_source=h505'
      }, 2000)
    }
  }

  goHome=(key)=>{
    if(key === 1){
      window.zhuge.track('企业详情页点击首页icon')
    }else {
      window.zhuge.track('职位详情页点击首页icon')
    }
  }

  /* 诸葛  注册页面打开 */
  goRegister = (key) => {
    if(key === 1){
      window.zhuge.track('注册页面打开', { [`${triggerFrom}`]: '企业详情页个人中心icon' })
    }else {
      window.zhuge.track('注册页面打开', { [`${triggerFrom}`]: '职位详情页个人中心icon' })
    }
  }

  componentDidMount() {
    // if (this.props.autoFocus) {
    //   this.autoFocusInst.onFocus()
    // }
    this.setState({
      is_login: localStorage.getItem('is_login')
        ? localStorage.getItem('is_login')
        : '',
      photo: localStorage.getItem('photo')
        ? localStorage.getItem('photo')
        : '',
    })
  }

  render() {
    const { show, is_login, photo } = this.state
    const { searchShow } = this.props
    return (
      <div className={searchShow ? style.headScoll : style.positionHead}>
        <Ad.AdTop show={show} downLoadAd={()=>this.downLoadAd(this.props.zhugeFrom)} />
        <div className={style.searchbar}>
          <div className={style.goBack} onClick={this.props.goBack}>
            <img src={back} alt="bank" />
          </div>
          {searchShow ? (
            <SearchBar
              placeholder="搜索职位/公司"
              onFocus={this.props.searchFocus}
            />
          ) : (
            <div className={style.companyTitle}>{this.props.title}</div>
          )}
          <div className={style.navLink}>
            <Link rel="stylesheet" to={`/`} onClick={()=>this.goHome(this.props.zhugeFrom)}>
              <img src={unHome} alt="img" className={style.searcHome} />
            </Link>
            <Link
              rel="stylesheet"
              to={
                is_login
                  ? `/user?redirect=${this.props.location.pathname}`
                  : `/user/register?redirect=${this.props.location.pathname}`
              }
              onClick={()=>this.goRegister(this.props.zhugeFrom)}
            >
              <img
                src={is_login ? (photo ? photo : Userdefault) : personal}
                alt=""
                className={style.personal}
              />
            </Link>
          </div>
        </div>
      </div>
    )
  }
}

export default withRouter(SearchUser)
