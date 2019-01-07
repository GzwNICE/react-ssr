import React, { Component } from 'react'
import { Tabs, Badge } from 'antd-mobile'
import { withRouter, Link } from 'react-router-dom'
import style from '../style.less'

class HotTopic extends Component {
  render() {
    const { data } = this.props
    let hotPosts = data.hotPosts || [] //热门职位
    let hotCities = data.hotCities || [] //热门地区
    let city = data.city //城市
    const tabs = [
      { title: <Badge>热门职位</Badge> },
      { title: <Badge>热门地区</Badge> },
    ]
    return (
      <div className={style.HotTopic}>
        <Tabs tabs={tabs} initialPage={0}>
          <div className={style.hotJobs}>
            {hotPosts.map((i, n) => {
              return (
                <a href={`${i.url}`} key={n}>
                  {`${city}${i.name}`}
                </a>
              )
            })}
          </div>
          <div className={style.hotCompanyu}>
            {hotCities.map((i, n) => {
              return (
                <a href={`${i.url}`} key={n}>
                  {`${i.name}招聘`}
                </a>
              )
            })}
          </div>
        </Tabs>
      </div>
    )
  }
}

export default withRouter(HotTopic)
