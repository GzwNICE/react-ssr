import React, { PureComponent } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { getAllInfo } from '../../actions/resume'
import { edit as educationalsEdit } from '../../actions/educationals'
import { NavBar, Flex, List, InputItem, DatePicker, Checkbox, Toast, Icon } from 'antd-mobile'
import { createForm } from 'rc-form'
import moment from 'moment'
import style from '../ResumeInfo/style.less'
import style2 from './style.less'

import Area from '../../inputs/Area'
import Education from '../../inputs/Education'
import EduMajor from '../../inputs/EduMajor'
import TextareaField from '../../inputs/TextareaField'
import School from './components/schoolSearch'
import Specialty from './components/specialtySearch'


// const minDate = moment().year(moment().year() - 99)
// const maxDate = moment()
// const nowTimeStamp = Date.now();
// const now = new Date(nowTimeStamp);
const maxDate = new Date();
let minDate = new Date(maxDate - 99*365*24*60*60*1000);
// let strTime="2011/04";
// console.log(new Date(Date.parse(strTime)))
@connect(state => {
  return {
    option: state.option,
    educationals: state.educationals.list,
  }
})
@createForm()
@withRouter
class ResumeEducationEdit extends PureComponent {
  componentDidMount() {
    this.props.dispatch(getAllInfo({
      appchannel: 'web',
    }))
  }

  changeValue() {
    this.props.form.validateFields((err, values) => {
      if (err) return
      console.log(values)
      if (values.school_cn === undefined || values.school_cn === '' ) {
        return Toast.info('请输入学校名称', 2)
      }
      if (values.major_cn === undefined || values.major_cn === '' ) {
        return Toast.info('请输入专业名称', 2)
      }
      if (values.degree[0] === undefined || values.degree[0] === '' ) {
        return Toast.info('请输入最高学历', 2)
      }
      if (values.begin === undefined || values.begin === null ) {
        return Toast.info('请输入开始时间', 2)
      }
      if (values.end === undefined || values.end === null ) {
        return Toast.info('请输入结束时间', 2)
      }
      if (values.begin.valueOf() > values.end.valueOf()) {
        return Toast.info('开始时间需小于结束时间', 2)
      }

      window.zhuge.track('我的简历', { '模块': '教育经历' })
      // overseas 1 是无海外经历，2是有海外经历
      this.props.dispatch(educationalsEdit({
        ...values,
        id: this.props.match.params.id,
        is_overseas: values.overseas ? '1' : '2',
        begin_year: moment(values.begin).format('YYYY'),
        begin_month: moment(values.begin).format('MM'),
        end_year:  moment(values.end).format('YYYY'),
        end_month: moment(values.end).format('MM'),
        detail_cn: '', // values.detail_cn || ''
      })).then(data => {
        // this.props.history.goBack()
      })
    })
  }

  render() {
    const {
      form,
      // option,
      educationals=[],
      match,
    } = this.props
    const { getFieldProps } = form
    const item = educationals.filter(item => {
      return item.id === match.params.id
    })[0] || {}
    // let save
    // this.props.form.validateFields((err, values) => {
    //   if (err) return
    //   if (values.school_cn && values.major_cn && values.major_cn[0] && values.degree && values.degree[0] && values.begin && values.end) {
    //     save = (<span style={{color: '#FF4F00'  }}>保存</span>)
    //   } else {
    //     save = (<span>保存</span>)
    //   }
    // })
    console.log(item)
    return (
      <Flex direction="column" align="stretch" className={style.root}>
        <NavBar
          mode="light"
          className={style.nav}
          icon={<Icon type="left" />}
          onLeftClick={() => this.props.history.goBack()}
          rightContent={<span onClick={() => this.changeValue()}><span>保存</span></span>}
        >
          教育经历
        </NavBar>
        <List>
          <School
            {...getFieldProps('school_cn', {
              initialValue: item.school_cn,
            })}
          >
            <List.Item arrow="horizontal">学校名称</List.Item>
          </School>
          <Specialty
            {...getFieldProps('major_cn', {
              initialValue: item.major_cn,
            })}
          >
            <List.Item arrow="horizontal">专业名称</List.Item>
          </Specialty>
          <Education
            {...getFieldProps('degree', {
              initialValue: [item.degree],
            })}
            title="最高学历"
            extra="请选择"
          >
            <List.Item arrow="horizontal">最高学历</List.Item>
          </Education>

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

          <div className={style.noboderline}>
            <DatePicker
              {...getFieldProps('end', {
                initialValue: (item.end_year && item.end_year !== '0') ?
                  new Date(Date.parse(`${item.end_year}/${item.end_month}`)) : null,
              })}
              mode="month"
              title="结束时间"
              extra="请选择"
              format={s => moment(s).format('YYYY.MM')}
              minDate={minDate}
              maxDate={maxDate}
            >
              <List.Item arrow="horizontal">结束时间</List.Item>
            </DatePicker>
          </div>

          <List.Item className={style.checkbox}>
            <label>
              <Checkbox
                {...getFieldProps('overseas', {
                  initialValue: item.is_overseas === '1' ? true : false,
                  valuePropName: 'checked',
                })}
              />
              <span>海外学习经历</span>
            </label>
          </List.Item>

        </List>
      </Flex>
    )
  }
}

export default ResumeEducationEdit
