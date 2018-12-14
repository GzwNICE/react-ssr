import React, { Component } from 'react'
import { Tabs, WhiteSpace, Badge } from 'antd-mobile'
import style from '../style.less'

export default class HotTopic extends Component {
  render() {
    const tabs = [
      { title: <Badge>热门职位</Badge> },
      { title: <Badge>热门地区</Badge> },
    ]
    return (
      <div className={style.HotTopic}>
        <Tabs tabs={tabs} initialPage={0}>
          <div className={style.hotJobs}>
            <li>资源部经理</li>
            <li>资源部经理</li>
            <li>资源部经理</li>
            <li>资源部经理</li>
            <li>资源部经理</li>
            <li>资源部经理</li>
            <li>资源部经理</li>
            <li>资源部经理</li>
            <li>资源部经理</li>
            <li>资源部经理</li>
            <li>资源部经理</li>
          </div>
          <div className={style.hotCompanyu}>
            <li>资源部经理资</li>
            <li>资源部资源</li>
            <li>资源部经理</li>
            <li>资源部经理</li>
            <li>资源部经理</li>
            <li>资源部经理</li>
            <li>资源部经理</li>
            <li>资源部经理</li>
            <li>资源部经理</li>
            <li>资源部经理</li>
            <li>资源部经理</li>
          </div>
        </Tabs>
      </div>
    )
  }
}
