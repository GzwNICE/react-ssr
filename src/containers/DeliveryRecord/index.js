/**
 * Created by huangchao on 2017/10/12.
 */
import React, { PureComponent } from 'react'
import style from './style.less'
import { connect } from 'react-redux'
import queryString from 'query-string'
import { Tabs, Badge, NavBar } from 'antd-mobile'
import { deleteCache } from '../../actions/DeliveryRecord'
import DeliveryAll from '../../components/Delivery/all'
import DeliveryLook from '../../components/Delivery/havelook'
import DeliveryInvite from '../../components/Delivery/invite'
import DeliveryNo from '../../components/Delivery/inappropriate'
import back from '../../static/back.png'

@connect(state => ({}))
class DeliveryRecord extends PureComponent {
  state = {
    type: 1,
  }

  goBack = () => {
    this.props.dispatch(deleteCache())
    this.props.history.go(-1)
  }

  handleTabClick = type => {
    this.props.history.replace(`/person/applyRecord?key=${type}`)
    // this.props.dispatch(readResume({
    //   type,
    // })).then(() => {
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
        <NavBar
          leftContent={<img src={back} alt="返回" />}
          mode="dark"
          onLeftClick={this.goBack}
        >
          我的投递
        </NavBar>
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
      </div>
    )
  }
}

export default DeliveryRecord
