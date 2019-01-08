import React, { Component } from 'react'
import {
  NavBar,
  Toast,
  Accordion,
  List,
  Icon,
  InputItem,
  Modal,
} from 'antd-mobile'
import style from './style.less'
import { connect } from 'react-redux'
import checkeIcon from '../../static/checked@3x.png'

@connect(state => {
  return {
    options: state.option,
  }
})
class County extends Component {
  constructor(props) {
    super(props)
    this.state = {
      visible: false,
      country: '0086',
      name: '中国大陆',
    }
  }
  goback = () => {
    this.setState({
      visible: false,
    })
  }
  handleClick = item => {
    this.setState({
      name: item.name,
      country: item.country,
      visible: false,
    })
    this.props.setSet(item)
  }
  handleShow = () => {
    this.setState({
      visible: true,
    })
  }
  render() {
    const { opt_phone_rules = [] } = this.props.options
    const { visible, country } = this.state
    return (
      <div>
        <span onClick={this.handleShow} className={style.label}>
          {country} <Icon type="down" />
        </span>
        <Modal visible={visible}>
          <NavBar
            mode="light"
            className={style.nav}
            icon={<Icon type="left" />}
            onLeftClick={() => this.goback()}
          />
          <div className={style.title}>请选择国家或地区</div>
          <ul className={style.content}>
            {opt_phone_rules.map((item, index) => {
              return (
                <li key={index} onClick={this.handleClick.bind(this, item)}>
                  <div>{item.name}</div>
                  <div>{item.country}</div>
                  <div>
                    {country === item.country ? <img src={checkeIcon} /> : null}
                  </div>
                </li>
              )
            })}
          </ul>
        </Modal>
      </div>
    )
  }
}

export default County
