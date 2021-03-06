import React, { PureComponent } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { getAllInfo } from '../../actions/resume'
import { edit as languageEdit } from '../../actions/languages'
import { NavBar, Flex, List, Toast } from 'antd-mobile'
import { createForm } from 'rc-form'
import style from './style.less'

import Language from '../../inputs/Language';
import MasterDegree from '../../inputs/MasterDegree';

@connect(state => {
  return {
    option: state.option,
    languages: state.languages.list,
  }
})
@createForm()
@withRouter
class ResumeLanguageEdit extends PureComponent {
  componentDidMount() {
    this.props.dispatch(getAllInfo({
      appchannel: 'web',
    }))
  }

  changeValue() {
    this.props.form.validateFields((err, values) => {
      if (err) return

      if(values.language.length === 0) {
        return Toast.info('请选择语言类型', 2)
      }

      if(values.ability.length === 0) {
        return Toast.info('请选择掌握程度', 2)
      }
      // window.zhuge.track('我的简历', { '模块': '语言能力' })

      this.props.dispatch(languageEdit({
        ...values,
        id: this.props.match.params.id,
      })).then(data => {
        this.props.history.goBack()
      })
    })
  }

  render() {
    const {
      form,
      // option,
      languages=[],
      match,
    } = this.props
    const { getFieldProps } = form
    const item = languages.filter(item => {
      return item.id === match.params.id
    })[0] || {}

    return (
      <Flex direction="column" align="stretch" className={style.root}>
        <NavBar
          mode="dark"
          className={style.nav}
          onLeftClick={() => this.props.history.goBack()}
          rightContent={<span onClick={() => this.changeValue()}>保存</span>}
        >
          语言能力
        </NavBar>
        <Flex.Item className={style.wrap}>
          <List>
            <Language
              {...getFieldProps('language', {
                initialValue: item.language ? [parseInt(item.language, 10)] : [],
              })}
              title="语言"
              extra="请选择"
            >
              <List.Item arrow="horizontal">语言</List.Item>
            </Language>
            <MasterDegree
              {...getFieldProps('ability', {
                initialValue: item.ability ? [parseInt(item.ability, 10)] : [],
              })}
              title="掌握程度"
              extra="请选择"
            >
              <List.Item arrow="horizontal">掌握程度</List.Item>
            </MasterDegree>
          </List>
        </Flex.Item>
      </Flex>
    )
  }
}

export default ResumeLanguageEdit
