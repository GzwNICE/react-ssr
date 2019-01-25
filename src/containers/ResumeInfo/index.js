import React, { PureComponent } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { getAllInfo, edit as resumeEdit } from '../../actions/resume'
import { NavBar, Flex, List, InputItem, Toast, Icon } from 'antd-mobile'
import _ from 'lodash'
import { createForm } from 'rc-form'
import style from './style.less'
import Area from '../../inputs/Area'
import Gender from '../../inputs/Gender'
import moment from 'moment'
import GobackModal from '../../components/GoBackModal/index4'
import BirthTime from '../../components/Time/birthTime'
import JoinJobTime from '../../components/Time/joinJobTime'
import BorderBottomLine from '../../components/BorderBottomLine/index2'
import Cookies from 'js-cookie'

@connect(state => {
  return {
    option: state.option,
    resume: state.resume,
  }
})
@createForm({
  onValuesChange(props, values) {
    // console.log(props)
    // console.log(values.true_name_cn)
    // props.form.setFieldsValue({
    //   true_name_cn: '1111',
    // });
  },
})
@withRouter
class ResumeInfo extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      goBackModalVisible: false, // 返回按钮点击时出现的弹框
    }
  }
  componentDidMount() {
    const key = Cookies.get('isInfoSave') // key 为1代表跳转过到邮箱、手机绑定页面
    if (this.props.history.action !== 'REPLACE' && key !== '1') {
      this.props.dispatch(
        getAllInfo({
          appchannel: 'web',
        })
      )
    }
    Cookies.set('isInfoSave', '')
  }
  // 所有子组件修改根组件都可以调用这个方法
  setSst = obj => {
    this.setState(obj)
  }
  handleNameChange = (val) => {
   console.log(val)
  }
  changeValue() {
    this.props.form.validateFields((err, values) => {
      if (err) return
      console.log(values)

      function isNull(str) {
        if (str == '') return true
        var regu = '^[ ]+$'
        var re = new RegExp(regu)
        return re.test(str)
      }

      if (!values.true_name_cn) {
        return Toast.info('请填写姓名', 2)
      }
      if (isNull(values.true_name_cn)) {
        return Toast.info('请填写姓名', 2)
      }
      if (values.birthday === undefined || values.birthday === '') {
        return Toast.info('请选择出生年月', 2)
      }

      if (values.work_date === undefined || values.work_date === '') {
        return Toast.info('请选择参加工作时间', 2)
      }

      if (String(values.work_date) !== '0') {
        let start = values.birthday.valueOf()
        let end = values.work_date.valueOf()

        if (moment(values.birthday).format('YYYY-M') !==
          moment(values.work_date).format('YYYY-M') && start > end) {
          return Toast.info('参加工作时间不能小于出生年月', 2)
        }
      }

      if (values.current_location.length === 0) {
        return Toast.info('请选择现居地', 2)
      }
      const { resume } = this.props

      if (resume.is_phone_bind !== '1') {
        return Toast.info('请绑定手机号', 2)
      }
      if (resume.is_email_bind !== '1') {
        return Toast.info('请绑定邮箱', 2)
      }
      const work_date =
        values.work_date === 0 ? 0 : moment(values.work_date).format('YYYY-M')
      const birthday = moment(values.birthday).format('YYYY-M')
      // window.zhuge.track('我的简历', { '模块': '基本信息' })
      const parmas = {
        ...values,
        appchannel: 'web',
        work_date,
        birthday,
        // graduation_time: '', // values.graduation_time.join('-')
      }
      console.log(parmas)
      this.props.dispatch(resumeEdit(parmas)).then(data => {
        if (data.status === 0) {
          return Toast.info(data.errMsg, 2)
        }
        Toast.info('保存成功', 2)
        setTimeout(() => {
          this.props.history.replace(
            '/resume' + this.props.history.location.search
          )
        }, 500)
      })
    })
  }

  save = () => {
    this.props.form.validateFields((err, values) => {
      let payload = {}
      Object.keys(values).forEach(key => {
        payload[key] = String(values[key]) || ''
      })

      const work_date =
        values.work_date === 0 ? 0 : moment(values.work_date).format('YYYY-M')
      const birthday = moment(values.birthday).format('YYYY-M')

      const payloaded = {
        ...payload,
        // nation_code: '', // values.nation[0] 名族
        work_date,
        birthday,
        // graduation_time: '', // graduation_time  毕业时间
      }
      console.log(payloaded)
      this.props.dispatch({
        type: 'TEMPORARY_SAVE',
        payload: payloaded,
      })
      Cookies.set('isInfoSave', '1')
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
  // 顶部绑定的文案
  bindText = () => {
    const { resume } = this.props
    if (!resume.email && !resume.mobile) {
      return null
    }

    if (resume.is_phone_bind !== '1' && resume.is_email_bind !== '1') {
      return (
        <p className={style.footer}>
          <i />
          为保证简历信息真实性，请先绑定手机号码和邮箱
        </p>
      )
    }

    if (resume.is_phone_bind !== '1' && resume.is_email_bind === '1') {
      return (
        <p className={style.footer}>
          <i />
          为保证简历信息真实性，请先绑定手机号码
        </p>
      )
    }

    if (resume.is_phone_bind === '1' && resume.is_email_bind !== '1') {
      return (
        <p className={style.footer}>
          <i />
          为保证简历信息真实性，请先绑定邮箱
        </p>
      )
    }
  }

  render() {
    const { form, resume } = this.props
    const { getFieldProps } = form
    const { goBackModalVisible } = this.state
    // console.log(resume.work_date)
  
    const mobileStatus = _.toInteger(resume.is_phone_bind) ? (
      <span>
        <span className={style.bind} style={{ color: '#FF4F00' }}>
          已绑定
        </span>
        {resume.hidden_mobile}
      </span>
    ) : (
      <span>
        <span className={style.bind} style={{ color: '#FF4F00' }}>
          待绑定
        </span>
        {resume.hidden_mobile || '请输入'}
      </span>
    )
    const emailStatus = _.toInteger(resume.is_email_bind) ? (
      <span>
        <span className={style.bind} style={{ color: '#FF4F00' }}>
          已绑定
        </span>
        {resume.hidden_email}
      </span>
    ) : (
      <span>
        <span className={style.bind} style={{ color: '#FF4F00' }}>
          待绑定
        </span>
        {resume.hidden_email || '请输入'}
      </span>
    )
    return (
      <Flex direction="column" align="stretch" className={style.root}>
        <NavBar
          mode="light"
          className={style.nav}
          icon={<Icon type="left" />}
          onLeftClick={() => {
            this.setState({ goBackModalVisible: true })
          }}
          rightContent={<span onClick={() => this.changeValue()}>保存</span>}
        >
          基本信息
        </NavBar>
        <List>
          <InputItem
            {...getFieldProps('true_name_cn', {
              initialValue: resume.true_name_cn,
              // rules: [
              //   {
              //     pattern: '[^a-zA-Z0-9\u4E00-\u9FA5_]',
                
              //   },
              // ],
            })}
            clear
            placeholder="请填写"
            // onkeyup="value=value.replace(/[^\u4E00-\u9FA5]/g,'')"
            // onChange={(v) => { console.log('onChange', v); }}
          >
            姓名
          </InputItem>
          <BorderBottomLine />
          <Gender
            {...getFieldProps('gender', {
              initialValue:
                resume.gender && resume.gender !== undefined && resume.gender !== '0'
                  ? resume.gender
                  : 1,
            })}
          >
            <List.Item>性别</List.Item>
          </Gender>
          <BorderBottomLine />
          <BirthTime
            extra="请选择"
            {...getFieldProps('birthday', { initialValue: resume.birthday })}
            title="出生年月"
          />
          <BorderBottomLine />
          <JoinJobTime
            extra="请选择"
            {...getFieldProps('work_date', { initialValue: resume.work_date })}
            title="参加工作时间"
          />
          <BorderBottomLine />

          <Area
            extra="请选择"
            {...getFieldProps('current_location', {
              initialValue: resume.current_location
                ? [resume.current_location]
                : [],
            })}
          >
            <List.Item arrow="horizontal">现居地</List.Item>
          </Area>
          <BorderBottomLine />
          <List.Item
            onClick={() => this.bindMobile(1)}
            extra={mobileStatus}
            arrow="horizontal"
          >
            手机号码
          </List.Item>
          <BorderBottomLine />
          <List.Item
            className={style.email}
            onClick={() => this.bindEmail()}
            extra={emailStatus}
            arrow="horizontal"
          >
            联系邮箱
          </List.Item>
        </List>
        {this.bindText()}

        <GobackModal
          setSet={this.setSst.bind(this)}
          goBackModalVisible={goBackModalVisible}
        />
      </Flex>
    )
  }
}

export default ResumeInfo
