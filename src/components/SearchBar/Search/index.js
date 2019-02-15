import React, { Component } from 'react'
import { SearchBar } from 'antd-mobile'
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'
import personal from '../../../static/personal.png'
import back from '../../../static/back.png'
import Userdefault from '../../../static/portrait@3x.png'
import style from './style.less'
import F from '../../../helper/tool'
@connect(state => ({}))
class Search extends Component {
  constructor(props) {
    super(props)
    this.state = {
      is_login: '',
      photo: '',
    }
  }

  goRegister = () => {
    const triggerFrom = '触发来源'
    window.zhuge.track('注册页面打开', { [`${triggerFrom}`]: '名企列表页个人中心icon' })
  }

  componentDidMount() {
    this.setState({
      is_login: F.getUserInfo().is_login,
      photo: F.getUserInfo().photo,
    })
  }

  render() {
    const { is_login, photo } = this.state
    return (
      <div className={style.Search}>
        <div className={style.goBack} onClick={this.props.goBack}>
          <img src={back} alt="bank" />
        </div>
        {/*<SearchBar
          placeholder="搜索职位/品牌"
          value={this.props.searchValue}
          showCancelButton={this.props.visable}
          onSubmit={this.props.Search}
          onCancel={this.props.Cancel}
          onChange={this.props.Change}
          onClear={this.props.Clear}
        />*/}
        <div className={style.blocTitle}>{this.props.title}</div>
        <Link
          rel="stylesheet"
          to={
            is_login
              ? `/user?redirect=${this.props.location.pathname}`
              : `/user/register?redirect=${this.props.location.pathname}`
          }
          onClick={this.goRegister}
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

export default withRouter(Search)
