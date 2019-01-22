import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { Picker } from 'antd-mobile'
import style from './style.less'

@connect(state => {
  return {
    options: state.option.opts_education,
  }
})
class Education extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      timeChange: false,
      sValue: [5],
      data: [],
    }
  }
  componentDidMount() {
    const { options = [] } = this.props
    let arr = []
    options.map(item => {
      let obj = {
        value: item.code,
        label: item.value,
      }
      arr.push(obj)
    })
    arr = arr.filter(item => {
      return item.value < 9
    })
    this.setState({
      data: arr,
    })
  }
  endTimeChange = value => {
    this.setState(
      {
        sValue: value,
      },
      () => {
        this.props.onChange(String(value[0]))
      }
    )
    this.setState({
      timeChange: true,
    })
  }

  render() {
    const { title } = this.props
    const { sValue, timeChange, data } = this.state

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
      <div>
        <Picker
          data={data}
          title={title}
          extra="请选择"
          value={sValue}
          cols={1}
          onOk={this.endTimeChange}
        >
          <CustomChildren>{title}</CustomChildren>
        </Picker>
      </div>
    )
  }
}

export default Education
