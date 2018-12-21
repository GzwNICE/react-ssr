import React, { PureComponent } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { getAllInfo } from '../../actions/resume'
import { edit as workExpsEdit } from '../../actions/work_exps'
import { NavBar, Icon, Flex, List, InputItem, DatePicker, Toast, Checkbox, Picker, Modal } from 'antd-mobile'
import { createForm } from 'rc-form'
import moment from 'moment'
import style2 from './style.less'
import style from '../ResumeInfo/style.less'

import Post from '../../inputs/Post'
import Company from './components/companySearch'
import Job from './components/jobSearch'
import Area from '../../inputs/Area'
import CompanyIndustry from '../../inputs/CompanyIndustry'
import TextareaField from '../../inputs/TextareaField'
// import Salary from '../../inputs/Salary';
import initDate from '../../helper/datePlugin'

const YING_JIE_SHENG = '至今'
const maxDate = new Date();
let minDate = new Date(maxDate - 99*365*24*60*60*1000);

@connect(state => {
  // console.log(state)
  return {
    option: state.option,
    work_exps: state.work_exps.list,
  }
})
@createForm()
@withRouter
class ResumeExperienceEdit extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      endTimedata: [],
      visible: false,
      sValue: [],
    }
  }
  componentDidMount() {
    this.props.dispatch(getAllInfo({
      appchannel: 'web',
    }))
    const initData = initDate('MMMM-YY', '', YING_JIE_SHENG)
    console.log(initData)
    this.setState({
      endTimedata: initData.data,
      sValue: initData.val,
    })
  }
  handleFormat = (val) => {
    val = val.map((item) => {
      if ( item === YING_JIE_SHENG ) {
        return item
      } else {
        return item.substr(0, item.length -1)
      }
    })
    val =  val.join('.')
    return val
  }

  changeValue() {
    this.props.form.validateFields((err, values) => {
      if (err) return
      console.log(values)
      if (values.begin.valueOf() > values.end.valueOf()) {
        return Toast.info('开始时间需小于结束时间', 2)
      }
      if(values.company_name_cn === undefined || values.company_name_cn === '') {
        return Toast.info('请输入企业名称', 2)
      }

      if(values.company_industry[0] === undefined) {
        return Toast.info('请选择所属行业', 2)
      }

      if(values.position_id.length === 0) {
        return Toast.info('请选择您的职位', 2)
      }
      window.zhuge.track('我的简历', { '模块': '工作经历' })

      this.props.dispatch(workExpsEdit({
        ...values,
        id: this.props.match.params.id,
        begin_year: values.begin.format('YYYY'),
        begin_month: values.begin.format('MM'),
        end_year: values.end.format('YYYY'),
        end_month: values.end.format('MM'),
        position_cn: this.props.option.positions_index[values.position_id],
        job_responsibilities_cn: values.job_responsibilities_cn || '',
        job_performance_cn: values.job_performance_cn || '',
      })).then(data => {
        this.props.history.goBack()
      })
    })
  }

  render() {
    const {
      form,
      option,
      work_exps=[],
      match,
    } = this.props
    const { getFieldProps } = form
    const item = work_exps.filter(item => {
      return item.id === match.params.id
    })[0] || {}
    const { endTimedata, sValue } = this.state

    console.log(item)
    console.log(option)
    // console.log(item.end_month)
    return (
      <Flex direction="column" align="stretch" className={style.root}>
        <NavBar
          mode="light"
          className={style.nav}
          icon={<Icon type="left" />}
          onLeftClick={() => this.props.history.goBack()}
          rightContent={<span onClick={() => this.changeValue()}>保存</span>}
        >
          工作经历
        </NavBar>
        <List>
          {/*<InputItem*/}
            {/*{...getFieldProps('company_name_cn', {*/}
              {/*initialValue: item.company_name_cn,*/}
            {/*})}*/}
            {/*clear placeholder="请输入"*/}
          {/*>*/}
            {/*企业名称*/}
          {/*</InputItem>*/}
          <Company
            {...getFieldProps('company_name_cn', {
              initialValue: '111',
            })}
          >
            <List.Item arrow="horizontal">企业名称</List.Item>
          </Company>
          {/*这边想用之前定义的方法Post组件那个，但是没怎么看懂*/}
          <Job
            {...getFieldProps('position_id', {
              initialValue: '职位名称1',
            })}
          >
            <List.Item arrow="horizontal">职位名称</List.Item>
          </Job>

          {/*<Post*/}
            {/*{...getFieldProps('position_id', {*/}
              {/*initialValue: item.position_id ? [item.position_id] : [],*/}
            {/*})}*/}
          {/*>*/}
            {/*<List.Item arrow="horizontal">职位名称</List.Item>*/}
          {/*</Post>*/}

          <DatePicker
            {...getFieldProps('begin', {
              initialValue: (item.begin_year && item.begin_year !== '0') ?
                new Date(Date.parse(`${item.begin_year}/${item.begin_month}`)) : maxDate,
            })}
            mode="date"
            title="开始时间"
            extra="请选择"
            format={s => moment(s).format('YYYY.MM')}
            minDate={minDate}
            maxDate={maxDate}
          >
            <List.Item arrow="horizontal">开始时间</List.Item>
          </DatePicker>

          {/*<DatePicker*/}
            {/*{...getFieldProps('end', {*/}
              {/*initialValue: (item.end_year && item.end_year !== '0') ?*/}
                {/*new Date(Date.parse(`${item.end_year}/${item.end_month}`)) : maxDate,*/}
            {/*})}*/}
            {/*mode="date"*/}
            {/*title="结束时间"*/}
            {/*extra="请选择"*/}
            {/*format={s => moment(s).format('YYYY.MM')}*/}
            {/*minDate={minDate}*/}
            {/*maxDate={maxDate}*/}
          {/*>*/}
            {/*<List.Item arrow="horizontal">结束时间</List.Item>*/}
          {/*</DatePicker>*/}
          <Picker
            data={endTimedata}
            title="结束时间"
            extra="请选择"
            value={sValue}
            cols={2}
            format={this.handleFormat}
            onOk={v => this.setState({ sValue: v })}
          >
            <List.Item arrow="horizontal">结束时间</List.Item>
          </Picker>
          <CompanyIndustry
            {...getFieldProps('company_industry', {
              initialValue: [item.company_industry],
            })}
            title="所属行业"
            extra="请选择"
          >
            <List.Item arrow="horizontal">所属行业</List.Item>
          </CompanyIndustry>

          <div className={style.noboderline}>
            <InputItem
              {...getFieldProps('salary', {
                initialValue: item.salary,
              })}
              clear
              placeholder="请输入"
              type="number"
            >
              税前薪资
            </InputItem>
          </div>

          <List.Item className={style.checkbox}>
            <label>
              <Checkbox
                {...getFieldProps('overseas', {
                  initialValue: '1' === '1' ? true : false,
                  valuePropName: 'checked',
                })}
              />
              <span>对hr显示为保密</span>
            </label>
          </List.Item>
          <TextareaField
            {...getFieldProps('job_responsibilities_cn', {
              initialValue: item.job_responsibilities_cn,
            })}
            placeholder="请简要描述您的岗位职责，400个字以内。"
            extra="请输入"
            maxLength={400}
          >
            <List.Item arrow="horizontal">岗位职责</List.Item>
          </TextareaField>


        </List>

        <div className={style.bottom}>
          删除此工作经历
        </div>
        {/*<Modal*/}
          {/*visible={true}*/}
          {/*transparent*/}
          {/*maskClosable={false}*/}
          {/*animationType="slide-down"*/}
          {/*className={style2.moadlWrap}*/}
        {/*>*/}
          {/*<div style={{ height: 100, overflow: 'scroll' }}>*/}
            {/*scoll content...<br />*/}
            {/*scoll content...<br />*/}
            {/*scoll content...<br />*/}
            {/*scoll content...<br />*/}
            {/*scoll content...<br />*/}
            {/*scoll content...<br />*/}
          {/*</div>*/}
        {/*</Modal>*/}
      </Flex>
    )
  }
}

export default ResumeExperienceEdit
