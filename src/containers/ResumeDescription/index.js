import React, { PureComponent } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { getAllInfo } from '../../actions/resume'
import { edit as otherExpsEdit } from '../../actions/other_exps'
import { NavBar, Flex, List, TextareaItem,Toast, Icon } from 'antd-mobile'
import { createForm } from 'rc-form'
import style from './style.less'

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
  }
  componentDidMount() {
    this.props.dispatch(
      getAllInfo({
        appchannel: 'web',
      })
    )
  }
  handleValueChange = (value) => {
    this.setState({ value})
  }
  changeValue() {
    this.props.form.validateFields((err, values) => {
      if (err) return
      if(values.content_cn.length === 0) {
        return Toast.info('内容不能为空', 2)
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
    return (
      <Flex direction="column" align="stretch" className={style.root}>
        <NavBar
          mode="light"
          className={style.nav}
          icon={<Icon type="left" />}
          onLeftClick={() => this.props.history.goBack()}
          rightContent={<span onClick={() => this.changeValue()}>保存</span>}
        >
          自我描述
        </NavBar>

        <Flex.Item className={style.wrap}>
          <List>
            <div onselectstart="return false;">
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
      </Flex>
    )
  }
}

export default ResumeDescription
