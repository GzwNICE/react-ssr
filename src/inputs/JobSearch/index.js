import React from 'react'
import ComplexFormField from '../../components/Complex/ComplexFormField'
import { NavBar, Toast, Accordion, List, Icon } from 'antd-mobile'
import style from './style.less'

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
    // console.log(this.props.onChange)
    // console.log(this.changeVisible)
    if (this.props.onChange) {
      this.props.onChange(this.serialize(this.getValue()))
      this.changeVisible(false, true)
    } else {
      this.changeVisible()
    }
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
          {this.props.title || this.props.children.props.children}
        </NavBar>
       111
      </div>
    )
  }
}

export default ComplexSelView