import React, { Component } from 'react'
import * as Ad from '../../components/Ad'
import Search from '../../components/SearchBar/Search'
import { WhiteSpace } from 'antd-mobile'
import { connect } from 'react-redux'
import queryString from 'query-string'
import CompanyList from './CompanyList'
import RegisterWrap from '../../components/RegisterWrap'
import Down from '../../static/angleDownGray@3x.png'
import style from './style.less'

@connect(state => ({
  is_login: state.userStatus.is_login,
}))
export default class CompanyArea extends Component {
  state = {
    show: true,
    individuation:
      'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1544442642838&di=c8f9fe705e692237102ddfc3c5fcb07b&imgtype=0&src=http%3A%2F%2Fh.hiphotos.baidu.com%2Fzhidao%2Fwh%253D450%252C600%2Fsign%3D4916d4fafe1f4134e0620d7a102fb9fc%2F96dda144ad3459825dbfac8b0ff431adcbef84f6.jpg',
    showRegWrap: true,
  }

  /* 下载或者打开app */
  downLoadAd = () => {
    window.zhuge.track('下载App')
    window.location.href = 'https://m.veryeast.cn/mobile/index.html?c=mobile' //"BaiduDsp://activity.veryeast.cn/baidu/mobile/index"
  }

  // 关闭底部引导注册弹框
  handleCloseReg() {
    this.setState({
      showRegWrap: false,
    })
  }

  /* 记录滚动条的位置 */
  onScroll = e => {
    // let top = document.body.scrollTop || document.documentElement.scrollTop
    // this.scrollTop = top
    // let scroll = window.scrollY
    // if (scroll > 360) {
    //   this.setState({
    //     showAd: true,
    //   })
    // } else {
    //   this.setState({
    //     showAd: false,
    //   })
    // }
  }

  whereWillIGo = () => {
    const { pathSearch } = queryString.parse(window.location.search)
    if (pathSearch) {
      this.props.history.go(-1)
    } else {
      this.props.history.length === 2 || this.props.history.length === 1
        ? this.props.history.push('/tabs/home')
        : this.props.history.go(-1)
    }
  }

  componentDidMount() {}

  componentWillUnmount() {}

  render() {
    const { show, individuation, showRegWrap } = this.state
    const isLogin = this.props.is_login
    return (
      <div className={style.CompanyArea}>
        <div className={style.selHead}>
          <Ad.AdTop show={show} downLoadAd={this.downLoadAd} />
          <Search goBack={this.whereWillIGo} />
          <div className={style.selectInfo}>
            <div className={style.selCity}>
              <span>城市</span>
              <img src={Down} alt="down" />
            </div>
            <span className={style.selRule} />
            <div className={style.selBrand}>
              <span>品牌</span>
              <img src={Down} alt="down" />
            </div>
          </div>
        </div>
        <div className={style.blocCentent} >
          
          <CompanyList />
        </div>

        {isLogin === 0 ? (
          showRegWrap ? (
            <RegisterWrap
              onCloseReg={this.handleCloseReg.bind(this)}
              location={this.props.history.location.pathname}
            />
          ) : null
        ) : null}
      </div>
    )
  }
}
