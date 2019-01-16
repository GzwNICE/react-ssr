import React, { PureComponent } from 'react'
import style from './style.less'
import { NavBar, List, Toast, Modal, Icon } from 'antd-mobile'
import { createForm } from 'rc-form'
// import queryString from 'query-string'
import Cookies from 'js-cookie'
import Post from '../../inputs/Post'
import Area from '../../inputs/Area'
import Industry from '../../inputs/Industry'

import { connect } from 'react-redux'
import { microDone } from '../../actions/microresume'
import Salary from '../../inputs/Salary'
import store from 'store'
import GobackModal from '../../components/GoBackModal/index2'
import BorderBottomLine from '../../components/BorderBottomLine'

const auth = store.get('m:auth') || {}
@connect(state => {
  return {
    microresumeParams: state.microresume.microresumeParams,
  }
})
@createForm({
  onValuesChange(props, values) {
    // console.log(values)
  },
})
class MicroResume extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      goBackModalVisible: false, // 返回按钮点击时出现的弹框
    }
  }

  componentDidMount() {
    setTimeout(() => {
      if (!auth.user_id && !Cookies('ticket')) {
        this.goLogin()
      }
      let arr = Object.keys(this.props.microresumeParams)
      if (arr.length === 0) {
        Toast.info('请先填写简历', 2)
        let search = this.props.history.location.search
        let path = ''
        if (search.indexOf('?redirect=') !== -1) {
          path = search.split('?redirect=')[1]
        }
        this.props.history.push(
          '/resume/micro?redirect=' +
          path
        )
      }
    }, 400)
  }

  goLogin = () => {
    return Modal.alert('', '请先登录', [
      { text: '稍后', style: 'default' },
      { text: '登录', onPress: () => this.props.history.replace('/login?redirect=' + this.props.history.location.pathname) },
    ])
  }
    // 所有子组件修改根组件都可以调用这个方法
    setSst = obj => {
      this.setState(obj)
    }
  changeValue() {
    this.props.form.validateFields((err, values) => {
      if (err) return
      console.log(values)
      if (values.person_desired_position === undefined) {
        return Toast.info('请输入期望职位', 2)
      }
      if (values.person_desired_industry === undefined) {
        return Toast.info('请输入期望行业', 2)
      }
      if (values.person_desired_location === undefined) {
        return Toast.info('请输入期望城市', 2)
      }
      if (values.desired_salary === undefined) {
        return Toast.info('请输入期望月薪', 2)
      }
      const params = {
        ...this.props.microresumeParams,
        ...values,
      }
      this.props
        .dispatch(
          microDone({
            ...params,
            person_desired_industry: '1',
          })
        )
        .then(res => {
          if (res.json && res.json.status) {
            Toast.info(res.json.msg, 2)
            window.zhuge.track('微简历保存成功')
            setTimeout(() => {
              let search = this.props.history.location.search
              let path = ''
              if (search.indexOf('?redirect=') !== -1) {
                path = search.split('?redirect=')[1]
              }
              this.props.history.push(path)
            }, 999)
          } else {
            const msg = res.errMsg
            window.zhuge.track('保存失败', {
              原因: msg,
            })
            window.zhuge.track('微简历页面打开', {
              保存失败: err.errMsg,
            })
            if (msg === '未登陆') {
              return this.goLogin()
            }
            return Toast.info(msg, 2)
          }
        })
        .catch(err => {
          window.zhuge.track('保存失败', {
            原因: err.errMsg,
          })
          window.zhuge.track('微简历页面打开', {
            保存失败: err.errMsg,
          })
          Toast.info(err.errMsg, 2)
        })
    })
  }

  render() {
    const { form } = this.props
    const { getFieldProps } = form
    const { goBackModalVisible } = this.state

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
          完善简历
        </NavBar>
        <p className={style.title}>你期望的工作</p>
        <p className={style.subtitle}>“根据你的期望，给你推荐更合适的职位”</p>
        <Post {...getFieldProps('person_desired_position', {})} maxLength={5}>
          <List.Item arrow="horizontal">期望职位</List.Item>
        </Post>
        <Industry
          {...getFieldProps('person_desired_industry', {})}
          maxLength={5}
          type="Industry"
        >
          <List.Item arrow="horizontal">期望行业</List.Item>
        </Industry>
        <Area {...getFieldProps('person_desired_location', {})} maxLength={3}>
          <List.Item arrow="horizontal">期望城市</List.Item>
        </Area>
        <Salary auto {...getFieldProps('desired_salary', {})}>
          <List.Item arrow="horizontal">期望月薪</List.Item>
        </Salary>
        <BorderBottomLine />
        <GobackModal setSet={this.setSst.bind(this)}
        goBackModalVisible={goBackModalVisible}></GobackModal>
      </div>
    )
  }
}

export default MicroResume
