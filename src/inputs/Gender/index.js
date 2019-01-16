import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { Checkbox, Flex } from 'antd-mobile'
import style from './style.less'

@connect(state => {
  return {
    options: state.option.opts_gender,
    optIndex: state.option.opts_gender_index,
  }
})
class IdType extends PureComponent {
  render() {
    const { options = [], value, children } = this.props
    // const arr = options.reverse()
    // console.log(value)
    // console.log(children)
    return React.cloneElement(children, {
      extra: (
        <Flex direction="row-reverse">
          <Checkbox
            key={2}
            className={style.radio}
            checked={2 === parseInt(value, 10)}
            onChange={e => this.props.onChange(2)}
          >
            女
          </Checkbox>
          <Checkbox
            key={1}
            className={style.radio}
            checked={1 === parseInt(value, 10)}
            onChange={e => this.props.onChange(1)}
          >
            男
          </Checkbox>
        </Flex>
      ),
    })
  }
}

export default IdType

// {arr.map(item => (
//   <Checkbox
//     key={item.code}
//     className={style.radio}
//     checked={item.code === parseInt(value, 10)}
//     onChange={e => this.props.onChange(item.code)}
//   >
//     {item.value}
//   </Checkbox>
// ))}
