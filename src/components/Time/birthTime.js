import React, { PureComponent } from 'react'
import { DatePicker } from 'antd-mobile'
import style from './style.less'
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
  componentDidMount() {
    timeChange = false
    const { value } = this.props
    this.initVal(value)
  }
  componentWillReceiveProps(next) {
    const { value } = next
    this.initVal(value)
  }
  initVal = (value) => {
    if (
      value !== undefined &&
      value &&
      typeof value === 'string' &&
      value.indexOf('-') !== -1
    ) {
      let dt = new Date(value.replace(/-/, '/'))
      timeChange = true
      this.setState({
        value: dt,
      })
      const onChange = this.props.onChange

      if (onChange) {
        onChange(dt)
      }
    }
  }
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
    const { title } = this.props
    return (
      <DatePicker
        mode="month"
        title={title}
        extra="请选择"
        format={s => moment(s).format('YYYY.MM')}
        minDate={minDate}
        maxDate={maxDate}
        value={value}
        onChange={this.onChange}
      >
        <CustomChildren>{title}</CustomChildren>
      </DatePicker>
    )
  }
}

export default JobTime
