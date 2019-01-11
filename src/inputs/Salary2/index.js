import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import style from './style.less'
import CombindShareIcon from '../../static/CombinedShape@3x.png'
import angleDownGray from '../../static/Rectangle@3x.png'
import Slider from 'rc-slider'
import 'rc-slider/assets/index.css'
import Tooltip from 'rc-tooltip'

const Range = Slider.Range
const Handle = Slider.Handle

@connect(state => {
  // console.log(state.option.opts_salary.salary_scope_index)
  return {
    options: state.option.opts_salary.salary_scope_index,
    salaryShow: state.search.salaryShow,
    defaultRange: state.search.defaultRange,
  }
})
class Salary extends PureComponent {
  constructor(props) {
    super(props)
    // const value = props.value || {}
    // console.log(value)
    this.state = {
      salary_scope_index: [], // 默认收起
      range: [0, 20], // 月薪范围
      rangeString: '不限', // 月薪范围
      rangeTitle: '薪资', // 顶部文字显示
      defaultValue: [0, 20],
    }
  }

  componentDidMount() {
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
    // console.log(this.props)
    // console.log(restProps)
    // this.props.value = {
    //   aa: 11,
    // }
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
    // this.setState({ lowerBound: +e.target.value });
  }
  handleSave = () => {
    const e = this.state.range
    let rangeTitle = ''
    if (e[0] === 0 && e[1] === 20) {
      rangeTitle = '薪资'
    } else if (e[0] === 0 && e[1] !== 20) {
      rangeTitle = `${this.valNum(e[1])}以下`
    } else if (e[0] !== 0 && e[1] === 20) {
      rangeTitle = `${this.valNum(e[0])}以上`
    } else {
      rangeTitle = `${this.valNum(e[0])}-${this.valNum(e[1])}`
    }
    this.setState({
      rangeTitle,
    })

    const onChange = this.props.onChange
    let salay = []
    salay[0] = this.handleSalay(e[0])
    salay[1] = this.handleSalay(e[1])

    if (onChange) {
      onChange(salay)
    }
    console.log(this.state.rangeString)
    this.props.dispatch({
      type: 'SEARCH_SALARYSTRING',
      payload: this.state.rangeString,
    })
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

  headerClick = () => {
    this.props.dispatch({
      type: 'SEARCH_SALARYSHOW',
      payload: !this.props.salaryShow,
    })
  }
  // todo defaultValue 这个要重写下
  contentRender = () => {
    const { rangeString } = this.state
    const { defaultRange } = this.state
    console.log(defaultRange)
    return (
      <div>
        <div className={style.content}>
          <div className={style.title}>
            月薪范围<span>({rangeString})</span>
          </div>

          <div className={style.slider}>
            <Range
              min={0}
              max={20}
              handle={this.handle}
              onChange={this.handleChange}
              // defaultValue={defaultRange}
            />
          </div>
        </div>
        <div className={style.btn} onClick={this.handleSave}>
          保存
        </div>
      </div>
    )
  }
  render() {
    const { rangeTitle } = this.state
    const { salaryShow } = this.props
    return (
      <div className={style.wraper}>
        <div onClick={this.headerClick}>
          <span>{rangeTitle}</span>
          <div className={style.jiantou}>
            <img src={angleDownGray} alt="" />
          </div>
        </div>
        
        {salaryShow ? this.contentRender() : null}
      </div>
    )
  }
}

export default Salary
