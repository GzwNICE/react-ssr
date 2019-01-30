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
    // console.log(this.props)
  }
  handleContinue = () => {
    const obj = {
      goBackModalVisible: false,
    }
    this.props.fatherProps.setSet(obj)
  }
  render() {
    const { goBackModalVisible } = this.props.fatherProps
    return (
      <Modal
        visible={goBackModalVisible}
        transparent
        className={style.modal}
      >
        <div className={style.modalBody}>
          <p>内容尚未保存</p>
          <p>你确定要退出吗?</p>
          <div>
            <div className={style.close} onClick={this.props.handleExit}>退出</div>
            <div className={style.ok} onClick={this.handleContinue}>继续填写</div>
          </div>
        </div>
      </Modal>
    )
  }
}

export default GoBackModal
