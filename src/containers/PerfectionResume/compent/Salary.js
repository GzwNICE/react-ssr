import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import style from './style.less'
import CombindShareIcon from '../../../static/CombinedShape@3x.png'
import angleDownGray from '../../../static/Rectangle@3x.png'
import Slider from 'rc-slider'
import 'rc-slider/assets/index.css'
import Tooltip from 'rc-tooltip'
import { Modal, List } from 'antd-mobile'
const Range = Slider.Range
const Handle = Slider.Handle

@connect(state => {
  return {}
})
class Salary extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      defaultRange: [0, 20],
      rangeString: '不限', // 月薪范围
      range: [0, 20],
      visible: false,
      extra: '请选择',
    }
  }

  componentDidMount() {
    this.setState({
      defaultRange: this.state.range,
    })
    console.log(this.props)
  }
  valNum = value => {
    let newVal = 0
    if (value > 0 && value < 10) {
      newVal = `${value}千`
    } else if (value === 10) {
      newVal = value / 10 + '万'
    } else if (value === 11) {
      newVal = '1.5万'
    } else if (value > 11 && value < 20) {
      newVal = `${value % 10}万`
    } else if (value === 20) {
      newVal = '10万'
    }
    return newVal
  }
  handle = props => {
    const { value, dragging, index, ...restProps } = props
    let newVal = this.valNum(value)
    return (
      <Tooltip
        prefixCls="rc-slider-tooltip"
        overlay={value}
        visible={false}
        placement="top"
        key={index}
      >
        <Handle value={value} {...restProps}>
          <div className={style.mark}>
            <div className={style.num}>{newVal}</div>
            <div className={style.line} />
            <img src={CombindShareIcon} className={style.icon} />
          </div>
        </Handle>
      </Tooltip>
    )
  }
  handleChange = e => {
    let rangeString = ''
    if (e[0] === 0 && e[1] === 20) {
      rangeString = '不限'
    } else if (e[0] === 0 && e[1] !== 20) {
      rangeString = `${this.valNum(e[1])}以下`
    } else if (e[0] !== 0 && e[1] === 20) {
      rangeString = `${this.valNum(e[0])}以上`
    } else {
      rangeString = `${this.valNum(e[0])}-${this.valNum(e[1])}`
    }
    this.setState({
      rangeString,
      range: e,
    })
  }
  handleClick = () => {
    this.setState({
      visible: true,
    })
  }
  handleClose = () => {
    this.setState({
      visible: false,
    })
  }
  handleOK = () => {
    const range = this.state.range
    this.setState({
      visible: false,
      extra: this.state.rangeString,
      defaultRange: range,
    })
    const onChange = this.props.onChange
    let salay = []
    salay[0] = this.handleSalay(range[0])
    salay[1] = this.handleSalay(range[1])

    if (onChange) {
      onChange(salay)
    }
  }
  // 薪资形式[1000, 3000]
  handleSalay = value => {
    let newVal = 0
    if (value <= 10) {
      newVal = value * 1000
    } else if (value === 11) {
      newVal = 15000
    } else if (value > 11 && value < 20) {
      newVal = (value % 10) * 10000
    } else if (value === 20) {
      newVal = 10 * 10000
    }
    return newVal
  }
  render() {
    const { defaultRange, rangeString, visible, extra } = this.state

    return (
      <div>
        <List.Item arrow="horizontal" extra={extra} onClick={this.handleClick}>
          期望月薪
        </List.Item>
        <Modal
          visible={visible}
          transparent
          maskClosable={false}
          className={style.modal}
        >
          <div>
            <header className={style.header}>
              <span onClick={this.handleClose}>取消</span>
              <span onClick={this.handleOK}>确定</span>
            </header>
            <div className={style.title}>
              月薪范围<span>({rangeString})</span>
            </div>

            <div className={style.slider}>
              <Range
                min={0}
                max={20}
                handle={this.handle}
                onChange={this.handleChange}
                defaultValue={defaultRange}
              />
            </div>
          </div>
        </Modal>
      </div>
    )
  }
}

export default Salary
