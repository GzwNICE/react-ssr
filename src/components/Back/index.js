import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import queryString from 'query-string'
import { withRouter } from 'react-router-dom'
import Rectangle from '@static/back.png'
import style from './style.less'

@withRouter
@connect(state => ({}))
class NavBack extends PureComponent {
  whereWillIGo = () => {
    // const { pathSearch } = queryString.parse(window.location.search)
    // if (pathSearch) {
    //   this.props.history.go(-1)
    // } else {
    //   this.props.history.length === 2 || this.props.history.length === 1
    //     ? this.props.history.push('/user')
    //     : this.props.history.go(-1)
    // }
    const { redirect } = queryString.parse(window.location.search)
    if (redirect) {
      this.props.history.replace(redirect)
    } else {
      this.props.history.replace('/user')
    }
  }
  render() {
    const { title } = this.props
    return (
      <div className={style.back}>
        <img
          src={Rectangle}
          alt="返回"
          onClick={this.whereWillIGo}
        />
        <span>{title}</span>
      </div>
    )
  }
}

export default NavBack
