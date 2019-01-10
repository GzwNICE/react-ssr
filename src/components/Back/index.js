import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import Rectangle from '../../static/back.png'
import style from './style.less'

@withRouter
@connect(state => ({}))
class NavBack extends PureComponent {
  render() {
    const { title } = this.props
    return (
      <div className={style.back}>
        <img
          src={Rectangle}
          alt="返回"
          onClick={() => {
            this.props.history.push(`/tabs/user`)
          }}
        />
        <span>{title}</span>
      </div>
    )
  }
}

export default NavBack
