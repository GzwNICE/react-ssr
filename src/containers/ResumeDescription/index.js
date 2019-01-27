import React, { PureComponent } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { getAllInfo } from '../../actions/resume'
import { edit as otherExpsEdit } from '../../actions/other_exps'
import { NavBar, Flex, List, TextareaItem,Toast, Icon } from 'antd-mobile'
import { createForm } from 'rc-form'
import style from './style.less'
import GobackModal from '../../components/GoBackModal/index3'

@connect(state => {
  return {
    list: state.other_exps.list,
  }
})
@createForm()
@withRouter
class ResumeDescription extends PureComponent {
  state = {
    value: 'same--',
    goBackModalVisible: false, // 返回按钮点击时出现的弹框
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
  handleValueChange = (value) => {
    this.setState({ value})
  }
  changeValue() {
    this.props.form.validateFields((err, values) => {
      if (err) return
      if(values.content_cn.length === 0) {
        return Toast.info('请填写自我描述', 2)
      }
      // window.zhuge.track('我的简历', { '模块': '自我描述' })
      this.props
        .dispatch(
          otherExpsEdit({
            ...values,
          })
        )
        .then(data => {
          this.props.history.goBack()
        })
    })
  }

  render() {
    const { form, list } = this.props
    const content_cn= list && list.length>0 && list[0].content_cn
    const { getFieldProps } = form
    const { goBackModalVisible } = this.state
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
          自我描述
        </NavBar>

        <Flex.Item className={style.wrap}>
          <List>
            <div>
              <TextareaItem
                {...getFieldProps('content_cn', {
                  initialValue: content_cn || '',
                })}
                autoHeight
                placeholder={'请简明扼要地描述你的职业优势,让企业HR快速了解你~'}
                rows={10}
                count={2000}
              />
            </div>
          </List>
        </Flex.Item>
        <GobackModal
          setSet={this.setSst.bind(this)}
          goBackModalVisible={goBackModalVisible}
        />
      </Flex>
    )
  }
}

export default ResumeDescription
