/**
 * Created by huangchao on 2017/11/4.
 */
import React, { PureComponent, Component } from 'react'
import style from './style.less'
import { Modal } from 'antd-mobile'
import { withRouter } from 'react-router-dom'

@withRouter
class GoBackModal extends (PureComponent || Component) {
  componentDidMount() {
  }
  handleContinue = () => {
    const obj = {
      goBackModalVisible: false,
    }
    this.props.setSet(obj)
  }
  handleExit = () => {
    let search = this.props.history.location.search
    let path = ''
    if (search.indexOf('?redirect=') !== -1) {
      path = search.split('?redirect=')[1]
    }
    this.props.history.push(path)
  }
  render() {
    const { goBackModalVisible } = this.props
    return (
      <Modal
        visible={goBackModalVisible}
        transparent
        className={style.modal}
        title="内容尚未保存"
      >
        <div className={style.modalBody}>
          <p>你确定要退出吗?</p>
          <div>
            <div onClick={this.handleExit}>退出</div>
            <div onClick={this.handleContinue}>继续填写</div>
          </div>
        </div>
      </Modal>
    )
  }
}

export default GoBackModal
