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
import F from '../../helper/tool'
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
    this.setState({
      is_login: F.getUserInfo().is_login,
      photo: F.getUserInfo().photo,
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
    // ${this.props.history.location.search}`
    // console.log(location.search)
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
            {keyword ? <div className={style.keyWord}>{keyword}</div>:<div className={style.keyWord2}>搜索职位/公司</div>}
          </div>
        </div>
        <Link
          rel="stylesheet"
          to={
            is_login
              ? `/user?redirect=${location.pathname}${location.search}`
              : `/user/register?redirect=${location.pathname}${location.search}`
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
