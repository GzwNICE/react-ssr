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
// import JobFrom from './compent/job'  // todo 不知道为什么 Company Job 这两个写在这个组件里，点击不弹出来
import Company from '../../components/CompanyJobSearch/companySearch'
import Job from '../../components/CompanyJobSearch/jobSearch'
import JobTime from './compent/jobTime'
import School from '../../components/SchoolSearch'

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
  jobRender = () => {
    const { form } = this.props
    const { getFieldProps } = form
    return (
      <div className={style.job}>
        <div className={style.underlineleft} />
        <InputItem
          {...getFieldProps('true_name_cn')}
          clear
          placeholder="请填写"
        >
          姓名
        </InputItem>

        <div className={style.boderline} />
        <Gender
          {...getFieldProps('gender', {
            initialValue: 1,
          })}
        >
          <List.Item>性别</List.Item>
        </Gender>
        <div className={style.boderline} />
        <DatePicker
          {...getFieldProps('work_date', {})}
          mode="month"
          title="参加工作时间"
          extra="请选择"
          format={s => moment(s).format('YYYY.MM')}
          minDate={minDate}
          maxDate={maxDate}
        >
          <List.Item arrow="horizontal">参加工作时间</List.Item>
        </DatePicker>
        <div className={style.boderline} />
        <Company {...getFieldProps('company_name_cn', {})}>
          <List.Item arrow="horizontal">最近所在公司</List.Item>
        </Company>
        <div className={style.boderline} />
        <Job {...getFieldProps('position_cn', {})}>
          <List.Item arrow="horizontal">最佳所任职位</List.Item>
        </Job>
        <div className={style.boderline} />
        <JobTime {...getFieldProps('job_time', {})} />
        <div className={style.boderline} />
        <div className={style.btn}>继续完善，增加面试通过率</div>
      </div>
    )
  }
  shoolRender = () => {
    const { form } = this.props
    const { getFieldProps } = form
    return (
      <div className={style.school}>
        <div className={style.underlineright} />

        <InputItem
          {...getFieldProps('true_name_cn')}
          clear
          placeholder="请填写"
        >
          姓名
        </InputItem>

        <div className={style.boderline} />
        <Gender
          {...getFieldProps('gender', {
            initialValue: 1,
          })}
        >
          <List.Item>性别</List.Item>
        </Gender>
        <div className={style.boderline} />

        <DatePicker
          {...getFieldProps('begin', {})}
          mode="month"
          title="出生日期"
          extra="请选择"
          format={s => moment(s).format('YYYY.MM')}
          minDate={minDate}
          maxDate={maxDate}
        >
          <List.Item arrow="horizontal">出生日期</List.Item>
        </DatePicker>
        <div className={style.boderline} />

        <DatePicker
          {...getFieldProps('begin', {})}
          mode="month"
          title="毕业年份"
          extra="请选择"
          format={s => moment(s).format('YYYY.MM')}
          minDate={minDate}
          maxDate={maxDate}
        >
          <List.Item arrow="horizontal">毕业年份</List.Item>
        </DatePicker>
        <div className={style.boderline} />

        <Education
          {...getFieldProps('degree', {})}
          title="最高学历"
          extra="请选择"
        >
          <List.Item arrow="horizontal">最高学历</List.Item>
        </Education>
        <div className={style.boderline} />

        <School {...getFieldProps('school_cn', {})}>
          <List.Item arrow="horizontal">学校名称</List.Item>
        </School>
        <div className={style.boderline} />
        <div className={style.btn}>继续完善，增加面试通过率</div>
      </div>
    )
  }
  render() {
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
          创建简历
        </NavBar>
        <p className={style.title}>欢迎来到最佳</p>
        <p className={style.subtitle}>“应聘职位前，你需要先创建一份简历”</p>
        <Tabs
          tabs={tabs}
          initialPage={1}
          onChange={(tab, index) => {
            console.log('onChange', index, tab)
          }}
          onTabClick={(tab, index) => {
            console.log('onTabClick', index, tab)
          }}
        >
          {this.jobRender()}
          {this.shoolRender()}
        </Tabs>
      </div>
    )
  }
}

export default MicroResume
