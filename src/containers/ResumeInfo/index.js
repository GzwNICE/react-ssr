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
import Gender from '../../inputs/Gender'
import initDate from '../../helper/datePlugin'
import moment from 'moment'

const YING_JIE_SHENG = '应届生'
@connect(state => {
  return {
    option: state.option,
    resume: state.resume,
  }
})
@createForm()
@withRouter
class ResumeInfo extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      endTimedata: [],
      sValue: [],
    }
  }
  componentDidMount() {

    if(this.props.history.action !== 'REPLACE'){
      this.props.dispatch(
        getAllInfo({
          appchannel: 'web',
        })
      ).then(() => {
        this.initsValue()
      })
    } else {
      this.initsValue()
    }
    this.initEndTimeData()
  }
  initsValue = () => {
    const {
      work_date,
    } = this.props.resume
    let endTime = []
    console.log(work_date)
    if (work_date === YING_JIE_SHENG) {
      endTime.push(YING_JIE_SHENG)
    } else {
      let arr = dayjs(work_date).format('YYYY-M').split('-')
      endTime.push(`${arr[0]}年`)
      endTime.push(`${arr[1]}月`)
    }
    this.setState({
      sValue: endTime,
    })
  }
  initEndTimeData = () => {
    const initData = initDate('MMMM-YY', '', YING_JIE_SHENG)
    // console.log(initData)
    this.setState({
      endTimedata: initData.data,
      // sValue: initData.val,
    })
  }
  changeValue() {
    this.props.form.validateFields((err, values) => {
      if (err) return
      const { sValue } = this.state

      // console.log(values)
      // console.log(sValue)
      let endTime
      if (sValue[0] !== YING_JIE_SHENG) {
        endTime = sValue.map((item) => {
          let str = item.substr(0, item.length -1)
          return str
        })
      }


      if (values.true_name_cn === undefined || values.true_name_cn === '') {
        return Toast.info('请输入您的姓名', 2)
      }

      if (values.birthday.length === 0) {

        return Toast.info('请输入您的出生年月', 2)
      }

      if (sValue.length === 0 ) {
        return Toast.info('请输入结束时间', 2)
      }
      if (values.birthday.length !== 0 && sValue.length !== 0 && sValue[0] !== YING_JIE_SHENG) {
        let beginTimeVal = moment(dayjs(values.birthday).format('YYYY-M')).valueOf()

        let endTimeVal = moment(dayjs(endTime).format('YYYY-M')).valueOf()
        if (beginTimeVal > endTimeVal) {
          return Toast.info('参加工作时间必须大于出生年月', 2)
        }
      }
      if (values.current_location.length === 0) {
        return Toast.info('请选择您的现居地', 2)
      }

      window.zhuge.track('我的简历', { '模块': '基本信息' })
      const parmas = {
        ...values,
        appchannel: 'web',
        work_date: sValue[0] === YING_JIE_SHENG ? YING_JIE_SHENG : endTime.join('-'),
        birthday: values.birthday.join('-'),
        graduation_time: '', // values.graduation_time.join('-')
      }

      this.props
        .dispatch(
          resumeEdit(parmas)
        )
        .then(data => {
          if (data.status === 0) {
            return Toast.info(data.errMsg, 2)
          }
          // this.props.history.goBack()
        })
    })
  }

  save = () => {
    this.props.form.validateFields((err, values) => {
      const { sValue } = this.state
      let payload = {}
      Object.keys(values).forEach((key) => {
        payload[key] = (String(values[key]) || '')
      })
      let endTime
      if (sValue[0] !== YING_JIE_SHENG) {
        endTime = sValue.map((item) => {
          let str = item.substr(0, item.length -1)
          return str
        })
      }

      const payloaded = {
        ...payload,
        nation_code: '', // values.nation[0] 名族
        work_date: sValue[0] === YING_JIE_SHENG ? YING_JIE_SHENG : endTime.join('-'),
        birthday: values.birthday.join('-'),
        // graduation_time: '', // graduation_time  毕业时间
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
  handleFormat = (val) => {
    val = val.map((item) => {
      item = item.substring(0, item.length-1)
      return item
    })
    val =  val.join('.')
    return val
  }
  handleFormat2 = (val) => {
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
  render() {
    const { form, resume } = this.props
    const { getFieldProps } = form
    const { endTimedata, sValue } = this.state
    const fifteryear = F.dataSource(100, 15)

    // console.log(resume)
    const mobileStatus = _.toInteger(resume.is_phone_bind) ? (
      <span>
        <span className={style.bind} style={{ color: '#FF4F00' }}>已绑定</span>
        {resume.hidden_mobile}
      </span>
    ) : (
      <span>
        <span className={style.bind} style={{ color: '#FF4F00' }}>待绑定</span>
        {resume.hidden_mobile || '请输入'}
      </span>
    )
    const emailStatus = _.toInteger(resume.is_email_bind) ? (
      <span>
        <span className={style.bind} style={{ color: '#FF4F00' }}>已绑定</span>
        {resume.hidden_email}
      </span>
    ) : (
      <span>
        <span className={style.bind} style={{ color: '#FF4F00' }}>待绑定</span>
        {resume.hidden_email || '请输入'}
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
            format={this.handleFormat}
          >
            <List.Item arrow="horizontal">出生年月</List.Item>
          </Picker>
          <Picker
            data={endTimedata}
            title="参加工作时间"
            extra="请选择"
            value={sValue}
            cols={2}
            format={this.handleFormat2}
            onOk={v => this.setState({ sValue: v })}
          >
            <List.Item arrow="horizontal">参加工作时间</List.Item>
          </Picker>
          {/*<Picker*/}
            {/*{...getFieldProps('work_date', {*/}
              {/*initialValue: (resume.work_date === '0' ? dayjs().format('YYYY-MM') : ((dayjs(resume.work_date).isAfter(dayjs()) ? dayjs().format('YYYY-MM'):resume.work_date||dayjs().format('YYYY-MM')))).split('-').slice(0, 2),*/}
            {/*})}*/}
            {/*data={zeroYear}*/}
            {/*title="参加工作时间"*/}
            {/*cascade={false}*/}
            {/*extra="请选择"*/}
            {/*onOk={this.onPickWorkDate}*/}
            {/*format={this.handleFormat}*/}
          {/*>*/}
            {/*<List.Item arrow="horizontal">参加工作时间</List.Item>*/}
          {/*</Picker>*/}

          <Area
            {...getFieldProps('current_location', {
              initialValue: resume.current_location
                ? [resume.current_location]
                : [],
            })}
          >
            <List.Item arrow="horizontal">现居地</List.Item>
          </Area>

          <List.Item onClick={() => this.bindMobile(1)} extra={mobileStatus} arrow="horizontal">
            手机号码
          </List.Item>

          <List.Item className={style.email} onClick={() => this.bindEmail()} extra={emailStatus} arrow="horizontal">
            联系邮箱
          </List.Item>

        </List>
        <p className={style.footer}><i></i>为保证简历信息真实性，请先绑定手机号码和邮箱</p>
      </Flex>
    )
  }
}

export default ResumeInfo
