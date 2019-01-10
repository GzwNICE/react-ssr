import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import style from './style.less'
// import { Range } from 'rc-slider'
// import ReactDOM from 'react-dom'

import Slider from 'rc-slider'
import 'rc-slider/assets/index.css'
import Tooltip from 'rc-tooltip';

const Range = Slider.Range;
const Handle = Slider.Handle;
const handle = (props) => {
  const { value, dragging, index, ...restProps } = props;
  console.log(value)
  console.log(restProps)

  return (
    <Tooltip
      prefixCls="rc-slider-tooltip"
      overlay={value}
      visible={true}
      placement="top"
      key={index}
    >
      <Handle value={value} {...restProps} >
        <div className={style.mark}>
          <div className={style.num}>10万</div>
          <div className={style.line}/>
          {/*<div className={style.icon}/>*/}
        </div>
      </Handle>
    </Tooltip>
  );
};
@connect(state => {
  // console.log(state.option.opts_salary.salary_scope_index)
  return {
    options: state.option.opts_salary.salary_scope_index,
  }
})
class Salary extends PureComponent {
  state = {
    salary_scope_index: [], // 默认收起
  }
  componentDidMount() {
    console.log(this.props)
  }
  handleChange = e => {
    console.log(e)
    // this.setState({ lowerBound: +e.target.value });
  }
  // handle={(props) => <div>handle</div>}
  render() {
    const { salary_scope_index } = this.state
    return (
      <div className={style.wraper}>
        <span>111</span>
        <div className={style.content}>
          <div className={style.title}>
            月薪范围<span>(8千-2万)</span>
          </div>

          <div className={style.slider}>
            <Range
              min={0}
              max={20}
              handle={handle}
              onChange={this.handleChange}
              defaultValue={[3, 10]}
            />
          </div>
        </div>
      </div>
    )
  }
}

export default Salary
// <Range
// min={0}
// max={100}
// allowCross={false}
// tipFormatter={value => `${value}%`}
// defaultValue={[0, 100]}
// />
