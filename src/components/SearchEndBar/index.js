/**
 * Created by huangchao on 2017/10/25.
 */
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import style from './style.less'
import angleDown from '../../static/back.png'
import search from '../../static/serach2@3x.png'
import { Link } from 'react-router-dom'
import Userdefault from '../../static/portrait@3x.png'
import personal from '../../static/personal.png'

class SearchEndBar extends PureComponent {
  static propTypes = {
    keyword: PropTypes.string,
    goBack: PropTypes.func,
  }

  state = {
    is_login: '',
    photo: '',
  }
  componentDidMount() {
    let is_login = localStorage.getItem('is_login')
      ? localStorage.getItem('is_login')
      : ''
    let photo = localStorage.getItem('photo')
      ? localStorage.getItem('photo')
      : ''
    this.setState({
      is_login,
      photo,
    })
  }

  render() {
    const {
      goBack = function() {},
      goSerch = function() {},
      keyword,
      // number,
      location,
    } = this.props
    const { is_login, photo } = this.state

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
            <img src={search} alt="放大镜" />
            <div className={style.keyWord}>{keyword}</div>
          </div>
        </div>
        <Link
          rel="stylesheet"
          to={
            is_login
              ? `/user?redirect=${location.pathname}`
              : `/user/register?redirect=${location.pathname}`
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
}

export default SearchEndBar
