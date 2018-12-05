import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import ComplexPicker from '../../components/ComplexPicker'

@connect(state => {
  return {
    options: state.option.opt_phone_rules,
  }
})
class PrefixMobile extends PureComponent {
  render() {
    const { options } = this.props
    return (
      <ComplexPicker
        {...this.props}
        data={options
          // .filter(item => item.code !== 0)
          .map(item => ({
            label: `${item.name}(${item.country})`,
            value: `${item.country}`,
          }))}
        cols={1}
      >
        {this.props.children}
      </ComplexPicker>
    )
  }
}

export default PrefixMobile
