import React, { PureComponent } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import dayjs from 'dayjs'
import { getAllInfo, edit as resumeEdit } from '../../actions/resume'
import { NavBar, Flex, List, InputItem, Toast, Picker, Checkbox, Icon } from 'antd-mobile'
import _ from 'lodash'
import F from '../../helper/tool'
import { createForm } from 'rc-form'
// import moment from 'moment'
import style from './style.less'

import Area from '../../inputs/Area'
// import WorkYear from '../../inputs/WorkYear' Picker
import Education from '../../inputs/Education'
import JobStatus from '../../inputs/JobStatus'
import IdType from '../../inputs/IdType'
import Marital from '../../inputs/Marital'
import Policital from '../../inputs/Policital'
import Nation from '../../inputs/Nation'
import Gender from '../../inputs/Gender'

const WorkDateChildren = props => {
  return (
    <div className={style.workDate}
    >
      <List.Item arrow="horizontal" extra={<span>
        <span className={style.workDateCheckbox}>
          <Checkbox
            {...props.form.getFieldProps('isWorkDate', {
              initialValue: props.resume.work_date === 0||dayjs(props.resume.work_date).isAfter(dayjs()) ? false : true,
              valuePropName: 'checked',
              onChange: props.onWorkDateChange,
            })}
          /></span><span onClick={props.onClick}>{props.extra}</span></span>}>
        <span>{props.children}</span>
      </List.Item>
    </div>
  )
};


@connect(state => {
  return {
    option: state.option,
    resume: state.resume,
  }
})
@createForm()
@withRouter
class ResumeInfo extends PureComponent {
  componentDidMount() {
    if(this.props.history.action !== 'REPLACE'){
      this.props.dispatch(
        getAllInfo({
          appchannel: 'web',
        })
      )
    }
  }

  changeValue() {
    this.props.form.validateFields((err, values) => {
      if (err) return

      if (values.true_name_cn === undefined || values.true_name_cn === '') {
        return Toast.info('请输入您的姓名', 2)
      }

      if (values.work_date === '' || values.work_date === undefined) {
        return Toast.info('请输入您的工作经验', 2)
      }

      if (values.degree.length === 0) {
        return Toast.info('请选择您的最高学历', 2)
      }

      if (values.current_location.length === 0) {
        return Toast.info('请选择您的现居地', 2)
      }

      if (values.domicile_location.length === 0) {
        return Toast.info('请选择您的户籍地', 2)
      }

      if (values.job_status.length === 0) {
        return Toast.info('请选择您的求职状态', 2)
      }

      if (values.height === '' || values.height.length === 0) {
        return Toast.info('请输您的身高', 2)
      }
      window.zhuge.track('我的简历', { '模块': '基本信息' })

      this.props
        .dispatch(
          resumeEdit({
            ...values,
            appchannel: 'web',
            work_date: values.isYjs ? 0 : values.work_date.join('-'),
            birthday: values.birthday.join('-'),
            graduation_time: values.graduation_time.join('-'),
          })
        )
        .then(data => {
          if (data.status === 0) {
            return Toast.info(data.errMsg, 2)
          }
          this.props.history.goBack()
        })
    })
  }

  save = () => {
    this.props.form.validateFields((err, values) => {
      let payload = {}
      Object.keys(values).forEach((key) => {
        payload[key] = (String(values[key]) || '')
      })
      const payloaded = {
        ...payload,
        nation_code: values.nation[0],
        work_date: values.isYjs ? 0 : values.work_date.join('-'),
        birthday: values.birthday.join('-'),
        graduation_time: values.graduation_time.join('-'),
      }
      this.props.dispatch({
        type: 'TEMPORARY_SAVE',
        payload: payloaded,
      })
    })
  }

  bindMobile(status) {
    this.save()
    const { resume } = this.props
    this.props.history.push(
      `/mobilebind/${_.toInteger(resume.is_phone_bind)}/${resume.mobile ||
      0}/${resume.hidden_mobile || 0}`
    )
  }

  bindEmail(status) {
    this.save()
    const { resume } = this.props
    this.props.history.push(
      `/emailbind/${_.toInteger(resume.is_email_bind)}/${resume.email ||
        0}/${resume.hidden_email || 0}`
    )
  }

  onYjsChange = (e) => {
    if(!e.target.checked) {
      this.props.form.setFieldsValue({
        work_date: dayjs().format('YYYY-MM').split('-').slice(0, 2),
      })
    }
    this.props.form.setFieldsValue({
      isYjs: e.target.checked,
      isWorkDate: !e.target.checked,
    })
  }

  onWorkDateChange = (e) => {
    const data = this.props.form.getFieldValue('work_date')
    const isAfter = dayjs(data).isAfter(dayjs().add(1, 'month'))
    if (e.target.checked && isAfter) {
      this.props.form.setFieldsValue({
        work_date: dayjs().format('YYYY-MM').split('-').slice(0, 2),
      })
    }
    this.props.form.setFieldsValue({
      isYjs: !e.target.checked,
      isWorkDate: e.target.checked,
    })
  }

  onPickWorkDate = (val) => {
    const isAfter = dayjs(val.join('-')).isAfter(dayjs())
    if(isAfter) {
      this.props.form.setFieldsValue({
        work_date: dayjs().format('YYYY-MM').split('-').slice(0, 2),
        isYjs:true,
        isWorkDate: false,
      })
    } else {
      this.props.form.setFieldsValue({
        isYjs: false,
        isWorkDate: true,
      })
    }
  }

  render() {
    const { form, resume } = this.props
    const { getFieldProps } = form
    const fifteryear = F.dataSource(100, 15)
    const zeroYear = F.dataSource(100, 0)
    const tenYear = F.dataSource(100, 10)
    const mobileStatus = _.toInteger(resume.is_phone_bind) ? (
      <span>
        <span style={{ color: '#ccc' }}>(已绑定)</span>
        {resume.mobile}
      </span>
    ) : (
      <span>
        <span style={{ color: 'red' }}>(待绑定)</span>
        {resume.mobile || '请输入'}
      </span>
    )
    const emailStatus = _.toInteger(resume.is_email_bind) ? (
      <span>
        <span style={{ color: '#ccc' }}>(已绑定)</span>
        {resume.email}
      </span>
    ) : (
      <span>
        <span style={{ color: 'red' }}>(待绑定)</span>
        {resume.email || '请输入'}
      </span>
    )
    return (
      <Flex direction="column" align="stretch" className={style.root}>
        <NavBar
          mode="light"
          className={style.nav}
          icon={<Icon type="left" />}
          onLeftClick={() => this.props.history.goBack()}
          rightContent={<span onClick={() => this.changeValue()}>保存</span>}
        >
          基本信息
        </NavBar>
        <List>
          <InputItem
            {...getFieldProps('true_name_cn', {
              initialValue: resume.true_name_cn,
            })}
            clear
            placeholder="请输入"
          >
            姓名
          </InputItem>

          <Gender
            {...getFieldProps('gender', {
              initialValue: resume.gender,
            })}
          >
            <List.Item>性别</List.Item>
          </Gender>

          <Picker
            {...getFieldProps('birthday', {
              initialValue: (resume.birthday || '2018-06')
                .split('-')
                .slice(0, 2),
            })}
            data={fifteryear}
            title="出生年月"
            cascade={false}
            extra="请选择"
          >
            <List.Item arrow="horizontal">出生年月</List.Item>
          </Picker>

          <Picker
            {...getFieldProps('work_date', {
              initialValue: (resume.work_date === '0' ? dayjs().format('YYYY-MM') : ((dayjs(resume.work_date).isAfter(dayjs()) ? dayjs().format('YYYY-MM'):resume.work_date||dayjs().format('YYYY-MM')))).split('-').slice(0, 2),
            })}
            data={zeroYear}
            title="参加工作时间"
            cascade={false}
            extra="请选择"
            onOk={this.onPickWorkDate}
          >
            <WorkDateChildren onWorkDateChange={this.onWorkDateChange} resume={resume} form={form}>参加工作时间</WorkDateChildren>
          </Picker>

          <Area
            {...getFieldProps('current_location', {
              initialValue: resume.current_location
                ? [resume.current_location]
                : [],
            })}
          >
            <List.Item arrow="horizontal">现居地</List.Item>
          </Area>

          <List.Item onClick={() => this.bindMobile(1)} extra={mobileStatus}>
            手机号码
          </List.Item>

          <List.Item onClick={() => this.bindEmail()} extra={emailStatus}>
            电子邮箱
          </List.Item>

        </List>
        <p className={style.footer}><i></i>为保证简历信息真实性，请先绑定手机号码和邮箱</p>
      </Flex>
    )
  }
}

export default ResumeInfo
