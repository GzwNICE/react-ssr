import React, { PureComponent } from 'react'
import { DatePicker } from 'antd-mobile'
import style from '../style.less'
import moment from 'moment'
import { connect } from 'react-redux'

const nowYear = moment().weekYear()
const maxDate = moment()
  .year(nowYear - 16)
  .month(11)._d
const minDate = moment()
  .year(nowYear - 80)
  .month(0)._d

@connect(state => {
  return {}
})
class JobTime extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      value: moment().year(nowYear - 22)._d,
      timeChange: false,
    }
  }
  componentDidMount() {
    this.setState({
      timeChange: false,
    })
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
    const { title = '' } = this.props
    const CustomChildren = ({ extra, onClick, children }) => {
      extra = timeChange ? extra : '请选择'
      return (
        <div onClick={onClick} className={style.timeContent}>
          {children}
          <div className={style.rightIcon} aria-hidden="true" />
          <span style={{ float: 'right', color: '#888' }}>{extra}</span>
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
