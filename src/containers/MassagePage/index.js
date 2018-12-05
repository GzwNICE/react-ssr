import React, {PureComponent, Component } from 'react'
import queryString from 'query-string'
import style from './style.less'
import ConnectList from '../ConnectList'
import Visity from '../Visity'
import RecommendList from '../RecommendList'
import { Tabs, Badge } from 'antd-mobile';

class MassagePage extends (PureComponent || Component) {

  state = {
    key: 1,
  }

  handleTabClick = key => {
    this.props.history.replace(`${this.props.match.url}?key=${key}`)

    if(key === '1') {
      console.log('沟通')
      window.zhuge.track('沟通')
    }
    if(key === '2') {
      console.log('推荐职位')
      window.zhuge.track('推荐职位')
    }
    if(key === '3') {
      console.log('谁看过我')
      window.zhuge.track('谁看过我')
    }
  }

  componentWillMount() {
    const parsed = queryString.parse(window.location.search)
    this.setState({
      key: parsed.key || 1,
    })
  }

  render() {
    const {key} = this.state
    const tabs = [
      { title: <Badge>沟通</Badge>, page: '1' },
      { title: <Badge>谁看过我</Badge>, page: '2' },
      { title: <Badge>推荐职位</Badge>, page: '3' },
    ]
    return (
      <div>
        <Tabs
          tabs={tabs}
          initialPage={`${key}`}
          onChange={this.callback}
          onTabClick={this.handleTabClick}
          swipeable={false}
          className={style.tabsCon}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#fff' }}>
            <ConnectList {...this.props} {...this.props.history} />
          </div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#fff' }}>
            <Visity {...this.props} {...this.props.history} />
          </div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#fff' }}>
            <RecommendList />
          </div>
        </Tabs>
      </div>
    )
  }
}

export default MassagePage
