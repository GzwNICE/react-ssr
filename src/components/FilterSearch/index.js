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
import { withRouter } from 'react-router-dom'
// import queryString from 'query-string'

// todo 薪资，点击地址和筛选时需要隐藏
@createForm({
  onValuesChange(props, values) {
    if (JSON.stringify(props.query) !== JSON.stringify(values)) {
      props.filterSearch(values)
    }
  },
})
@withRouter
class FilterSearch extends (PureComponent || Component) {
  // constructor(props) {
  //   super(props)
  //   this.state = {
  //     queryMore: {},
  //   }
  // }
  // componentDidMount() {
  //   console.log(11111111111111)
  //   const {keyword} = queryString.parse(this.props.history.location.search)
  //   console.log(keyword)
  // }
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
    // const {keyword} = queryString.parse(this.props.history.location.search)
    // console.log(this.props.history.location.search)
  }


  render() {
    const { form, query } = this.props
    const { getFieldProps } = form
    // console.log(query)
    // const obj = {
    //   company_industry: 1,
    // }
    // const more = {...query.more, ...obj}
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
            initialValue: query.salary ? query.salary : {},
          })}>
          </Salary>
        </div>

        <div className={style.item}>
          <More {...getFieldProps('more', {
            initialValue: query.more ? query.more : {},
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