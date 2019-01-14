import React, { PureComponent } from 'react'
import style from './style.less'
import {
  NavBar,
  List,
  DatePicker,
  InputItem,
  Toast,
  Modal,
  Icon,
  Tabs,
} from 'antd-mobile'
import { createForm } from 'rc-form'
import queryString from 'query-string'
import moment from 'moment'
import Cookies from 'js-cookie'
import store from 'store'
import Education from '../../inputs/Education'
import Post from '../../inputs/Post'
import Area from '../../inputs/Area'
import Gender from '../../inputs/Gender'
import Industry from '../../inputs/Industry'

import { connect } from 'react-redux'
import { microDone } from '../../actions/microresume'
import Company from '../../components/CompanyJobSearch/companySearch'
import Job from '../../components/CompanyJobSearch/jobSearch'
import JobTime from './compent/jobTime'
import School from '../../components/SchoolSearch'
import Salary from '../../inputs/Salary'

const maxDate = new Date()
const minDate = new Date(maxDate - 99 * 365 * 24 * 60 * 60 * 1000)
const auth = store.get('m:auth') || {}

const tabs = [{ title: '在职' }, { title: '在校' }]
@connect(state => {
  return {
    auth: state.auth,
  }
})
@createForm({
  onValuesChange(props, values) {
    console.log(values)
  },
})
class MicroResume extends PureComponent {
  goLogin = () => {
    const search = this.props.history.location.search
      ? this.props.history.location.search
      : '?'
    const pathname = this.props.history.location.pathname
    const url = `${search}${search === '?' ? '' : '&'}redirect=${pathname}`
    console.log(url)
    Modal.alert('', '请先登录', [
      { text: '稍后', style: 'default' },
      { text: '登录', onPress: () => this.props.history.replace(url) },
    ])
  }

  componentDidMount() {
    setTimeout(() => {
      if (!auth.user_id && !Cookies('ticket')) {
        this.goLogin()
      }
    }, 400)
  }
  changeValue() {}

  render() {
    const { form } = this.props
    const { getFieldProps } = form
    return (
      <div className={style.container}>
        <NavBar
          mode="light"
          className={style.nav}
          icon={<Icon type="left" />}
          onLeftClick={() => this.props.history.goBack()}
          rightContent={
            <span onClick={() => this.changeValue()}>
              <span>保存</span>
            </span>
          }
        >
          完善简历
        </NavBar>
        <p className={style.title}>你期望的工作</p>
        <p className={style.subtitle}>“根据你的期望，给你推荐更合适的职位”</p>
        <Post {...getFieldProps('desired_positions', {})} maxLength={5}>
          <List.Item arrow="horizontal">期望职位</List.Item>
        </Post>
        <Industry
        {...getFieldProps('company_industry', {})}
        maxLength={5}
        type="Industry"
      >
        <List.Item arrow="horizontal">期望行业</List.Item>
      </Industry>
        <Area {...getFieldProps('current_location', {})} maxLength={3}>
          <List.Item arrow="horizontal">期望城市</List.Item>
        </Area>
      
       
        <Salary auto {...getFieldProps('desired_salary', {})}>
          <List.Item arrow="horizontal">期望月薪</List.Item>
        </Salary>
        <div className={style.boderline} />
      </div>
    )
  }
}

export default MicroResume
