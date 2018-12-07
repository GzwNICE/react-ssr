import React, { Component } from 'react'
import * as Ad from '../../components/Ad'
import Search from '../../components/SearchBar/Search'
import style from './style.less'

export default class CompanyArea extends Component {
  state={
    show:true,
  }

  /* 下载或者打开app */
  downLoadAd = () => {
    window.zhuge.track('下载App')
    window.location.href = 'https://m.veryeast.cn/mobile/index.html?c=mobile' //"BaiduDsp://activity.veryeast.cn/baidu/mobile/index"
  }

  render() {
    const {show} =this.state
    return (
      <div className={style.CompanyArea}>
        <Ad.AdTop show={show} downLoadAd={this.downLoadAd} />
        <Search />
        
      </div>
    )
  }
}
