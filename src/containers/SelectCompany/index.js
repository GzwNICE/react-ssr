/**
 * Created by gaozhiwen on 2019/01/13.
 */
import React, { PureComponent } from 'react'
import style from './style.less'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { SwipeAction, ListView } from 'antd-mobile'
import CollectCompanyItemWrap from '../../components/CollectCompanyItem'
import Nothing from '../../components/Nothing'
import {
  getCollectCompantInit,
  deleteCompany,
  saveScrollTop,
  deleteCache,
} from '../../actions/CollectCompany'
const triggerFrom = '触发来源'

@connect(state => {
  return {
    list: state.CollectCompany.list,
    scrollTop: state.CollectCompany.scrollTop,
  }
})
class SelectCompany extends PureComponent {
  constructor(props) {
    super(props)
    const dataSource = new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1 !== row2,
    })
    this.state = {
      dataSource,
    }
  }

  /*返回*/
  goBack = () => {
    this.scrollTop = 0
    this.props.dispatch(deleteCache())
    this.props.history.go(-1)
  }

  /*删除记录*/
  cancleCollect = id => {
    this.props.dispatch(
      deleteCompany({
        company_id: id,
      })
    )
  }

  onScroll = () => {
    let scrollTop = this.refs['page'].listviewRef.scrollProperties.offset
    this.scrollTop = scrollTop
  }

  goPostion = () => {
    window.zhuge.track('企业详情页打开', { [`${triggerFrom}`]: '关注的企业' })
  }

  componentDidMount() {
    /* 初始化this.scrollTop */
    this.scrollTop = this.props.scrollTop
    this.props.dispatch(getCollectCompantInit())
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
            this.refs['page'].scrollTo(0, scrollTop)
          }
        }
      )
    }
  }

  /*组建卸载，存储滚动条的位置*/
  componentWillUnmount() {
    let top = this.scrollTop || this.props.scrollTop
    this.props.dispatch(saveScrollTop(top))
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
              onPress: () => this.cancleCollect(data.company_id),
              style: {
                backgroundColor: '#F4333C',
                color: 'white',
                width: '120px',
              },
            },
          ]}
        >
          <Link to={`/${data.company_id}?redirect=${this.props.history.location.pathname}${this.props.history.location.search}`} onClick={this.goPostion}>
            <CollectCompanyItemWrap {...data} />
          </Link>
        </SwipeAction>
      )
    }
    return (
      <div className={style.SelectCompanyWrap}>
        <div id="page" className={style.listbox} onScroll={this.onScroll}>
          {list.length > 0 ? (
            <ListView
              ref="page"
              dataSource={this.state.dataSource}
              renderRow={Row}
              scrollRenderAheadDistance={100}
              onEndReachedThreshold={10}
              scrollEventThrottle={100}
              initialListSize={0}
              pageSize={2000}
              style={{
                overflow: 'auto',
                height: 'calc(100vh - 0.95rem)',
              }}
              onScroll={this.onScroll}
            />
          ) : (
            <Nothing
              font="关注企业后，第一时间收到企业发布的最新职位，快去关注吧！"
              botton="去关注"
              link="/"
              height="0.95rem"
            />
          )}
        </div>
      </div>
    )
  }
}

export default SelectCompany
