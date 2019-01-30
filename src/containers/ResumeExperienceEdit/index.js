import React, { PureComponent } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { getAllInfo } from '../../actions/resume'
import {
  edit as workExpsEdit,
  remove as workExpsRemove,
} from '../../actions/work_exps'
import {
  NavBar,
  Icon,
  Flex,
  List,
  InputItem,
  Toast,
  Checkbox,
  Modal,
} from 'antd-mobile'
import { createForm } from 'rc-form'
import moment from 'moment'
import style2 from './style.less'
import style from '../ResumeInfo/style.less'

import Company from './components/companySearch'
import Job from './components/jobSearch'
import CompanyIndustry from '../../inputs/CompanyIndustry'
import TextareaField from '../../inputs/TextareaField'
import StartTime from '../../components/Time/startTime'
import EndTime from '../../components/Time/endTime'
import BorderBottomLine from '../../components/BorderBottomLine/index2'
import GobackModal from '../../components/GoBackModal/index3'
import { Helmet } from 'react-helmet'

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
      visible: false,
      deletModal: false,
      goBackModalVisible: false, // 返回按钮点击时出现的弹框
    }
  }
  componentDidMount() {
    this.props.dispatch(
      getAllInfo({
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
      if (err) return
      // console.log(values)

      if (!values.company_name_cn) {
        return Toast.info('请填写企业名称', 2)
      }

      if (!values.position_cn) {
        return Toast.info('请填写职位名称', 2)
      }

      if (!values.begin) {
        return Toast.info('请选择开始时间', 2)
      }

      if (String(values.end) !== '0') {
        if (values.end === undefined || values.end === null) {
          return Toast.info('请选择结束时间', 2)
        }
        let begin = new Date(moment(values.begin).format('YYYY/M')).valueOf()
        let end = values.end
        if (begin > end) {
          return Toast.info('结束时间不能小于开始时间', 2)
        }
      }

      if (!values.company_industry[0]) {
        return Toast.info('请选择所属行业', 2)
      }

      if (!values.salary) {
        return Toast.info('请填写税前月薪', 2)
      }

      // window.zhuge.track('我的简历', { '模块': '工作经历' })

      const end_year = values.end === 0 ? 0 : moment(values.end).format('YYYY')
      const end_month = values.end === 0 ? 0 : moment(values.end).format('M')

      const parmas = {
        ...values,
        id: this.props.match.params.id,
        begin_year: moment(values.begin).format('YYYY'),
        begin_month: moment(values.begin).format('M'),
        end_year,
        end_month,
        salary_is_show: values.salary_is_show ? '1' : '0',
        job_responsibilities_cn: values.job_responsibilities_cn || '',
        // job_performance_cn: values.job_performance_cn || '',
      }
      // console.log(parmas)
      this.props.dispatch(workExpsEdit(parmas)).then(data => {
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
  handleDeleteOk = item => {
    this.setState({
      deletModal: false,
    })
    this.props
      .dispatch(
        workExpsRemove({
          work_exp_id: item.id,
        })
      )
      .then(() => {
        this.props.history.goBack()
      })
  }

  render() {
    const { form, work_exps = [], match } = this.props
    const { getFieldProps } = form
    const item =
      work_exps.filter(item => {
        return item.id === match.params.id
      })[0] || {}
    const { deletModal, goBackModalVisible } = this.state
    let end_time = null
    // todo 这边字符串0 initialValue 没有传过去
    if (item.end_year === '0' || item.end_year === 0) {
      end_time = 0
    } else if (item.end_year && item.end_year !== undefined) {
      end_time = `${item.end_year}-${item.end_month}`
    }
    const {
      company_name_cn,
      position_cn,
      company_industry,
      job_responsibilities_cn,
    } = this.props.form.getFieldsValue()
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
          工作经历
        </NavBar>
        <List>
          <Company
            {...getFieldProps('company_name_cn', {
              initialValue: item.company_name_cn,
            })}
            extra="请填写"
          >
            <List.Item
              arrow="horizontal"
              className={`${company_name_cn ? style.selectcolor : ''}`}
            >
              企业名称
            </List.Item>
          </Company>
          <BorderBottomLine />

          <Job
            {...getFieldProps('position_cn', {
              initialValue: item.position_cn,
            })}
            extra="请填写"
          >
            <List.Item
              arrow="horizontal"
              className={`${position_cn ? style.selectcolor : ''}`}
            >
              职位名称
            </List.Item>
          </Job>
          <BorderBottomLine />

          <StartTime
            extra="请选择"
            {...getFieldProps('begin', {
              initialValue:
                item.begin_year && item.begin_year !== '0'
                  ? `${item.begin_year}-${item.begin_month}`
                  : null,
            })}
            title="开始时间"
          />
          <BorderBottomLine />
          <EndTime
            extra="请选择"
            {...getFieldProps('end', { initialValue: end_time })}
            title="结束时间"
          />
          <BorderBottomLine style={{ margin: '0 20px' }} />

          <CompanyIndustry
            {...getFieldProps('company_industry', {
              initialValue: [item.company_industry],
            })}
            title="所属行业"
            extra="请选择"
            maxLength={1}
          >
            <List.Item
              arrow="horizontal"
              className={`${
                company_industry && company_industry[0] ? style.selectcolor : ''
              }`}
            >
              所属行业
            </List.Item>
          </CompanyIndustry>
          <BorderBottomLine />

          <div className={style.noboderline}>
            <InputItem
              {...getFieldProps('salary', {
                initialValue: item.salary,
              })}
              clear
              placeholder="请填写"
              type="number"
            >
              税前月薪
            </InputItem>
          </div>

          <List.Item className={style.checkbox}>
            <label>
              <Checkbox
                {...getFieldProps('salary_is_show', {
                  initialValue: item.salary_is_show === '1',
                  valuePropName: 'checked',
                })}
              />
              <span>企业查看时显示为保密</span>
            </label>
          </List.Item>
          <BorderBottomLine />

          <TextareaField
            {...getFieldProps('job_responsibilities_cn', {
              initialValue:
                item.job_responsibilities_cn &&
                item.job_responsibilities_cn !== undefined
                  ? item.job_responsibilities_cn
                  : '',
            })}
            placeholder="90%的HR通过岗位职责了解您的工作能力，完整的岗位职责可增加面试机率，最少输入10个字，最多输入2000个字。"
            extra="选填"
            maxLength={2000}
            count={2000}
          >
            <List.Item
              arrow="horizontal"
              className={`${
                job_responsibilities_cn && job_responsibilities_cn !== undefined
                  ? style.selectcolor
                  : ''
              }`}
            >
              岗位职责
            </List.Item>
          </TextareaField>
        </List>
        {work_exps.length > 1 && item.id ? (
          <div className={style.bottom} onClick={this.handleDelete}>
            删除此工作经历
          </div>
        ) : null}

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
        <GobackModal
          setSet={this.setSst.bind(this)}
          goBackModalVisible={goBackModalVisible}
        />
      </Flex>
    )
  }
}

export default ResumeExperienceEdit
