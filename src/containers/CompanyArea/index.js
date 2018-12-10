import React, { Component } from 'react'
import * as Ad from '../../components/Ad'
import Search from '../../components/SearchBar/Search'
import { WhiteSpace } from 'antd-mobile';
import CompanyList from './CompanyList'
import RegisterWrap from '../../components/RegisterWrap'
import Down from '@static/angleDownGray@3x.png'
import style from './style.less'

export default class CompanyArea extends Component {
  state={
    show:true,
    individuation:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1544442642838&di=c8f9fe705e692237102ddfc3c5fcb07b&imgtype=0&src=http%3A%2F%2Fh.hiphotos.baidu.com%2Fzhidao%2Fwh%253D450%252C600%2Fsign%3D4916d4fafe1f4134e0620d7a102fb9fc%2F96dda144ad3459825dbfac8b0ff431adcbef84f6.jpg',
    showAd: false,
  }

  /* 下载或者打开app */
  downLoadAd = () => {
    window.zhuge.track('下载App')
    window.location.href = 'https://m.veryeast.cn/mobile/index.html?c=mobile' //"BaiduDsp://activity.veryeast.cn/baidu/mobile/index"
  }

  // 关闭底部引导注册弹框
  handleCloseReg() {
    this.setState({
      showAd: false,
    })
    window.removeEventListener('scroll', this.onScroll, false)
  }

  /* 记录滚动条的位置 */
  onScroll = e => {
    // let top = document.body.scrollTop || document.documentElement.scrollTop
    // this.scrollTop = top
    let scroll = window.scrollY
    if (scroll > 360) {
      this.setState({
        showAd: true,
      })
    } else {
      this.setState({
        showAd: false,
      })
    }
  }

  componentDidMount(){
    window.addEventListener('scroll', this.onScroll, false)
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.onScroll, false)
  }

  render() {
    const {show,individuation,showAd} =this.state
    return (
      <div className={style.CompanyArea}>
        <Ad.AdTop show={show} downLoadAd={this.downLoadAd} />
        <Search />
        <div className={style.selectInfo}>
          <div className={style.selCity}>
            <span>城市</span>
            <img src={Down} alt="down"/>
          </div>
          <span className={style.selRule}></span>
          <div className={style.selBrand}>
            <span>品牌</span>
            <img src={Down} alt="down"/>
          </div>
        </div>
        <WhiteSpace size="sm" />
        <div className={style.individuation}>
          <img src={individuation} alt=""/>
        </div>
        <WhiteSpace size="md" />
        <CompanyList />
        {showAd ? (
          <RegisterWrap
            onCloseReg={this.handleCloseReg.bind(this)}
            location={this.props.history.location.pathname}
          />
        ) : null}
      </div>
    )
  }
}
