import React, { PureComponent } from 'react'
// import style from '../style.less'
import { List, DatePicker, InputItem, Toast, Modal } from 'antd-mobile'
import { createForm } from 'rc-form'
import moment from 'moment'

import Gender from '../../../inputs/Gender'
import { connect } from 'react-redux'

import Company from '../../../components/CompanyJobSearch/companySearch'
import Job from '../../../components/CompanyJobSearch/jobSearch'

const maxDate = new Date()
const minDate = new Date(maxDate - 99 * 365 * 24 * 60 * 60 * 1000)
@connect(state => {
  return {
    auth: state.auth,
  }
})
@createForm()
class JobFrom extends PureComponent {
  componentDidMount() {}

  render() {
    const { form } = this.props
    const { getFieldProps } = form

    return (
      <div>
        <InputItem {...getFieldProps('true_name_cn')} placeholder="请输入姓名">
          姓&emsp;&emsp;名
        </InputItem>
        <Gender
          {...getFieldProps('gender', {
            initialValue: 1,
          })}
        >
          <List.Item>性别</List.Item>
        </Gender>

        <DatePicker
          {...getFieldProps('work_date', {})}
          mode="month"
          title="参加工作时间"
          extra="请选择"
          format={s => moment(s).format('YYYY.MM')}
          minDate={minDate}
          maxDate={maxDate}
        >
          <List.Item arrow="horizontal">参加工作时间</List.Item>
        </DatePicker>

        <Company {...getFieldProps('company_name_cn', {})}>
          <List.Item arrow="horizontal">最近所在公司</List.Item>
        </Company>

        <Job {...getFieldProps('position_cn', {})}>
          <List.Item arrow="horizontal">最佳所任职位</List.Item>
        </Job>
      </div>
    )
  }
}

export default JobFrom
