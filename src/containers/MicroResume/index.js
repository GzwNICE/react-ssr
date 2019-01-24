import React, { PureComponent } from 'react'
import style from './style.less'
import { NavBar, List, InputItem, Toast, Modal, Icon, Tabs } from 'antd-mobile'
import { createForm } from 'rc-form'
import { withRouter } from 'react-router-dom'
import moment from 'moment'
import Cookies from 'js-cookie'
import store from 'store'
import Education from '../../inputs/Education'
import Gender from '../../inputs/Gender'
import { connect } from 'react-redux'
import { microDone } from '../../actions/microresume'
// import JobFrom from './compent/job'  // todo 不知道为什么 Company Job 这两个写在这个组件里，点击不弹出来
import Company from '../../components/CompanyJobSearch/companySearch'
import Job from '../../components/CompanyJobSearch/jobSearch'
import JobTime from './compent/jobTime'
import BirthTime from './compent/birthTime'
import GraduateTime from './compent/graduateTime'
import JoinJobTime from './compent/joinJobTime'
import School from '../../components/SchoolSearch'
import GobackModal from '../../components/GoBackModal/index1'
import BorderBottomLine from '../../components/BorderBottomLine'
import { getAllInfo } from '../../actions/resume'

const auth = store.get('m:auth') || {}
const tabs = [{ title: '在职' }, { title: '在校' }]
const isNull = (str) => {
  if (str == '') return true
  var regu = '^[ ]+$'
  var re = new RegExp(regu)
  return re.test(str)
}
@connect(state => {
  return {
    auth: state.auth,
    resume: state.resume,
  }
})
@createForm({
  onValuesChange(props, values) {
    // console.log(values)
  },
})
@withRouter
class MicroResume extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      initialPage: 0,
      changeVal: false, // 判断是不是保存按钮触发的接口
      goBackModalVisible: false, // 返回按钮点击时出现的弹框
    }
  }
  goLogin = () => {
    return Modal.alert('', '请先登录', [
      { text: '稍后', style: 'default' },
      {
        text: '登录',
        onPress: () =>
          this.props.history.replace(
            '/login?redirect=' + this.props.history.location.pathname
          ),
      },
    ])
  }

  componentDidMount() {
    window.zhuge.track('微简历-基本信息页面打开')
    setTimeout(() => {
      if (!auth.user_id && !Cookies('ticket')) {
        this.goLogin()
      } else {
        this.props
          .dispatch(
            getAllInfo({
              // version: '5.2.1',
              appchannel: 'web',
            })
          )
          .then(data => {
            if (this.props.resume.true_name_cn) {
              this.props.history.replace('/resume')
            }
          })
      }
    }, 400)
  }
  // 所有子组件修改根组件都可以调用这个方法
  setSst = obj => {
    this.setState(obj)
  }

  // 保存
  changeValue() {
    
    const { initialPage } = this.state
    this.setState(
      {
        changeVal: true,
      },
      () => {
        if (initialPage === 0) {
          this.jobSaveChange()
        } else {
          this.schoolSaveChange()
        }
      }
    )
  }
  // 在职简历继续完善
  jobSaveChange = () => {
    this.props.form.validateFields((err, values) => {
      if (err) return
      console.log(values)
      if (!values.true_name_cn) {
        return Toast.info('请填写姓名', 2)
      }
      if (isNull(values.true_name_cn)) {
        return Toast.info('请填写姓名', 2)
      }
      
      if (!values.birthday) {
        return Toast.info('请选择出生年月', 2)
      }
      if (values.work_date === undefined || values.work_date === '') {
        return Toast.info('请选择参加工作时间', 2)
      }

      if (values.work_date < values.birthday.valueOf()) {
        return Toast.info('参加工作时间不能小于出生年月', 2)
      }
      if (!values.company_name_cn) {
        return Toast.info('请填写所在公司', 2)
      }
      if (!values.position_cn) {
        return Toast.info('请填写所任职位', 2)
      }
      if (!values.job_time) {
        return Toast.info('请选择最近工作时间', 2)
      }
      if (!values.job_time[0] || values.job_time[1] === '') {
        return Toast.info('请选择最近工作时间', 2)
      }
      if (values.work_date > values.job_time[0]) {
        return Toast.info('开始时间不能小于参加工作时间', 2)
      }
      if (values.job_time[1] !== 0 && values.job_time[0] > values.job_time[1]) {
        return Toast.info('结束时间不能小于开始时间', 2)
      }

      const work_date =
        values.work_date === 0 ? 0 : moment(values.work_date).format('YYYY-M')
      const begin_year = moment(values.job_time[0]).format('YYYY')
      const begin_month = moment(values.job_time[0]).format('M')
      const end_year =
        values.job_time[1] === 0 ? 0 : moment(values.job_time[1]).format('YYYY')
      const end_month =
        values.job_time[1] === 0 ? 0 : moment(values.job_time[1]).format('M')
      const birthday = moment(values.birthday).format('YYYY-M')
      const params = {
        true_name_cn: values.true_name_cn,
        gender: values.gender,
        work_date,
        birthday,
        company_name_cn: values.company_name_cn,
        position_cn: values.position_cn,
        begin_year,
        begin_month,
        end_year,
        end_month,
        mobile: Cookies.get('reigsterMobile'),
      }
      console.log(params)
      this.handleSave(params)
    })
  }
  // 在校简历继续完善
  schoolSaveChange = () => {
    this.props.form.validateFields((err, values) => {
      if (err) return
      console.log(values)
      if (!values.true_name_cn) {
        return Toast.info('请填写姓名', 2)
      }
      if (isNull(values.true_name_cn)) {
        return Toast.info('请填写姓名', 2)
      }
      if (!values.birthday) {
        return Toast.info('请选择出生年月', 2)
      }
      if (!values.edu_end) {
        return Toast.info('请选择毕业时间', 2)
      }
      if (values.birthday > values.edu_end) {
        return Toast.info('毕业时间不能小于出生年月', 2)
      }
      if (!values.degree) {
        return Toast.info('请选择最高学历', 2)
      }
      if (!values.school_cn) {
        return Toast.info('请填写学校名称', 2)
      }

      const birthday = moment(values.birthday).format('YYYY-M')
      const edu_end = moment(values.edu_end).format('YYYY-M')
      const params = {
        true_name_cn: values.true_name_cn,
        gender: values.gender,
        birthday,
        graduation_time: edu_end,
        degree: values.degree,
        school_cn: values.school_cn,
        mobile: Cookies.get('reigsterMobile'),
      }
      console.log(params)
      this.handleSave(params)
    })
  }

  // 接口保存
  handleSave = values => {
    const { changeVal } = this.state
    this.props.dispatch({
      type: 'MICRODONWPARAMS',
      paload: values,
    })
    this.props
      .dispatch(
        microDone({
          ...values,
        })
      )
      .then(res => {
        if (res.json && res.json.status) {
          Toast.info(res.json.msg, 2)
          // window.zhuge.track('微简历保存成功')
          setTimeout(() => {
            let search = this.props.history.location.search
            let path = ''
            if (search.indexOf('?redirect=') !== -1) {
              path = search.split('?redirect=')[1]
            }
            if (changeVal) {
              this.props.history.push('/resume')
            } else {
              this.props.history.push('/resume/micro/perfect?redirect=' + path)
            }
          }, 999)
          window.zhuge.track('微简历保存成功')
        } else {
          const msg = res.errMsg
          // window.zhuge.track('保存失败', {
          //   原因: msg,
          // })
          // window.zhuge.track('微简历页面打开', {
          //   保存失败: msg,
          // })
          if (msg === '未登陆') {
            return this.goLogin()
          }
          return Toast.info(msg, 2)
        }
      })
      .catch(err => {
        // window.zhuge.track('保存失败', {
        //   原因: err.errMsg,
        // })
        // window.zhuge.track('微简历页面打开', {
        //   保存失败: err.errMsg,
        // })
        Toast.info(err.errMsg, 2)
      })
  }
  jobRender = () => {
    const { form } = this.props
    const { getFieldProps } = form
    return (
      <div className={style.job}>
        <div className={style.underlineleft} />
        <div className={style.jobtontent}>
          <InputItem
            {...getFieldProps('true_name_cn')}
            clear
            placeholder="请填写"
          >
            姓名
          </InputItem>

          <BorderBottomLine />
          <Gender
            {...getFieldProps('gender', {
              initialValue: 1,
            })}
          >
            <List.Item>性别</List.Item>
          </Gender>
          <BorderBottomLine />

          <BirthTime title="出生年月" {...getFieldProps('birthday', {})} />

          <BorderBottomLine />
          <JoinJobTime {...getFieldProps('work_date', {})} />

          <BorderBottomLine />
          <Company {...getFieldProps('company_name_cn', {})} extra="请填写">
            <List.Item arrow="horizontal">最近所在公司</List.Item>
          </Company>
          <BorderBottomLine />
          <Job {...getFieldProps('position_cn', {})} extra="请填写">
            <List.Item arrow="horizontal">最近所任职位</List.Item>
          </Job>
          <BorderBottomLine />
          <JobTime {...getFieldProps('job_time', {})} />
          <BorderBottomLine />
        </div>

        <div className={style.btn} onClick={this.jobSaveChange}>
          继续完善，增加面试通过率
        </div>
      </div>
    )
  }
  shoolRender = () => {
    const { form } = this.props
    const { getFieldProps } = form
    return (
      <div className={style.school}>
        <div className={style.underlineright} />
        <div className={style.jobtontent}>
          <InputItem
            {...getFieldProps('true_name_cn')}
            clear
            placeholder="请填写"
          >
            姓名
          </InputItem>

          <BorderBottomLine />
          <Gender
            {...getFieldProps('gender', {
              initialValue: 1,
            })}
          >
            <List.Item>性别</List.Item>
          </Gender>
          <BorderBottomLine />
          <BirthTime title="出生年月" {...getFieldProps('birthday', {})} />

          <BorderBottomLine />
          <GraduateTime title="毕业时间" {...getFieldProps('edu_end', {})} />

          <BorderBottomLine />

          <Education
            {...getFieldProps('degree', {})}
            title="最高学历"
            extra="请选择"
          >
            <List.Item arrow="horizontal">最高学历</List.Item>
          </Education>
          <BorderBottomLine />

          <School {...getFieldProps('school_cn', {})} extra="请填写">
            <List.Item arrow="horizontal">学校名称</List.Item>
          </School>
          <BorderBottomLine />
        </div>

        <div className={style.btn} onClick={this.schoolSaveChange}>
          继续完善，增加面试通过率
        </div>
      </div>
    )
  }
  render() {
    const { initialPage, goBackModalVisible } = this.state
    return (
      <div className={style.container}>
        <NavBar
          mode="light"
          className={style.nav}
          icon={<Icon type="left" />}
          onLeftClick={() => {
            this.setState({ goBackModalVisible: true })
          }}
          rightContent={
            <span onClick={() => this.changeValue()}>
              <span>保存</span>
            </span>
          }
        >
          创建简历
        </NavBar>
        <p className={style.title}>欢迎来到最佳东方</p>
        <p className={style.subtitle}>“应聘职位前，你需要先创建一份简历”</p>
        <Tabs
          tabs={tabs}
          initialPage={initialPage}
          onChange={(tab, index) => {
            this.setState({ initialPage: index })
          }}
        >
          {this.jobRender()}
          {this.shoolRender()}
        </Tabs>
        <GobackModal
          setSet={this.setSst.bind(this)}
          goBackModalVisible={goBackModalVisible}
        />
      </div>
    )
  }
}

export default MicroResume
