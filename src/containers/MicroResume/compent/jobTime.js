import React, { PureComponent } from 'react'
import { Picker, DatePicker } from 'antd-mobile'
import style from '../style.less'
import moment from 'moment'
import { connect } from 'react-redux'
import initDate from '../../../helper/datePlugin'

const maxDate = new Date()
const minYear = moment().weekYear() - 80
const minDate = moment().year(minYear)._d

const YING_JIE_SHENG = '至今'

let timeChange = {
  start: false,
  end: false,
}
const CustomChildren1 = ({ extra, onClick, children }) => {
  extra = timeChange.start ? extra : '请选择'
  return (
    <div
      onClick={onClick}
      className = {style.joinTimeTadding}
    >
      {children}
      <span style={{ float: 'right', color: '#9B9B9B', fontSize: '15px' }}>{extra}</span>
    </div>
  )
}
const CustomChildren2 = ({ extra, onClick, children }) => {
  extra = timeChange.end ? extra : '请选择'
  return (
    <div
      onClick={onClick}
      className = {style.timeContent}
    >
      {children}
      <span style={{ float: 'right', color: '#9B9B9B', fontSize: '15px' }}>{extra}</span>
    </div>
  )
}
@connect(state => {
  return {}
})
class JobTime extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      date: new Date(maxDate.getFullYear() - 1, maxDate.getMonth()),
      endTimedata: [],
      sValue: [YING_JIE_SHENG],
      endTime: '', // 开始时间毫秒
    }
  }
  componentDidMount() {
    const initData = initDate('MMMM-YY', '', YING_JIE_SHENG)
    // console.log(initData)
    this.setState({
      endTimedata: initData.data,
    })
    timeChange = {
      start: false,
      end: false,
    }
  }
  joinWorkTimeChange = date => {
    // const startTime = moment(date)
    //   .format('YYYY-M')
    //   .split('-')
    // const initData = initDate('MMMM-YY', '', YING_JIE_SHENG, startTime)
    this.setState(
      {
        date,
      },
      () => {
        this.onChange()
      }
    )
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
    timeChange.end = true
  }
  onChange = () => {
    let workTime = []
    workTime[0] = this.state.date ? this.state.date.valueOf() : ''
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
            title="最近工作时间"
            extra="请选择"
            value={this.state.date}
            onChange={this.joinWorkTimeChange}
            format={s => moment(s).format('YYYY.MM')}
            minDate={minDate}
            maxDate={maxDate}
            onOk={() => {
              timeChange.start = true
            }}
          >
            <CustomChildren1>最近工作时间</CustomChildren1>
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
            <CustomChildren2>至</CustomChildren2>
          </Picker>
        </div>
      </div>
    )
  }
}

export default JobTime
