import React, { PureComponent, Component } from 'react'
import Base from './base'
import { withRouter } from 'react-router-dom'
@withRouter
class GoBackModal2 extends (PureComponent || Component) {
  handleExit = () => {
    this.props.history.replace(
        '/resume?redirect=' + this.props.history.location.pathname
    )
  }
  render() {
    return <Base handleExit={this.handleExit} fatherProps={this.props} />
  }
}

export default GoBackModal2
