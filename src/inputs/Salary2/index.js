import React,{PureComponent} from 'react'
import { connect } from 'react-redux'
import style from './style.less'

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
  render() {
    const { salary_scope_index } = this.state
    return (
      <div className={style.wraper}>
        <span>111</span>
        <div className={style.content}>222</div>

      </div>
        

    )
  }
}

export default Salary