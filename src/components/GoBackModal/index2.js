import React, { PureComponent, Component } from 'react'
import Base from './base'
import { withRouter } from 'react-router-dom'
@withRouter
class GoBackModal2 extends (PureComponent || Component) {
  handleExit = () => {
    let search = this.props.history.location.search
    let path = '/resume/micro'
    if (search.indexOf('?redirect=') !== -1) {
      path = search.split('?redirect=')[1]
      path = `/resume/micro${path}`
    }
    this.props.history.push(path)
  }
  render() {
    return <Base handleExit={this.handleExit} fatherProps={this.props} />
  }
}

export default GoBackModal2
