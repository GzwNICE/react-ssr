import React from 'react'
import ComplexFormField from '../../components/Complex/ComplexFormField'
import { NavBar, Toast, Accordion, List, Icon, InputItem } from 'antd-mobile'
import style from './style.less'

const Item = List.Item
class ComplexSelView extends ComplexFormField {
  static defaultProps = {
    value: [],
    maxLength: 1,
    root: true,
  }

  constructor(props) {
    super(props)
    // console.log(this.props)
    this.state = {
      value: props.value,
    }
  }

  changeValue = () => {
    this.props.onChange('你好')
    this.changeVisible(false, true)
    // if (this.props.onChange) {
    //   this.props.onChange('你好')
    //   this.changeVisible(false, true)
    // } else {
    //   this.changeVisible()
    // }
  }

  mainView() {
    return (
      <div>
        <NavBar
          mode="light"
          className={style.nav}
          icon={<Icon type="left" />}
          onLeftClick={() => this.changeVisible()}
          rightContent={<span onClick={() => this.changeValue()}>保存</span>}>
          所在公司
        </NavBar>
        <InputItem
          // className={`${style.inputHei} ${style.name}`}
          clear
          placeholder="请输入公司全称"
        />
        <ul>
          <li>1111</li>
          <li>1111</li>
          <li>1111</li>
          <li>1111</li>
        </ul>
      </div>
    )
  }
}

export default ComplexSelView