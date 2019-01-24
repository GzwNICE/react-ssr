import React, { PureComponent } from 'react'
import style from './style.less'
import { connect } from 'react-redux'
import queryString from 'query-string'
import { Tabs, Badge } from 'antd-mobile'
import { deleteCache, readResume} from '../../actions/DeliveryRecord'
import NavBack from '../../components/Back'
import DeliveryAll from '../../components/Delivery/all'
import DeliveryLook from '../../components/Delivery/havelook'
import DeliveryInvite from '../../components/Delivery/invite'
import DeliveryNo from '../../components/Delivery/inappropriate'


@connect(state => ({}))
class DeliveryRecord extends PureComponent {
  state = {
    type: 1,
  }

  goBack = () => {
    this.props.dispatch(deleteCache())
    this.props.history.go(-1)
  }

  handleTabClick = index => {
    this.props.history.replace(`/person/applyRecord?key=${index.page}`)
    this.props.dispatch(readResume({
      type: index.page,
    }))
    // .then(() => {
    //   if(type === '2') {
    //     this.props.dispatch(getDeliveryLook({
    //       type,
    //     }))
    //   }
    //   if(type === '3') {
    //     this.props.dispatch(getDeliveryInterview({
    //       type,
    //     }))
    //   }
    //   if(type === '4') {
    //     this.props.dispatch(getDeliveryInappropriate({
    //       type,
    //     }))
    //   }
    // })
  }

  // 跳转app投递列表
  openApp = () =>{
    window.location.href = 'share2js://app?type=7&enterpriseNum=1&interviewNum=2&notAppropriateNum=3'
    setTimeout(() => {
      window.location.href = 'https://m.veryeast.cn/mobile/index.html?c=mobile'
    }, 2000)
  }

  componentDidMount() {
    const parsed = queryString.parse(window.location.search)
    this.setState({
      key: parsed.key || 1,
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
          initialPage={`${this.state.key}`}
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
        <div className={style.openApp} onClick={this.openApp}>打开APP，可以和HR在线沟通</div>
      </div>
    )
  }
}

export default DeliveryRecord
