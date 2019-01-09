import React, { PureComponent } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { getAllInfo } from '../../actions/resume'
import {edit as workExpsEdit, remove as workExpsRemove} from '../../actions/work_exps'
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
import dayjs from "dayjs"

const YING_JIE_SHENG = '至今'
const maxDate = new Date();
let minDate = new Date(maxDate - 99*365*24*60*60*1000);
// console.log(moment().month().format('MM'))

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
      deletModal: false,
      showModal: false,
    }
  }
  componentDidMount() {
    this.props.dispatch(getAllInfo({
      appchannel: 'web',
    })).then(() => {
      const {
        work_exps=[],
        match,
      } = this.props
      const item = work_exps.filter(item => {
        return item.id === match.params.id
      })[0] || {}
      let endTime = []
      if (Number(item.end_year) === 0) {
        endTime.push(YING_JIE_SHENG)
      } else {
        endTime.push(`${item.end_year}年`)
        endTime.push(`${item.end_month}月`)
      }

      this.setState({
        sValue: endTime,
      })
    })
    const initData = initDate('MMMM-YY', '', YING_JIE_SHENG)
    // console.log(initData)
    // console.log(initData.data.reverse())
    this.setState({
      endTimedata: initData.data,
      // sValue: initData.val,
    })
  }
  // componentWillReceiveProps(nextProps) {
  //   console.log(this.props)
  //   console.log(nextProps)
  // }
  handleFormat = (val) => {
    val = val.map((item) => {
      if ( item === YING_JIE_SHENG ) {
        return item
      } else {
        let str = item.substr(0, item.length -1)
        str = str.length === 1 ? `0${str}` : str
        return str
      }
    })
    val =  val.join('.')
    return val
  }

  changeValue() {
    const { sValue } = this.state
    this.props.form.validateFields((err, values) => {
      if (err) return
      console.log(values)

      if (values.company_name_cn === undefined || values.company_name_cn === '' ) {
        return Toast.info('请输入企业名称', 2)
      }

      if (values.position_cn === undefined || values.position_cn === '' ) {
        return Toast.info('请输入职位名称', 2)
      }

      if (values.begin === null || values.position_cn === '' ) {
        return Toast.info('请输入开始时间', 2)
      }

      if (sValue.length === 0 ) {
        return Toast.info('请输入结束时间', 2)
      }

      if (values.begin !== null && sValue.length >= 0 && sValue[0] !== YING_JIE_SHENG) {
        let beginTime = moment(values.begin).valueOf()

        let endTime = sValue.map((item) => {
          let str = item.substr(0, item.length -1)
          // str = str.length === 1 ? `${str}` : str
          return str
        })
        endTime = moment(dayjs(endTime).format('YYYY-M')).valueOf()
        if (beginTime > endTime) {
          return Toast.info('结束时间必须大于开始时间', 2)
        }

      }

      if(values.company_industry[0] === undefined) {
        return Toast.info('请选择所属行业', 2)
      }

      if (values.salary === undefined || values.salary === '' ) {
        return Toast.info('请输入税前薪资', 2)
      }

      window.zhuge.track('我的简历', { '模块': '工作经历' })


      let beginTime = values.begin
      let endTime = sValue.map((item) => {
        if ( item === YING_JIE_SHENG ) {
          return item
        } else {
          let str = item.substr(0, item.length -1)
          str = str.length === 1 ? `0${str}` : str
          return str
        }
      })

      // console.log(moment(beginTime).format('YYYY'))
      // console.log(moment(beginTime).format('MM'))

      let end_year, end_month
      if (endTime[0] === YING_JIE_SHENG) {
        end_year = 0
        end_month = 0
      } else {
        end_year = endTime[0]
        end_month = endTime[1]
      }
      this.props.dispatch(workExpsEdit({
        ...values,
        id: this.props.match.params.id,
        begin_year: moment(beginTime).format('YYYY'),
        begin_month: moment(beginTime).format('MM'),
        end_year,
        end_month,
        salary_type: values.salary_type ?  2 : 1,

        // position_cn: this.props.option.positions_index[values.position_id],
        // job_responsibilities_cn: values.job_responsibilities_cn || '',
        // job_performance_cn: values.job_performance_cn || '',
      })).then(data => {
        this.props.history.goBack()
      })
    })
  }
  // 删除
  handleDelete = () => {
    this.setState({
      deletModal: true,
    })
  }
  // 取消删除
  handleCancel = () => {
    this.setState({
      deletModal: false,
    })
  }
  // 确认删除
  handleDeleteOk = (item) => {
    this.setState({
      deletModal: false,
    })
    this.props.dispatch(workExpsRemove({
      work_exp_id: item.id,
    })).then(() => {
      this.props.history.goBack()
    })
  }
  // 退出
  handleExit = () => {
    this.setState({
      showModal: false,
    })
    this.props.history.goBack()
  }
  // 继续填写
  handleContinue = () => {
    this.setState({
      showModal: false,
    })
  }
  // 返回
  goBack = () => {
    const { operation } = this.state
    if (operation) {
      this.setState({
        showModal: true,
      })
    } else {
      this.props.history.goBack()
    }
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
    const { endTimedata, sValue, deletModal, showModal } = this.state
    // console.log(work_exps)
    // console.log(item)
    // console.log(option)
    // console.log(item.end_month)
    return (
      <Flex direction="column" align="stretch" className={style.root}>
        <NavBar
          mode="light"
          className={style.nav}
          icon={<Icon type="left" />}
          onLeftClick={() => this.goBack()}
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
              initialValue: item.company_name_cn,
            })}
          >
            <List.Item arrow="horizontal">企业名称</List.Item>
          </Company>
          {/*这边想用之前定义的方法Post组件那个，但是没怎么看懂*/}
          <Job
            {...getFieldProps('position_cn', {
              initialValue: item.position_cn,
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
                new Date(Date.parse(`${item.begin_year}/${item.begin_month}`)) : null,
            })}
            mode="month"
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
            <List.Item className={style['boder-bottom-1px']} arrow="horizontal">所属行业</List.Item>
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
                {...getFieldProps('salary_type', {
                  initialValue: item.salary_type === '2',
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
            placeholder="90%的HR通过岗位职责了解您的工作能力，完整的岗位职责可增加面试机率，最少输入10个字，最多输入2000个字。"
            extra="选填"
            maxLength={2000}
            count={2000}
          >
            <List.Item arrow="horizontal">岗位职责</List.Item>
          </TextareaField>


        </List>
        {
          (work_exps.length > 1 && item.id) ? <div className={style.bottom} onClick={this.handleDelete}>
            删除此工作经历
          </div> : null
        }

        <Modal
          visible={deletModal}
          transparent
          maskClosable={false}
          className={style2.modal}
          title="删除此工作经历将无法恢复"
        >
          <div className={style2.modalBody}>
            <p>确认删除吗?</p>
            <div>
              <div onClick={this.handleCancel}>取消</div>
              <div onClick={this.handleDeleteOk.bind(this, item)}>删除</div>
            </div>
          </div>
        </Modal>
        <Modal
          visible={showModal}
          transparent
          maskClosable={false}
          className={style.modal}
          title="内容尚未保存"
        >
          <div className={style.modalBody}>
            <p>你确定要退出吗?</p>
            <div>
              <div onClick={this.handleExit}>退出</div>
              <div onClick={this.handleContinue}>继续填写</div>
            </div>
          </div>
        </Modal>
      </Flex>
    )
  }
}

export default ResumeExperienceEdit
