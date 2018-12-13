import React, { Component } from 'react'
import { SearchBar } from 'antd-mobile'
import { Link } from 'react-router-dom'
import personal from '../../../static/headimg@3x.png'
import back from '../../../static/back.png'
import style  from './style.less'

export default class Search extends Component {
  render() {
    return (
      <div className={style.Search}>
        <div className={style.goBack}>
          <img src={back} alt="bank"/>
        </div>
        <SearchBar placeholder="搜索职位/品牌" />
        <Link rel="stylesheet" to={`/tabs/user?redirect=`}>
          <img src={personal} alt="img"  className={style.personal} />
        </Link>
      </div>
    )
  }
}
