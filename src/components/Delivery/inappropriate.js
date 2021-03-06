/**
 * Created by gaozhiwen on 2019/1/17.
 */
import React, { PureComponent } from 'react'
import style from './style.less'
import { connect } from 'react-redux'
import JobCardFour from '../../components/JobCardFour'
import Nothing from '../../components/Nothing'
import { SwipeAction, ListView } from 'antd-mobile'
import {
  getDeliveryNo,
  DeletetDelivery,
  saveScrollTop,
} from '../../actions/DeliveryNo'
const triggerFrom = '触发来源'
@connect(state => ({
  list: state.DeliveryNo.list,
  scrollTop: state.DeliveryNo.scrollTop,
}))
class DeliveryNo extends PureComponent {
  constructor(props) {
    super(props)
    const dataSource = new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1 !== row2,
    })
    this.state = {
      dataSource,
    }
  }

  /*删除记录*/
  cancleCollect = job_id => {
    this.props.dispatch(
      DeletetDelivery({
        job_id,
      })
    )
  }

  /*查看来信，哈哈我又一次被拒绝了。*/
  // goLetter = message_id => {
  //   this.props.history.push(`/person/letter/${message_id}`)
  // }

  /*职位详情页*/
  goPostionDetailpage = (job_id, company_id) => {
    window.zhuge.track('职位详情页打开', { [`${triggerFrom}`]: '投递进展' })
    this.props.history.push(`/${company_id}/${job_id}?redirect=${this.props.history.location.pathname}${this.props.history.location.search}`)
  }

  onScroll = () => {
    let scrollTop = this.refs['rejectpage'].listviewRef.scrollProperties.offset
    this.scrollTop = scrollTop
  }

  componentDidMount() {
    /* 初始化this.scrollTop */
    this.scrollTop = this.props.scrollTop

    this.props.dispatch(
      getDeliveryNo({
        type: 4,
      })
    )
  }

  componentWillReceiveProps(nextProps) {
    const scrollTop = nextProps.scrollTop
    if (nextProps.list && this.props.list !== nextProps.list) {
      this.setState(
        {
          dataSource: this.state.dataSource.cloneWithRows(nextProps.list),
        },
        () => {
          if (scrollTop !== 0) {
            if(this.refs['rejectpage']){
              this.refs['rejectpage'].scrollTop = scrollTop
            }
          }
        }
      )
    }
  }

  /*组建卸载，存储滚动条的位置*/
  componentWillUnmount() {
    this.props.dispatch(saveScrollTop(this.scrollTop))
  }

  render() {
    const { list } = this.props
    const Row = data => {
      return (
        <SwipeAction
          autoClose
          right={[
            {
              text: '删除',
              onPress: () => this.cancleCollect(data.job_id),
              style: {
                backgroundColor: '#F4333C',
                color: 'white',
                width: '120px',
              },
            },
          ]}
        >
          <div onClick={() => this.goPostionDetailpage(data.job_id, data.company_id)}>
            <JobCardFour {...data} />
          </div>
        </SwipeAction>
      )
    }
    return (
      <div className={style.wrap}>
        {list.length > 0 ? (
          <ListView
            ref="rejectpage"
            dataSource={this.state.dataSource}
            renderRow={Row}
            scrollRenderAheadDistance={100}
            onEndReachedThreshold={10}
            scrollEventThrottle={100}
            initialListSize={0}
            pageSize={2000}
            style={{
              overflow: 'auto',
              height: 'calc(100vh - 1.4rem)',
            }}
            onScroll={this.onScroll}
          />
        ) : (
          <Nothing
            font="快去投递简历，获取更多机会"
            title="暂无相关记录"
          />
        )}
      </div>
    )
  }
}

export default DeliveryNo
