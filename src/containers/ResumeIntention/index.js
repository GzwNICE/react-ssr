import React, { PureComponent } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { getAllInfo } from '../../actions/resume'
import { edit as intentionEdit } from '../../actions/intention'
import { NavBar, Flex, List, Checkbox, Toast, Icon } from 'antd-mobile'
import { createForm } from 'rc-form'
import style from '../ResumeInfo/style.less'
import Post from '../../inputs/Post'
import Area from '../../inputs/Area'
import WorkMode from '../../inputs/WorkMode'
import Industry from '../../inputs/Industry'
import Salary from '../../inputs/Salary'
import JobStatus from '../../inputs/JobStatus'
import GobackModal from '../../components/GoBackModal/index4'
import BorderBottomLine from '../../components/BorderBottomLine/index2'
import { Helmet } from 'react-helmet'

// import style2 from './style.less'

@connect(state => {
  let DesiredLocations = new Set(
    state.DesiredPositions.list.map(item => item.position)
  )
  DesiredLocations = [...DesiredLocations]
  console.log(state.resume)
  return {
    option: state.option,
    DesiredJob: state.DesiredJob,
    DesiredCompanyTypes: state.DesiredCompanyTypes.list,
    DesiredLocations: state.DesiredLocations.list.map(item => item.location),
    DesiredPositions: DesiredLocations,
    resume: state.resume,
  }
})
@createForm()
@withRouter
class ResumeIntention extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      goBackModalVisible: false, // 返回按钮点击时出现的弹框
    }
  }
  componentDidMount() {
    this.props.dispatch(
      getAllInfo({
        version: '5.2.1',
        appchannel: 'web',
      })
    )
  }
  // 所有子组件修改根组件都可以调用这个方法
  setSst = obj => {
    this.setState(obj)
  }
  changeValue() {
    this.props.form.validateFields((err, values) => {
      console.log(values)
      if (err) return

      if (values.desired_positions.length === 0) {
        return Toast.info('请选择意向职位', 2)
      }

      if (values.company_industry.length === 0) {
        return Toast.info('请选择意向行业', 2)
      }

      if (values.desired_locations.length === 0) {
        return Toast.info('请选择意向城市', 2)
      }

      if (!values.desired_salary[0] || values.desired_salary[0] === '0') {
        return Toast.info('请选择期望月薪', 2)
      }

      if (values.work_mode[0] === '' || values.work_mode[0] === undefined) {
        return Toast.info('请选择工作类型', 2)
      }
      if (!values.job_status[0] || values.job_status[0] === '0') {
        return Toast.info('请选择求职状态', 2)
      }

      // window.zhuge.track('我的简历', { '模块': '求职意向' })
      const parmas = {
        PersonDesiredPosition: JSON.stringify(values.desired_positions),
        PersonDesiredCompanyType: JSON.stringify(
          values.company_industry.map(item => ({
            company_type: JSON.stringify(item),
            industry: JSON.stringify(item),
            // star: '', // values.star_level[0]
          }))
        ),
        PersonDesiredLocation: JSON.stringify(values.desired_locations),
        PersonDesiredJob: JSON.stringify({
          desired_salary: values.desired_salary[0],
          desired_salary_is_show: values.desired_salary_is_show ? '2' : '1', // 1显示（不打钩）       2不显示（打钩）
          work_mode: `${values.work_mode}`,
        }),
        job_status: `${values.job_status}`,
      }
      console.log(parmas)
      this.props.dispatch(intentionEdit(parmas)).then(data => {
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
  componentWillReceiveProps() {}
  render() {
    const {
      form,
      // option,
      DesiredJob,
      DesiredCompanyTypes = [],
      DesiredLocations,
      DesiredPositions,
      resume,
    } = this.props
    const { goBackModalVisible } = this.state
    const { getFieldProps } = form
    // todo this.props.form.getFieldsValue() 刷新时为空，但是有数据？？？
    const {
      desired_positions,
      company_industry,
      desired_locations,
      desired_salary,
      work_mode,
      job_status,
    } = this.props.form.getFieldsValue()

    // console.log(DesiredPositions && DesiredPositions.length > 0 ? DesiredPositions : [])
    return (
      <Flex direction="column" align="stretch" className={style.root}>
        <Helmet>
          <title>最佳东方 - 旅游服务业专业的招聘平台</title>
          <meta
            name="description"
            content="最佳东方专为个人提供全面的酒店,餐饮,物业,海外,高尔夫,游轮职位招聘信息，为企业提供校园招聘,猎头,培训,测评和人事外包在内的全方位的人力资源服务，帮助个人求职者与企业搭建最佳的人才招募和人才培养渠道。"
          />
          <meta
            name="keywords"
            content="酒店招聘,餐饮,物业,海外,高尔夫,游轮,招聘会"
          />
        </Helmet>
        <NavBar
          mode="light"
          className={style.nav}
          icon={<Icon type="left" />}
          onLeftClick={() => {
            this.setState({ goBackModalVisible: true })
          }}
          rightContent={<span onClick={() => this.changeValue()}>保存</span>}
        >
          求职意向
        </NavBar>
        <List>
          {/*数据都是undefined*/}

          <Post
            {...getFieldProps('desired_positions', {
              initialValue: DesiredPositions,
            })}
            extra="请选择"
            maxLength={5}
          >
            <List.Item
              arrow="horizontal"
              className={`${
                desired_positions && desired_positions.length > 0
                  ? style.selectcolor
                  : ''
              }`}
            >
              意向职位
            </List.Item>
          </Post>
          <BorderBottomLine />
          <Industry
            {...getFieldProps('company_industry', {
              initialValue: DesiredCompanyTypes.length
                ? DesiredCompanyTypes.map(item => item.industry)
                : [], // DesiredCompanyTypes.map(item => ('0' + item.industry).slice(-2) + ('0' + item.company_type).slice(-2)) : [],
            })}
            extra="请选择"
            maxLength={5}
            type="Industry"
          >
            <List.Item
              arrow="horizontal"
              className={`${
                company_industry && company_industry.length > 0
                  ? style.selectcolor
                  : ''
              }`}
            >
              意向行业
            </List.Item>
          </Industry>
          <BorderBottomLine />

          <Area
            {...getFieldProps('desired_locations', {
              initialValue: DesiredLocations,
            })}
            extra="请选择"
            maxLength={5}
          >
            <List.Item
              arrow="horizontal"
              className={`${
                desired_locations && desired_locations.length > 0
                  ? style.selectcolor
                  : ''
              }`}
            >
              意向城市
            </List.Item>
          </Area>
          <BorderBottomLine />

          <div className={style.noboderline}>
            <Salary
              extra="请选择"
              auto
              {...getFieldProps('desired_salary', {
                initialValue: [DesiredJob.desired_salary],
              })}
            >
              <List.Item
                arrow="horizontal"
                className={`${
                  desired_salary &&
                  desired_salary[0] &&
                  desired_salary[0] !== '0'
                    ? style.selectcolor
                    : ''
                }`}
              >
                期望月薪
              </List.Item>
            </Salary>
          </div>

          <List.Item className={style.checkbox}>
            <label>
              <Checkbox
                {...getFieldProps('desired_salary_is_show', {
                  initialValue:
                    DesiredJob.desired_salary_is_show === '2' ? true : false,
                  valuePropName: 'checked',
                })}
              />
              <span>企业查看时显示为面议</span>
            </label>
          </List.Item>
          <BorderBottomLine />

          <WorkMode
            {...getFieldProps('work_mode', {
              initialValue: [DesiredJob.work_mode || 0],
            })}
            title="工作类型"
            extra="请选择"
          >
            <List.Item
              arrow="horizontal"
              className={`${
                work_mode && work_mode[0] && work_mode[0] !== '0'
                  ? style.selectcolor
                  : ''
              }`}
            >
              工作类型
            </List.Item>
          </WorkMode>
          <BorderBottomLine />

          <JobStatus
            {...getFieldProps('job_status', {
              initialValue: resume.job_status ? [resume.job_status] : [],
            })}
            title="求职状态"
            extra="请选择"
          >
            <List.Item
              arrow="horizontal"
              className={`${
                job_status && job_status[0] && job_status[0] !== undefined
                  ? style.selectcolor
                  : ''
              }`}
            >
              求职状态
            </List.Item>
          </JobStatus>
        </List>
        <GobackModal
          setSet={this.setSst.bind(this)}
          goBackModalVisible={goBackModalVisible}
        />
      </Flex>
    )
  }
}

export default ResumeIntention
