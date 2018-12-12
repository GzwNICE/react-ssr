/**
 * Created by huangchao on 2017/11/4.
 */
import React,{PureComponent, Component} from 'react'
import style from './style.less'
import { createForm } from 'rc-form'
import Post from '../../inputs/Post'
import Area from '../../inputs/Area'
import Salary from '../../inputs/Salary'
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
      this.props.form.setFieldsValue(nextProps.query)
    }
  }

  componentDidMount() {
    this.props.form.setFieldsValue(this.props.query)
  }

  render() {
    const { form } = this.props
    const { getFieldProps } = form
    // console.log(this.props)
    return (
      <div className={style.FilterSearchWrap}>
        <div className={style.item}>
          <Post {...getFieldProps('position', {
            // initialValue: this.props.position ? this.props.position.split(',') : [],
          })}
            extra="" format={this.format} maxLength={5}>
            <SimpleItem arrow="horizontal">职位</SimpleItem>
          </Post>
          <div className={style.jiantou}>
            <img src={angleDownGray} alt="" />
          </div>
        </div>
        <div className={style.item}>
          <Area {...getFieldProps('area', {
           // initialValue: code ? code : [],
          })}
            extra="" format={this.formatArea}>
            <SimpleItem arrow="horizontal" />
          </Area>
          <div className={style.jiantou}>
            <img src={angleDownGray} alt="" />
          </div>
        </div>
        <div className={style.item}>
          <Salary.SearchSalarys {...getFieldProps('salary', {
            // initialValue: this.props.salary ? this.props.salary : [],
          })}
            extra="" format={this.format}>
            <SimpleItem arrow="horizontal">薪资</SimpleItem>
          </Salary.SearchSalarys>
          <div className={style.jiantou}>
            <img src={angleDownGray} alt="" />
          </div>
        </div>
        <div className={style.item}>
          <More {...getFieldProps('more', {
            // initialValue: this.props.more ? this.props.more : {},
          })}
            extra="" format={this.formatMore}>
            <SimpleItem arrow="horizontal">更多</SimpleItem>
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
