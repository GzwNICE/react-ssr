import React, { PureComponent, Component } from 'react'
import Base from './base'
import { withRouter } from 'react-router-dom'
@withRouter
class GoBackModal1 extends (PureComponent || Component) {
  handleExit = () => {
    let search = this.props.history.location.search
    let path = ''
    if (search.indexOf('?redirect=') !== -1) {
      path = search.split('?redirect=')[1]
    }
    this.props.history.push(path)
  }
  render() {
    return <Base handleExit={this.handleExit} fatherProps={this.props} />
  }
}

export default GoBackModal1
