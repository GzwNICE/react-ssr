import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import ComplexPicker from '../../components/ComplexPicker'
// import {getAllInfo} from "../../actions/resume";

@connect(state => {
  return {
    options: state.option.opts_salary ? state.option.opts_salary.salary_scope_index : [],
  }
})
class JobStatus extends PureComponent {
  state = {
    salary_scope_index: [], // 默认收起
  }
  componentDidMount() {
    const { options } = this.props
    let arr = []
    for (let index in options) {
      let item = {
        value: options[index],
        code: index,
      }
      arr.push(item)
    }
    arr = arr.slice(0, 11)
    this.setState({
      salary_scope_index: arr,
    })
  }
  format = item => {
    if (item[0] !== '50000以上') {
      item[0] = item[0] + '元'
    }
    if (item[0] && item[0].indexOf('undefined') !== -1) {
      item = ['请选择']
    }
    return item
  }
  render() {
    const { salary_scope_index } = this.state
    return (
      <ComplexPicker
        format={this.format}
        {...this.props}
        data={salary_scope_index
          // .filter(item => item.code !== 0)
          .map(item => ({
            label: item.value,
            value: `${item.code}`,
          }))}
        cols={1}
      >
        {this.props.children}
      </ComplexPicker>
    )
  }
}

export default JobStatus
