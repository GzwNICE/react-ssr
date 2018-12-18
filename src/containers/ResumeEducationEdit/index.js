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

// const minDate = moment().year(moment().year() - 99)
// const maxDate = moment()
// const nowTimeStamp = Date.now();
// const now = new Date(nowTimeStamp);
const maxDate = new Date();
let minDate = new Date(maxDate - 99*365*24*60*60*1000);
let strTime="2011/04";
console.log(new Date(Date.parse(strTime)))
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
      if (values.begin.valueOf() > values.end.valueOf()) {
        return Toast.info('开始时间需小于结束时间', 2)
      }

      if(values.school_cn === undefined) {
        return Toast.info('请输入您的学校名称', 2)
      }
      window.zhuge.track('我的简历', { '模块': '教育经历' })
      console.log(values)
      this.props.dispatch(educationalsEdit({
        ...values,
        // id: this.props.match.params.id,
        // is_overseas: values.overseas ? '1' : '2',
        // begin_year: values.begin.format('YYYY'),
        // begin_month: values.begin.format('MM'),
        // end_year: values.end.format('YYYY'),
        // end_month: values.end.format('MM'),
        detail_cn: '', // values.detail_cn || ''
      })).then(data => {
        this.props.history.goBack()
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
    let save
    this.props.form.validateFields((err, values) => {
      if (err) return
      if (values.school_cn && values.major_id && values.major_id[0] && values.degree && values.degree[0] && values.begin && values.end) {
        save = (<span style={{color: '#FF4F00'  }}>保存</span>)
      } else {
        save = (<span>保存</span>)
      }

    })
    return (
      <Flex direction="column" align="stretch" className={style.root}>
        <NavBar
          mode="light"
          className={style.nav}
          icon={<Icon type="left" />}
          onLeftClick={() => this.props.history.goBack()}
          rightContent={<span onClick={() => this.changeValue()}>{save}</span>}
        >
          教育经历
        </NavBar>
        <List>
          <InputItem
            {...getFieldProps('school_cn', {
              initialValue: item.school_cn,
            })}
            clear placeholder="请填写"
          >
            学校名称
          </InputItem>

          <EduMajor
            {...getFieldProps('major_id', {
              initialValue: [item.major_id],
            })}
            title="专业名称"
            extra="请填写"
          >
            <List.Item arrow="horizontal">专业名称</List.Item>
          </EduMajor>

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

          <div className={style.noboderline}>
            <DatePicker
              {...getFieldProps('end', {
                initialValue: (item.end_year && item.end_year !== '0') ?
                  new Date(Date.parse(`${item.end_year}/${item.end_month}`)) : maxDate,
              })}
              mode="date"
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
