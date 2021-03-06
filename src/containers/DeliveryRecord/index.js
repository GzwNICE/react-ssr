import React, { PureComponent } from 'react'
import style from './style.less'
import { connect } from 'react-redux'
import queryString from 'query-string'
import { Tabs, Badge } from 'antd-mobile'
import { deleteCache, readResume } from '../../actions/DeliveryRecord'
import NavBack from '../../components/Back'
import DeliveryAll from '../../components/Delivery/all'
import DeliveryLook from '../../components/Delivery/havelook'
import DeliveryInvite from '../../components/Delivery/invite'
import DeliveryNo from '../../components/Delivery/inappropriate'

@connect(state => ({}))
class DeliveryRecord extends PureComponent {
  state = {
    type: 1,
    key: 0,
  }

  goBack = () => {
    this.props.dispatch(deleteCache())
    this.props.history.go(-1)
  }

  handleTabClick = index => {
    console.log(index)
    this.props.history.replace(`/person/applyRecord?key=${index.page}`)
    if(index.page > 1){
      this.props.dispatch(
        readResume({
          type: index.page,
        })
      )
    }
    if (index.page === '1') {
      window.zhuge.track('全部')
    } else if (index.page === '2') {
      window.zhuge.track('被查看')
    } else if (index.page === '3') {
      window.zhuge.track('面试邀约')
    } else if (index.page === '4') {
      window.zhuge.track('不合适')
    }
  }

  // 跳转app投递列表
  openApp = () => {
    const triggerFrom = '触发来源'
    window.zhuge.track('下载APP', {
      [`${triggerFrom}`]: '打开APP，可以和HR在线沟通',
    })
    window.location.href =
      'share2js://app?type=7&enterpriseNum=1&interviewNum=2&notAppropriateNum=3'
    setTimeout(() => {
      window.location.href = 'https://m.veryeast.cn/mobile/ariadownload?utm_source=h511'
    }, 2000)
  }

  componentWillMount(){
    const parsed = queryString.parse(this.props.history.location.search)
    this.setState({
      key: parsed.key-1 || 0,
    })
  }
  

  render() {
    const tabs = [
      { title: <Badge>全部</Badge>, page: '1' },
      { title: <Badge>被查看</Badge>, page: '2' },
      { title: <Badge>面试邀约</Badge>, page: '3' },
      { title: <Badge>不合适</Badge>, page: '4' },
    ]
    return (
      <div className={style.DeliveryRecordWrap}>
        <NavBack title="我的投递" />
        <Tabs
          tabs={tabs}
          className={style.title}
          initialPage={this.state.key}
          onTabClick={this.handleTabClick}
          swipeable={false}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#fff',
            }}
          >
            <DeliveryAll {...this.props} />
          </div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#fff',
            }}
          >
            <DeliveryLook {...this.props} />
          </div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#fff',
            }}
          >
            <DeliveryInvite {...this.props} />
          </div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#fff',
            }}
          >
            <DeliveryNo {...this.props} />
          </div>
        </Tabs>
        <div className={style.openApp} onClick={this.openApp}>
          打开APP，可以和HR在线沟通
        </div>
      </div>
    )
  }
}

export default DeliveryRecord