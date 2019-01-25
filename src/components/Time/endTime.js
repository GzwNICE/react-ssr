import React, { PureComponent } from 'react'
import { Picker } from 'antd-mobile'
import style from './style.less'
import moment from 'moment'
import { connect } from 'react-redux'
import initDate from '../../helper/datePlugin'

const YING_JIE_SHENG = '至今'

@connect(state => {
  return {}
})
class JobTime extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      date: '',
      endTimedata: [],
      sValue: [YING_JIE_SHENG],
      endTime: '', // 开始时间毫秒
      timeChange: false,
    }
  }
  componentDidMount() {
    const initData = initDate('MMMM-YY', '', YING_JIE_SHENG)
    this.setState({
      timeChange: false,
    })
    this.setState({
      endTimedata: initData.data,
    })
    const { value } = this.props
    this.initVal(value)
  }
  componentWillReceiveProps(next) {
    const { value } = next
    // console.log(value)
    this.initVal(value)
  }
  initVal = (value) => {
    let sValue = []
    if (
      value !== undefined &&
      value &&
      typeof value === 'string' &&
      value.indexOf('-') !== -1
    ) {
      let arr = value.split('-')
      let dt = moment().year(arr[0]).month(arr[1] - 1)._d
      sValue[0] = moment(dt).format('YYYY') + '年'
      sValue[1] = moment(dt).format('M') + '月'
      this.setState({
        timeChange: true,
      })
      const onChange = this.props.onChange
      if (onChange) {
        onChange(dt)
      }
      this.setState({
        sValue,
      })
    } else if (value === '0' || value === 0) {
      sValue = [YING_JIE_SHENG]
      this.setState({
        timeChange: true,
      })
      this.setState({
        sValue,
      })
    }
  }
  endTimeChange = date => {
    let endTime
    if (date[0] === YING_JIE_SHENG) {
      endTime = 0
    } else {
      let endTimeArr = date.map(item => {
        let str = item.substr(0, item.length - 1)
        return str
      })
      endTimeArr[1] = Number(endTimeArr[1]) - 1
      endTime = moment(endTimeArr).valueOf()
    }
    this.setState(
      {
        sValue: date,
        endTime,
      },
      () => {
        this.onChange()
      }
    )
    this.setState({
      timeChange: true,
    })
  }
  onChange = () => {
    let time = this.state.endTime.valueOf()
    this.props.onChange(time)
  }
  handleFormat = val => {
    val = val.map(item => {
      if (item === YING_JIE_SHENG) {
        return item
      } else {
        let str = item.substr(0, item.length - 1)
        str = str.length === 1 ? `0${str}` : str
        return str
      }
    })
    val = val.join('.')
    return val
  }
  render() {
    const { endTimedata, sValue, timeChange } = this.state
    const { title } = this.props

    const CustomChildren = ({ extra, onClick, children }) => {
      extra = timeChange ? extra : '请选择'
      return (
        <div
          onClick={onClick}
          className={style.content}  
        >
          {children}
          <div className={style.rightIcon} aria-hidden="true" />
          <span style={{ float: 'right', color: '#888' }}>{extra}</span>
        </div>
      )
    }

    return (
      <div>
        <Picker
          data={endTimedata}
          title={title}
          extra="请选择"
          value={sValue}
          cols={2}
          format={this.handleFormat}
          onOk={this.endTimeChange}
        >
          <CustomChildren>{title}</CustomChildren>
        </Picker>
      </div>
    )
  }
}

export default JobTime
