import React,{PureComponent} from 'react'
import { connect } from 'react-redux'
import ComplexPicker from '../../components/ComplexPicker'

@connect(state => {
  return {
    options: state.option.opts_work_mode,
    optIndex: state.option.opts_work_mode_index,
  }
})
class JobStatus extends PureComponent {
  render() {
    const { options = [] } = this.props
    return (
      <ComplexPicker
        {...this.props}
        data={options
        .filter(item => item.code !== 0)
          .map(item => ({
            label: item.value,
            value: `${item.code}`,
          }))}
        cols={1}>
        {this.props.children}
      </ComplexPicker>
    )
  }
}

export default JobStatus
