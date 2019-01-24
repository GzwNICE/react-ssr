/**
 * Created by huangchao on 2017/10/25.
 */
import React from 'react'
import PropTypes from 'prop-types'
import style from './style.less'
import angleDown from '../../static/right2@3x.png'
import search from '../../static/serach2@3x.png'
import { Link } from 'react-router-dom'
import Userdefault from '../../static/portrait@3x.png'
import personal from '../../static/personal.png'

const SearchEndBar = props => {
  const {
    goBack = function() {},
    goSerch = function() {},
    keyword,
    // number,
    location,
  } = props
  const is_login = sessionStorage.getItem('is_login')
    ? sessionStorage.getItem('is_login')
    : ''
  const photo = sessionStorage.getItem('photo')
    ? sessionStorage.getItem('photo')
    : ''

  return (
    <div className={style.SearchEndBarWrap}>
      <div onClick={() => goBack()} className={style.left}>
        <img src={angleDown} alt="返回" />
      </div>
      <div
        onClick={() => goSerch()}
        className={`${style.right} ${style.leftConnent}`}
      >
        <div className={style.conleft}>
          <div className={style.img}>
            <img src={search} alt="放大镜" />
          </div>
          <div className={style.keyWord}>{keyword}</div>
        </div>
        <div className={style.conright}>
          {/*<div>*/}
          {/*{number}个职位*/}
          {/*</div>*/}
        </div>
      </div>
      <Link
        rel="stylesheet"
        to={
          is_login
            ? `/user?redirect=${location.pathname}`
            : `/register?redirect=${location.pathname}`
        }
        onClick={() => {
          const triggerFrom = '触发来源'
          window.zhuge.track('注册页面打开', {
            [`${triggerFrom}`]: '职位列表页个人中心icon',
          })
        }}
      >
        <img
          src={is_login ? (photo ? photo : Userdefault) : personal}
          alt="img"
          className={style.personal}
        />
      </Link>
    </div>
  )
}
SearchEndBar.propTypes = {
  keyword: PropTypes.string,
  goBack: PropTypes.func,
}
export default SearchEndBar
