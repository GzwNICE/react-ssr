import React from 'react'
import ComplexFormField from '../Complex/ComplexFormField'
import { NavBar, Icon } from 'antd-mobile'
import style from './style.less'
import {Toast} from "antd-mobile/lib/index";

class ComplexSelView extends ComplexFormField {
  static defaultProps = {
    value: [],
    maxLength: 1,
    root: true,
  }
  constructor(props) {
    super(props)
    this.state = {
      value: [],
      maxLength: 1,
      root: true,
      optionsSubChil: [], // 右侧数据
      clickCode: '0100', // 右侧点击省份的code
      selectedHight: 60, // 顶部被选中城市框的高度
    }
    this.saveRef = ref => {this.refDom = ref}
  }
  componentDidMount() {
    const { options } = this.props
    // console.log(this.props)
    this.setState({
      optionsSubChil: options[0].sublist,
    })
  }
  format(value=[]) {
    if (this.props.optIndex) {
      return value.map((code) => this.props.optIndex[code]).join(',')
    } else {
      return null
    }
  }

  serialize(value) {
    let val = value instanceof Array ? [...value] : {...value}
    if (!val.hasOwnProperty('optIndex'))
      Object.defineProperty(val, 'optIndex', {
        get: () => this.props.optIndex,
      })
    return val
  }

  filter = (code) => {
    return this.getValue().indexOf(code) >= 0
  }
  selectValue = (code) => {
    code = String(code)
    if (this.props.maxLength > 1) {
      const { maxLength } = this.props
      let value = [...this.getValue()]
      let indexof = value.indexOf(code)
      let type = this.props.type
      if (indexof >= 0) { // 已经存在
        value.splice(indexof, 1)
      } else { // 新添加的
        if (maxLength <= 0 || value.length < maxLength) {
          value.push(code)
          value = value.filter(item => item !== 0)
          if(type === 'Industry' && code === 0) value = [0]
        } else {
          return Toast.info(`最多选择 ${maxLength} 个哦!`, 1)
        }
      }
      this.setState({ value }, () => {
        const {clientHeight} = this.refDom
        this.setState({
          selectedHight: clientHeight,
        })
      })
    } else {
      // if(this.state.value[0] === code) {
      //   this.setState({ value: [] })
      // } else {
      //
      // }
      this.setState({ value: [code] }, () => this.changeValue())
      // setTimeout(() => this.changeValue())
    }
  }

  changeValue = () => {
    if (this.props.onChange) {
      this.props.onChange(this.serialize(this.getValue()))
      this.changeVisible(false, true)
    } else {
      this.changeVisible()
    }
  }

  handleVisible = (visible) => {
    if (!visible && this.props.root) {
      this.setState({ value: this.props.value })
    }
  }
  componentWillReceiveProps(nextProps) {
    this.setState({ value: nextProps.value })
    // if (this.props.root && JSON.stringify(this.props.value) !== JSON.stringify(nextProps.value)) {
    //   this.setState({ value: nextProps.value })
    //   console.log(nextProps.value)
    // }
  }
  componentDidUpdate(){
    if (this.refDom) {
      const {clientHeight} = this.refDom
      this.setState({
        selectedHight: clientHeight,
      })
    }
  }

  getValue() {
    return this.props.root ? this.state.value : this.props.value
  }

  save = () => {
    const { value } = this.state
    if (value.length > 0) {
      this.props.onChange(value)
      this.changeVisible(false, true)
    } else {
      Toast.info('请输入内容', 2)
    }
  }

  handleChangeSubChil = (item) => {
    this.setState({
      clickCode: item.code,
    })
    if (item.sublist) {
      this.setState({
        optionsSubChil: item.sublist,
      })
    } else {
      this.setState({
        optionsSubChil: [],
      })
    }
  }


  optView() {
    // const selected = this.getValue() || []
    const { value } = this.state
    return (
      <div className={style.selected} ref={this.saveRef}>
        {
          value.length === 0 ? <div className={style.title}>{`最多可选 ${this.props.maxLength} 个`}</div> : null
        }
        <div className={style.num}>
          {value.length}<span>/{this.props.maxLength}</span>
        </div>
        {value.map(code => (
          <div key={code} className={style["select-content"]}>
            <slot>{this.props.optIndex ? this.props.optIndex[code] : null}</slot>
            <Icon onClick={() => (this.props.onSelect || this.selectValue)(code)} type="cross"/>
          </div>
        ))}
      </div>

    )
  }

  mainView() {
    const { options = [] } = this.props
    const { value, optionsSubChil, selectedHight, clickCode } = this.state

    let styleObj = {
      top: `${55 + selectedHight}px`,
    }
    return (
      <div className={style.root}>
        <NavBar
          mode="light"
          className={style.nav}
          icon={<Icon type="left" />}
          onLeftClick={() => this.changeVisible()}
          rightContent={<span onClick={() => this.save()}>保存</span>}>
          选择职位
        </NavBar>
        {this.optView()}
        <div className={style.wrap} style={styleObj}>
          <ul className={style.left}>
            {
              options.map((item, index) =>
                <li key={index} onClick={this.handleChangeSubChil.bind(this, item)}>
                  {item.value}
                  {
                    clickCode === item.code ? <i/> : null
                    // value.map((item2, index2) => {
                    //   let subCode = item2.slice(0, 2)
                    //   if (item.code.indexOf(subCode) !== -1) {
                    //     return <i key={index2}/>
                    //   }
                    // })
                  }
                </li>
              )
            }
          </ul>
          <ul className={style.right}>
            {
              optionsSubChil.map((item, index) =>{
                let isChecked = false
                value.map((item2, index2) => {
                  if (item.code === item2) {
                    isChecked = true
                  }
                })
                return <li
                  onClick={() => (this.props.onSelect || this.selectValue)(item.code)}
                  style={{color: isChecked ? "#FF4F00" : "#4A4A4A"}}
                  key={index}>
                  {item.value}
                </li>
              })
            }
          </ul>
        </div>
      </div>
    )
  }
}

export default ComplexSelView