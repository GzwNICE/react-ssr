import React, { PureComponent } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { getAllInfo } from '../../actions/resume'
import { edit as educationalsEdit } from '../../actions/educationals'
import { NavBar, Flex, List, Checkbox, Toast, Icon, Modal } from 'antd-mobile'
import { createForm } from 'rc-form'
import moment from 'moment'
import style from '../ResumeInfo/style.less'
import style2 from './style.less'

import Education from '../../inputs/Education'
import School from './components/schoolSearch'
import Specialty from './components/specialtySearch'
import { remove as educationalsRemove } from '../../actions/educationals'
import EnterShoolTime from '../../components/Time/enterShoolTime'
import LeaveShoolTime from '../../components/Time/leaveShoolTime'
import BorderBottomLine from '../../components/BorderBottomLine/index2'
import GobackModal from '../../components/GoBackModal/index3'

@connect(state => {
  return {
    option: state.option,
    educationals: state.educationals.list,
  }
})
@createForm()
@withRouter
class ResumeEducationEdit extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      deletModal: false,
      goBackModalVisible: false, // 返回按钮点击时出现的弹框
    }
  }
  componentDidMount() {
    this.props.dispatch(getAllInfo({
      appchannel: 'web',
    }))
  }
  // 所有子组件修改根组件都可以调用这个方法
  setSst = obj => {
    this.setState(obj)
  }
  changeValue() {
    this.props.form.validateFields((err, values) => {
      if (err) return
      console.log(values)
      if (!values.school_cn) {
        return Toast.info('请填写学校', 2)
      }
      if (!values.major_cn) {
        return Toast.info('请填写专业', 2)
      }
      if (!values.degree) {
        return Toast.info('请选择学历', 2)
      }
      if (!values.begin) {
        return Toast.info('请选择入学时间', 2)
      }
      if (!values.end) {
        return Toast.info('请选择毕业时间', 2)
      }
      if (values.begin.valueOf() > values.end.valueOf()) {
        return Toast.info('毕业时间不能小于入学时间', 2)
      }

      // window.zhuge.track('我的简历', { '模块': '教育经历' })
      // overseas 1 有海外经历 ，2是无海外经历
      const parmas = {
        ...values,
        id: this.props.match.params.id,
        is_overseas: values.overseas ? '1' : '2',
        begin_year: moment(values.begin).format('YYYY'),
        begin_month: moment(values.begin).format('MM'),
        end_year:  moment(values.end).format('YYYY'),
        end_month: moment(values.end).format('MM'),
        // detail_cn: '', // values.detail_cn || ''
      }
      console.log(parmas)
      this.props.dispatch(educationalsEdit(parmas)).then(data => {
        if (data.status === 0) {
          return Toast.info(data.errMsg, 2)
        }
        Toast.info('保存成功', 2)
        setTimeout(() => {
          this.props.history.goBack()
        }, 999)
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
  handleDeleteOk = (item) => {
    this.setState({
      deletModal: false,
    })
    this.props.dispatch(educationalsRemove({
      edu_exp_id: item.id,
    })).then(() => {
      this.props.history.goBack()
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
    const { deletModal, goBackModalVisible } = this.state
    const item = educationals.filter(item => {
      return item.id === match.params.id
    })[0] || {}
    console.log(item)
    return (
      <Flex direction="column" align="stretch" className={style.root}>
        <NavBar
          mode="light"
          className={style.nav}
          icon={<Icon type="left" />}
          onLeftClick={() => {
            this.setState({ goBackModalVisible: true })
          }}
          rightContent={<span onClick={() => this.changeValue()}><span>保存</span></span>}
        >
          教育经历
        </NavBar>
        <List>
          <School
            {...getFieldProps('school_cn', {
              initialValue: item.school_cn,
            })}
            extra="请填写"
          >
            <List.Item arrow="horizontal">学校</List.Item>
          </School>
          <BorderBottomLine />
          <Specialty
            {...getFieldProps('major_cn', {
              initialValue: item.major_cn,
            })}
            extra="请填写"
          >
            <List.Item arrow="horizontal">专业</List.Item>
          </Specialty>
          <BorderBottomLine />
            <div className={style2.pad20}>
            <Education
            {...getFieldProps('degree', {
              initialValue: item.degree,
            })}
            title="学历"
            extra="请选择"
          >
            <List.Item arrow="horizontal">学历</List.Item>
          </Education>
            </div>
          
          <BorderBottomLine />

          <EnterShoolTime
          extra="请选择"
          {...getFieldProps('begin', {
            initialValue:
              item.begin_year && item.begin_year !== '0'
                ? `${item.begin_year}-${item.begin_month}`
                : null,
          })}
          title="入学时间"
        />
        <BorderBottomLine/>
        <LeaveShoolTime
          extra="请选择"
          {...getFieldProps('end', {
            initialValue:
              item.end_year && item.end_year !== '0'
                ? `${item.end_year}-${item.end_month}`
                : null,
          })}
          title="毕业时间"
        />

          <List.Item className={`${style.checkbox} ${style2.padbtm}`}>
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
        {
          (educationals.length > 1 && item.id) ? <div className={style.bottom} onClick={this.handleDelete}>
            删除此教育经历
          </div> : null
        }

        <Modal
          visible={deletModal}
          transparent
          maskClosable={false}
          className={style2.modal}
          title="删除此教育经历将无法恢复"
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

export default ResumeEducationEdit
