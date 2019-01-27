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
import BirthTime from './compent/birthTime'
import GraduateTime from './compent/graduateTime'
import JoinJobTime from './compent/joinJobTime'
import BeginTime from './compent/beginTime'
import EndTime from './compent/endTime'

import School from '../../components/SchoolSearch'
import GobackModal from '../../components/GoBackModal/index1'
import BorderBottomLine from '../../components/BorderBottomLine'
import { getAllInfo } from '../../actions/resume'

const auth = store.get('m:auth') || {}
const tabs = [{ title: '在职' }, { title: '在校' }]
const isNull = str => {
  if (str == '') return true
  var regu = '^[ ]+$'
  var re = new RegExp(regu)
  return re.test(str)
}
@connect(state => {
  return {
    auth: state.auth,
    resume: state.resume,
    microresumeParams: state.microresume.microresumeParams,
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
      schoolParmas: {},
      jobParams: {},
    }
  }
  goLogin = () => {
    return Modal.alert('', '请先登录', [
      { text: '稍后', style: 'default' },
      {
        text: '登录',
        onPress: () =>
          this.props.history.replace(
            '/register?redirect=' + this.props.history.location.pathname
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
      if (!values.work_date) {
        return Toast.info('请选择参加工作时间', 2)
      }

      if (values.work_date.valueOf() < values.birthday.valueOf()) {
        return Toast.info('参加工作时间不能小于出生年月', 2)
      }
      if (!values.company_name_cn) {
        return Toast.info('请填写所在公司', 2)
      }
      if (!values.position_cn) {
        return Toast.info('请填写所任职位', 2)
      }
      if (!values.begin_time) {
        return Toast.info('请选择最近工作时间', 2)
      }
      if (values.end_time === undefined || values.end_time === '' || values.end_time == null) {
        return Toast.info('请选择最近工作时间', 2)
      }

      if (values.begin_time.valueOf() < values.work_date.valueOf()) {
        return Toast.info('开始时间不能小于参加工作时间', 2)
      }

      if (String(values.end_time) !== '0') {
        let start = values.begin_time.valueOf()
        let end = values.end_time.valueOf()
        console.log(moment(values.begin_time).format('YYYY-M'))
        console.log(moment(values.end_time).format('YYYY-M'))

        if (moment(values.begin_time).format('YYYY-M') !==
          moment(values.end_time).format('YYYY-M') && start > end) {
          return Toast.info('结束时间不能小于开始时间', 2)
        }
      }
 
      const birthday = moment(values.birthday).format('YYYY-M')
      const work_date = moment(values.work_date).format('YYYY-M')
      const begin_year = moment(values.begin_time).format('YYYY')
      const begin_month = moment(values.begin_time).format('M')
      const end_year =
        String(values.end_time) === '0' ? 0 : moment(values.end_time).format('YYYY')
      const end_month =
      String(values.end_time) === '0' ? 0 : moment(values.end_time).format('M')
      
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
      // this.setState({
      //   jobParams: params,
      // }, () => {
      // this.handleSave()
      // })
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
      if (!values.graduation_time11) {
        return Toast.info('请选择毕业时间', 2)
      }
      if (values.birthday > values.graduation_time11) {
        return Toast.info('毕业时间不能小于出生年月', 2)
      }
      if (!values.degree) {
        return Toast.info('请选择最高学历', 2)
      }
      if (!values.school_cn) {
        return Toast.info('请填写学校名称', 2)
      }

      const birthday = moment(values.birthday).format('YYYY-M')
      const edu_end_year = moment(values.graduation_time11).format('YYYY')
      const edu_end_month = moment(values.graduation_time11).format('M')
      const graduation_time11 = moment(values.graduation_time11).format('YYYY-M')
      const params = {
        true_name_cn: values.true_name_cn,
        gender: values.gender,
        birthday,
        graduation_time11: graduation_time11,
        edu_end_year,
        edu_end_month,
        degree: values.degree,
        school_cn: values.school_cn,
        mobile: Cookies.get('reigsterMobile'),
      }
      console.log(params)
      this.handleSave(params)
      // this.setState({
      //   schoolParmas: params,
      // }, () => {
      //   this.handleSave()
      // })
    })
  }

  // 接口保存
  handleSave = (values) => {
    const { changeVal } = this.state
    // const values = {...schoolParmas, ...jobParams}
    this.props.dispatch({
      type: 'MICRODONWPARAMS',
      paload: values,
    })
    if (changeVal) {
      this.props
        .dispatch(
          microDone({
            ...values,
          })
        )
        .then(res => {
          if (res.json && res.json.status) {
            Toast.info(res.json.msg, 2)
            window.zhuge.track('微简历保存成功')
            this.props.history.push('/resume')
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
            Toast.info(msg, 2)
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
    } else {
      let search = this.props.history.location.search
      this.props.history.push('/resume/micro/perfect' + search)
    }
  }

  componentWillReceiveProps(next) {
    console.log(next)
  }
  jobRender = () => {
    const { form, microresumeParams } = this.props
    const { getFieldProps } = form
    const {
      true_name_cn,
      gender,
      birthday,
      work_date,
      company_name_cn,
      position_cn,
      begin_year,
      begin_month,
      end_year,
      end_month,
    } = microresumeParams

    const begin_time = !begin_year ? null : `${begin_year}-${begin_month}`
    const endTime = end_year===undefined ? null : (String(end_year) === '0' ? 0 : `${end_year}-${end_month}`)
  
    return (
      <div className={style.job}>
        <div className={style.underlineleft} />
        <div className={style.jobtontent}>
          <InputItem
            {...getFieldProps('true_name_cn', {
              initialValue: !true_name_cn ? null : true_name_cn,
              normalize: (v, prev) => {
                if (v && /\s+/g.test(v)) {
                  let str = v.replace(/\s+/g,"")
                  return str;
                }
                return v;
              },
            })}
            clear
            placeholder="请填写"
          >
            姓名
          </InputItem>

          <BorderBottomLine />
          <Gender
            {...getFieldProps('gender', {
              initialValue: !gender ? 1 : gender,
            })}
          >
            <List.Item>性别</List.Item>
          </Gender>
          <BorderBottomLine />

          <BirthTime
            title="出生年月"
            {...getFieldProps('birthday', {
              initialValue: !birthday ? null : birthday,
            })}
          />

          <BorderBottomLine />
          <JoinJobTime
            title="参加工作时间"
            {...getFieldProps('work_date', {
              initialValue: !work_date ? null : work_date,
            })}
          />

          <BorderBottomLine />
          <Company
            {...getFieldProps('company_name_cn', {
              initialValue: !company_name_cn ? null : company_name_cn,
            })}
            extra="请填写"
          >
            <List.Item arrow="horizontal">最近所在公司</List.Item>
          </Company>
          <BorderBottomLine />
          <Job
            {...getFieldProps('position_cn', {
              initialValue: !position_cn ? null : position_cn,
            })}
            extra="请填写"
          >
            <List.Item arrow="horizontal">最近所任职位</List.Item>
          </Job>
          <BorderBottomLine />
          <div className={style.nearest}>
            <div>
              <BeginTime
                title="最近工作时间"
                {...getFieldProps('begin_time', {
                  initialValue: begin_time,
                })}
              />
            </div>
            <div>
              <EndTime
                title="至"
                {...getFieldProps('end_time', {
                  initialValue: endTime,
                })}
              />
            </div>
          </div>

          <BorderBottomLine />
        </div>

        <div className={style.btn} onClick={this.jobSaveChange}>
          继续完善，增加面试通过率
        </div>
      </div>
    )
  }
  shoolRender = () => {
    const { form, microresumeParams } = this.props
    const { getFieldProps } = form
    const {
      true_name_cn,
      gender,
      birthday,
      graduation_time11,
      degree,
      school_cn,
    } = microresumeParams
    return (
      <div className={style.school}>
        <div className={style.underlineright} />
        <div className={style.jobtontent}>
        <InputItem
        {...getFieldProps('true_name_cn', {
          initialValue: !true_name_cn ? null : true_name_cn,
          normalize: (v, prev) => {
            if (v && /\s+/g.test(v)) {
              let str = v.replace(/\s+/g,"")
              return str;
            }
            return v;
          },
        })}
        clear
        placeholder="请填写"
      >
        姓名
      </InputItem>

          <BorderBottomLine />
          <Gender
          {...getFieldProps('gender', {
            initialValue: !gender ? 1 : gender,
          })}
        >
          <List.Item>性别</List.Item>
        </Gender>
          <BorderBottomLine />
          <BirthTime
            title="出生年月"
            {...getFieldProps('birthday', {
              initialValue: !birthday ? null : birthday,
            })}
          />

          <BorderBottomLine />
          <GraduateTime title="毕业时间" {...getFieldProps('graduation_time11', {
            initialValue: !graduation_time11 ? null : graduation_time11,
          })} />

          <BorderBottomLine />

          <Education
            {...getFieldProps('degree', {
              initialValue: !degree ? null : degree,
            })}
            title="最高学历"
            extra="请选择"
          >
            <List.Item arrow="horizontal">最高学历</List.Item>
          </Education>
          <BorderBottomLine />

          <School {...getFieldProps('school_cn', {
            initialValue: !school_cn ? null : school_cn,
          })} extra="请填写">
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
  componentWillReceiveProps() {
    this.setState({
      changeVal: false,
    })
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
