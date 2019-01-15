import React, { PureComponent } from 'react'
import { List, Picker, DatePicker } from 'antd-mobile'
import style from '../style.less'
import moment from 'moment'
import { connect } from 'react-redux'
import initDate from '../../../helper/datePlugin'

const maxDate = new Date()
const minDate = new Date(maxDate - 99 * 365 * 24 * 60 * 60 * 1000)
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
      sValue: [],
      endTime: '', // 开始时间毫秒

    }
  }
  componentDidMount() {
    const initData = initDate('MMMM-YY', '', YING_JIE_SHENG)
    // console.log(initData)
    this.setState({
      endTimedata: initData.data,
    })
  }
  joinWorkTimeChange = (date) => {
    const startTime = moment(date).format('YYYY-M').split('-')
    const initData = initDate('MMMM-YY', '', YING_JIE_SHENG, startTime)
    this.setState({ 
      date,
      endTimedata: initData.data,
      sValue: [],
      endTime: '',
    }, () => {
      this.onChange()
    })
  }
  endTimeChange = (date) => {
   
    let endTime
    if (date[0] === YING_JIE_SHENG) {
      endTime = (new Date()).valueOf()
    } else {
      let endTimeArr = date.map((item) => {
        let str = item.substr(0, item.length -1)
        return str
      })
      endTime = moment(endTimeArr).valueOf()
    }
    this.setState({ 
      sValue: date,
      endTime,
    }, () => {
      this.onChange()
    })
  }
  onChange = () => {
    let workTime = []
    workTime[0] = this.state.date ? (this.state.date).valueOf() : ''
    workTime[1] = this.state.endTime
    this.props.onChange(workTime)
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
    const { endTimedata, sValue } = this.state

    return (
      <div className={style.jobtime}>
        <div>
          <DatePicker
            mode="month"
            title="参加工作时间"
            extra="请选择"
            value={this.state.date}
            onChange={this.joinWorkTimeChange}
            format={s => moment(s).format('YYYY.MM')}
            minDate={minDate}
            maxDate={maxDate}
          >
            <List.Item>参加工作时间</List.Item>
          </DatePicker>
        </div>
        <div>
          <Picker
            data={endTimedata}
            title="结束时间"
            extra="请选择"
            value={sValue}
            cols={2}
            format={this.handleFormat}
            onOk={this.endTimeChange}
          >
            <List.Item>至</List.Item>
          </Picker>
        </div>
      </div>
    )
  }
}

export default JobTime
