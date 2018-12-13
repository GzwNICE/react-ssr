/**
 * Created by huangchao on 2018/4/13.
 */
import React, { PureComponent } from 'react'
import style from './style.less'
import {connect} from 'react-redux'
import JobCardTwo from '../../components/JobCardTwo'
import Nothing from '../../components/Nothing'
import { SwipeAction,Toast, ListView } from 'antd-mobile'
import {getDeliveryAll, DeletetDelivery, remindHr, saveScrollTop} from '../../actions/DeliveryAll'

@connect((state) => ({
  list: state.DeliveryAll.list,
  scrollTop: state.DeliveryAll.scrollTop,
}))
class DeliveryAll extends PureComponent {

  constructor(props) {
    super(props)
    const dataSource = new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1 !== row2,
    });
    this.state = {
      dataSource,
    }
  }

  cancleCollect = (job_id) => {
    this.props.dispatch(DeletetDelivery({
      job_id,
    }))
  }

  remind = (e, job_id, company_id) => {
    e.stopPropagation()
    console.log('提醒企业' + company_id)
    this.props.dispatch(remindHr({
      company_id,
    })).then(() => {
      Toast.info('提醒成功', 2)
      if (this.state.dataSource._dataBlob) {
        let dataSource = this.state.dataSource
        let arr = dataSource._dataBlob.s1
        let s1 = arr.map((item) => {
          if (item.company_id === company_id && item.job_id === job_id) {
            item.clickable = 2
          }
          return item
        })
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows([]),
        })
        setTimeout(() => {
          this.setState({
            dataSource: this.state.dataSource.cloneWithRows(s1),
          })
        })
      }
    })
  }

  /*去聊天吧*/
  goChat = (e, job_id, company_id) => {
    e.stopPropagation()
    console.log('聊天' + company_id)
    this.props.history.push(`/chat/${company_id}`)
  }

  /*去工作详情页*/
  goPostionDetailpage = (job_id, company_id) => {
    this.props.history.push(`/${company_id}/${job_id}`)
  }

  onScroll = () => {
    let scrollTop = this.refs['allpage'].listviewRef.scrollProperties.offset
    this.scrollTop = scrollTop
  }

  componentDidMount() {
    /* 初始化this.scrollTop */
    this.scrollTop = this.props.scrollTop
    this.props.dispatch(getDeliveryAll({
      type: 1,
    }))
  }

  componentWillReceiveProps(nextProps) {
    const scrollTop = nextProps.scrollTop
    if (nextProps.list && this.props.list !== nextProps.list) {
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(nextProps.list),
      }, () => {
        if(scrollTop !== 0) {
          this.refs['allpage'].scrollTo(0,scrollTop)
        }
      })
    }
  }

  /*组建卸载，存储滚动条的位置*/
  componentWillUnmount() {
    this.props.dispatch(saveScrollTop(this.scrollTop))
  }

  render() {
    const Row = (data) => {
      return (
        <SwipeAction
          autoClose
          right={[
            {
              text: '删除',
              onPress: () => this.cancleCollect(data.job_id),
              style: { backgroundColor: '#F4333C', color: 'white', width: '120px' },
            },
          ]}
        >
          <div onClick={() => this.goPostionDetailpage(data.job_id, data.company_id)}>
            <JobCardTwo remindCallback={this.remind} chartCallback={this.goChat} {...data} />
          </div>
        </SwipeAction>
      )
    }
    return (
      <div className={style.wrap}>
        {
          this.props.list.length > 0 ?
            <ListView
              ref="allpage"
              dataSource={this.state.dataSource}
              renderRow={Row}
              scrollRenderAheadDistance={100}
              onEndReachedThreshold={10}
              scrollEventThrottle={100}
              initialListSize={0}
              pageSize={2000}
              style={{
                overflow: 'auto',
                height: 'calc(100vh - 1.87rem)',
              }}
              onScroll={this.onScroll}
            />
            : <Nothing font="快去投递简历吧，获取更多机会～" />
        }
      </div>
    )
  }
}

export default DeliveryAll
