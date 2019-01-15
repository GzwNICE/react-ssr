import React, { PureComponent } from 'react'
import { DatePicker } from 'antd-mobile'
import style from '../style.less'
import moment from 'moment'
import { connect } from 'react-redux'

const defaultDate = new Date()
const maxDate = new Date(defaultDate - 16 * 365 * 24 * 60 * 60 * 1000)
const minDate = new Date(defaultDate - 80 * 365 * 24 * 60 * 60 * 1000)

let timeChange = false
const CustomChildren = ({ extra, onClick, children }) => {
  extra = timeChange ? extra : '请选择'
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
      value: new Date(defaultDate - 22 * 365 * 24 * 60 * 60 * 1000),
    }
  }
  componentDidMount() {}
  onChange = value => {
    this.setState({
      value,
    })
    const onChange = this.props.onChange

    if (onChange) {
      onChange(value)
    }
    timeChange = true
  }

  render() {
    const { value } = this.state

    return (
      <DatePicker
        mode="month"
        title="出生日期"
        extra="请选择"
        format={s => moment(s).format('YYYY.MM')}
        minDate={minDate}
        maxDate={maxDate}
        value={value}
        onChange={this.onChange}
      >
        <CustomChildren>出生日期</CustomChildren>
      </DatePicker>
    )
  }
}

export default JobTime
