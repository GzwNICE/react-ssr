import React, { PureComponent } from 'react'
import { withRouter, Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { getAllInfo } from '../../actions/resume'
import { remove as languagesRemove } from '../../actions/languages'
import { NavBar, Flex, List, SwipeAction, Icon, Tabs } from 'antd-mobile'
import style from './style.less'

const tabs = [
  { title: 'First Tab' },
  { title: 'Second Tab' },
]
@connect(state => {
  return {
    option: state.option,
    languages: state.languages.list,
  }
})
@withRouter
class ResumeInfo extends PureComponent {
  componentDidMount() {
    this.props.dispatch(getAllInfo({
      appchannel: 'web',
    }))
  }

  goTo(id) {
    this.props.history.push(`/resume/language/${id}`)
  }

  removeItem(item) {
    this.props.dispatch(languagesRemove({
      lang_id: item.id,
    }))
  }

  render() {
    const {
      option,
      languages=[],
    } = this.props

    return (
      <Flex direction="column" align="stretch" className={style.root}>
        <NavBar
          mode="light"
          className={style.nav}
          icon={<Icon type="left" />}
          onLeftClick={() => this.props.history.goBack()}
          rightContent={<span onClick={() => this.changeValue()}>保存</span>}>
          语言与技能
        </NavBar>

        <Tabs tabs={tabs}
              initialPage={1}
              onChange={(tab, index) => { console.log('onChange', index, tab); }}
              onTabClick={(tab, index) => { console.log('onTabClick', index, tab); }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '150px', backgroundColor: '#fff' }}>
            Content of first tab
          </div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '150px', backgroundColor: '#fff' }}>
            Content of second tab
          </div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '150px', backgroundColor: '#fff' }}>
            Content of third tab
          </div>
        </Tabs>
      </Flex>
    )
  }
}

export default ResumeInfo
