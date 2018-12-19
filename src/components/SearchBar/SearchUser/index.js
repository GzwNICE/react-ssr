import React, { Component } from 'react'
import { SearchBar } from 'antd-mobile'
import { Link } from 'react-router-dom'
import * as Ad from '../../Ad'
import back from '../../../static/back.png'
import unHome from '../../../static/unHome@3x.png'
import personal from '../../../static/headimg@3x.png'
import style from '../style.less'


export default class SearchUser extends Component {
  constructor(props){
    super(props)
    this.state={
      show: true, 
      searchShow: true,  //顶部搜索框默认隐藏
    }
  }

  render() {
    const {show,searchShow} =this.state
    return (
      <div className={style.PositionHead}>
        <Ad.AdTop show={show} downLoadAd={this.downLoadAd} />
        <div className={style.searchbar}>
          <div className={style.goBack}>
            <img src={back} alt="bank" />
          </div>
          {searchShow ? <SearchBar placeholder="搜索职位/品牌" /> : null}
          <div className={style.navLink}>
            <Link rel="stylesheet" to={`/tabs/home`}>
              <img src={unHome} alt="img" className={style.searcHome} />
            </Link>
            <Link rel="stylesheet" to={`/tabs/user`}>
              <img src={personal} alt="img" className={style.personal} />
            </Link>
          </div>
        </div>
      </div>
    )
  }
}
