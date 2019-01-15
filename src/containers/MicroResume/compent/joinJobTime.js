import React, { PureComponent } from 'react'
import { List, Picker, DatePicker } from 'antd-mobile'
import style from '../style.less'
import moment from 'moment'
import { connect } from 'react-redux'
import initDate from '../../../helper/datePlugin'

const maxDate = new Date()
const minDate = new Date(maxDate - 80 * 365 * 24 * 60 * 60 * 1000)
const YING_JIE_SHENG = '应届生'

let timeChange = {
  work_date: false,
}
const CustomChildren = ({ extra, onClick, children }) => {
  extra = timeChange.work_date ? extra : '请选择'
  return (
    <div
      onClick={onClick}
      style={{
        backgroundColor: '#fff',
        height: '50px',
        lineHeight: '50px',
        padding: '0 20px',
        color: '#4A4A4A',
      }}
    >
      {children}
      <div className={style.rightIcon} aria-hidden="true" />
      <span style={{ float: 'right', color: '#888' }}>{extra}</span>
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
      date: '',
      endTimedata: [],
      sValue: [],
      endTime: '', // 开始时间毫秒

    }
  }
  componentDidMount() {
    const initData = initDate('MMMM-YY', '', YING_JIE_SHENG)
    let sValue = []
    sValue[0] = `${moment().year() - 1 }年`
    sValue[1] = `${moment().month() + 1}月`
    this.setState({
      endTimedata: initData.data,
      sValue,
    })
  }

  endTimeChange = (date) => {
    let endTime
    if (date[0] === YING_JIE_SHENG) {
      endTime = 0
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
    timeChange.work_date = true
  }
  onChange = () => {
    let time =  this.state.endTime.valueOf()
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
    const { endTimedata, sValue } = this.state

    return (
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
    <CustomChildren>参加工作时间</CustomChildren>
    </Picker>
      </div>
    )
  }
}

export default JobTime
