import React, { PureComponent } from 'react'
import { DatePicker } from 'antd-mobile'
import style from '../style.less'
import moment from 'moment'
import { connect } from 'react-redux'

const defaultDate = new Date()

const nowYear = moment().weekYear()
const maxDate = moment().year(nowYear + 7).month(11)._d
const minDate = moment().year(nowYear - 80).month(0)._d

@connect(state => {
  return {}
})
class JobTime extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      value: new Date(defaultDate.getFullYear(), 5),
      timeChange: false,
    }
  }
  componentDidMount() {
    this.setState({
      timeChange: false,
    })
    const { value } = this.props
    this.initVal(value)
  }
  componentWillReceiveProps(next) {
    const { value } = next
    this.initVal(value)
  }
  initVal = value => {
    if (
      value !== undefined &&
      value &&
      typeof value === 'string' &&
      value.indexOf('-') !== -1
    ) {
      let arr = value.split('-')
      let dt = moment()
        .year(arr[0])
        .month(arr[1] - 1)._d
      this.setState({
        timeChange: true,
      })
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
    this.setState({
      timeChange: true,
    })
  }

  render() {
    const { value, timeChange } = this.state
    const { title } = this.props
    const CustomChildren = ({ extra, onClick, children }) => {
      extra = timeChange ? extra : '请选择'
      return (
        <div onClick={onClick} className={style.timeContent}>
          {children}
          <div className={style.rightIcon} aria-hidden="true" />
          <span className={style.extra}>{extra}</span>
        </div>
      )
    }
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
