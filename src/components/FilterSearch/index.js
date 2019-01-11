/**
 * Created by huangchao on 2017/11/4.
 */
import React,{PureComponent, Component} from 'react'
import style from './style.less'
import { createForm } from 'rc-form'
import Area from '../../inputs/Area'
import Salary from '../../inputs/Salary2'
import SimpleItem from '../../inputs/SimpleItem'
import More from '../../inputs/More'
import angleDownGray from '../../static/Rectangle@3x.png'

@createForm({
  onValuesChange(props, values) {
    if (JSON.stringify(props.query) !== JSON.stringify(values)) {
      props.filterSearch(values)
    }
  },
})
class FilterSearch extends (PureComponent || Component) {

  format(value) {
    return value.length ? `(${value.length})` : null
  }

  formatArea(value) {
    return value.length ? value.optIndex[value[0]] : '城市'
  }

  formatMore(value) {
    const len = Object.keys(value).length
    return len ? `(${len})` : ''
  }
  componentWillReceiveProps(nextProps) {
    if (JSON.stringify(this.props.query) !== JSON.stringify(nextProps.query)) {
      // this.props.form.setFieldsValue(nextProps.query)
    }
  }

  componentDidMount() {
    // this.props.form.setFieldsValue(this.props.query)
  }

  render() {
    const { form, query } = this.props
    const { getFieldProps } = form
    return (
      <div className={style.FilterSearchWrap}>

        <div className={style.item}>
          <Area {...getFieldProps('area', {
           initialValue: query.area ? query.area : [],
          })}
            extra="" format={this.formatArea}>
            <SimpleItem arrow="horizontal" />
          </Area>
          <div className={style.jiantou}>
            <img src={angleDownGray} alt="" />
          </div>
        </div>
        <div className={style.item}>
          <Salary {...getFieldProps('salary', {
            initialValue: { number: 0, currency: 'rmb' },
          })}>

          </Salary>
        
        </div>
        <div className={style.item}>
          <More {...getFieldProps('more', {
            initialValue: this.props.more ? this.props.more : {},
          })}
            extra="" format={this.formatMore}>
            <SimpleItem arrow="horizontal">筛选</SimpleItem>
          </More>
          <div className={style.jiantou}>
            <img src={angleDownGray} alt="" />
          </div>
        </div>
      </div>
    )
  }
}

export default FilterSearch
// this.props.salary ? this.props.salary : []