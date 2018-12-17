import React, { PureComponent } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { getAllInfo } from '../../actions/resume'
import { edit as intentionEdit } from '../../actions/intention'
import { NavBar, Flex, List, Checkbox,Toast, Icon } from 'antd-mobile'
import { createForm } from 'rc-form'
import style from '../ResumeInfo/style.less'
import style2 from './style.less'

import Post from '../../inputs/Post'
import Area from '../../inputs/Area'
import WorkMode from '../../inputs/WorkMode'
import Industry from '../../inputs/Industry'
import StarLevel from '../../inputs/StarLevel'
import ArrivalTime from '../../inputs/ArrivalTime'
import Salary from '../../inputs/Salary'
import JobStatus from '../../inputs/JobStatus'

@connect(state => {
  return {
    option: state.option,
    DesiredJob: state.DesiredJob,
    DesiredCompanyTypes: state.DesiredCompanyTypes.list,
    DesiredLocations: state.DesiredLocations.list ? state.DesiredLocations.list.map(item => item.location) : null,
    DesiredPositions: state.DesiredPositions.list ? state.DesiredLocations.list.map(item => item.position) : null,
    resume: state.resume,
  }
})
@createForm()
@withRouter
class ResumeIntention extends PureComponent {
  componentDidMount() {
    this.props.dispatch(getAllInfo({
      version:'5.2.1',
      appchannel: 'web',
    }))
  }

  changeValue() {
    this.props.form.validateFields((err, values) => {
      if (err) return
      // console.log(values)

      if(values.desired_locations.length === 0) {
        return Toast.info('请选择意工作地点', 2)
      }

      if(values.desired_positions.length === 0) {
        return Toast.info('请选择意向职位', 2)
      }

      if(values.company_industry.length === 0) {
        return Toast.info('请选择意向行业', 2)
      }

      // if(values.current_salary[2] === '') {
      //   return Toast.info('请输入目前薪资', 2)
      // }
      window.zhuge.track('我的简历', { '模块': '求职意向' })

      this.props.dispatch(intentionEdit({
        PersonDesiredJob: JSON.stringify({
          // arrival_time: `${values.arrival_time}`,
          // current_salary: `${values.current_salary[2]}`,
          // current_salary_currency: values.current_salary[1],
          // current_salary_is_show: values.current_salary_is_show ? 2 : 1,
          // current_salary_mode: values.current_salary[0],
          // desired_salary: values.desired_salary[2],
          // desired_salary_currency: values.desired_salary[1],
          // desired_salary_is_show: values.desired_salary_is_show ? 2 : 1,
          // desired_salary_mode: values.desired_salary[0],
          // work_mode: `${values.work_mode}`,
        }),
        PersonDesiredCompanyType: JSON.stringify(values.company_industry.map(item => ({
          company_type: item,
          industry: item,
          star: values.star_level[0],
        }))),
        PersonDesiredLocation: JSON.stringify(values.desired_locations),
        PersonDesiredPosition: JSON.stringify(values.desired_positions),
      })).then(data => {
        this.props.history.goBack()
      })
    })
  }

  render() {
    const {
      form,
      // option,
      DesiredJob,
      DesiredCompanyTypes=[],
      DesiredLocations,
      DesiredPositions,
      resume,
    } = this.props
    const { getFieldProps } = form
    console.log(this.props)
    return (
      <Flex direction="column" align="stretch" className={style.root}>
        <NavBar
          mode="light"
          className={style.nav}
          icon={<Icon type="left" />}
          onLeftClick={() => this.props.history.goBack()}
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
            maxLength={5}
          >
            <List.Item arrow="horizontal">意向职位</List.Item>
          </Post>
          <Industry
            {...getFieldProps('company_industry', {
              initialValue: DesiredCompanyTypes.length ? DesiredCompanyTypes.map(item => item.industry) : [],// DesiredCompanyTypes.map(item => ('0' + item.industry).slice(-2) + ('0' + item.company_type).slice(-2)) : [],
            })}
            maxLength={5}
            type="Industry"
          >
            <List.Item arrow="horizontal">意向行业</List.Item>
          </Industry>
          <Area
            {...getFieldProps('desired_locations', {
              initialValue: DesiredLocations,
            })}
            maxLength={5}
          >
            <List.Item arrow="horizontal">意向地点</List.Item>
          </Area>
          <div className={style.noboderline}>
            <Salary
              auto
              {...getFieldProps('desired_salary', {
                initialValue: [DesiredJob.desired_salary_mode, DesiredJob.desired_salary_currency, DesiredJob.desired_salary],
                // {
                //   mode: '1',
                //   currency: '1',
                //   salary: '3',
                // },
              })}
            >
              <List.Item arrow="horizontal">期望月薪</List.Item>
            </Salary>
          </div>

          <List.Item className={style.checkbox}>
            <label>
              <Checkbox
                {...getFieldProps('desired_salary_is_show', {
                  initialValue: DesiredJob.desired_salary_is_show === '2',
                  valuePropName: 'checked',
                })}
              />
              <span>企业查看时显示为面议</span>
            </label>
          </List.Item>
          <WorkMode
            {...getFieldProps('work_mode', {
              initialValue: [parseInt(DesiredJob.work_mode || 0, 10)],
            })}
            title="工作类型"
            extra="请选择"
          >
            <List.Item arrow="horizontal">工作类型</List.Item>
          </WorkMode>

          <JobStatus
            {...getFieldProps('job_status', {
              initialValue: resume.job_status ? [resume.job_status] : [],
            })}
            title="求职状态"
            extra="请选择"
          >
            <List.Item arrow="horizontal">求职状态</List.Item>
          </JobStatus>
        </List>

      </Flex>
    )
  }
}

export default ResumeIntention
