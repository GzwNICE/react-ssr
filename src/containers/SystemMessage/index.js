/**
 * Created by huangchao on 2017/11/2.
 */

import React, { PureComponent } from 'react'
import {connect} from 'react-redux'
import style from './style.less'
import Nothing from '../../components/Nothing'
import MessageItem from '../../components/MessageItem'
import { NavBar, ListView } from 'antd-mobile'
import {getSyatemMessageInit, saveScrollTop} from '../../actions/SystemMessage'

@connect(state => {
  return {
    list: state.SystemMessage.list,
    scrollTop: state.SystemMessage.scrollTop,
  }
})
class SystemMessage extends PureComponent {

  constructor(props) {
    super(props)
    const dataSource = new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1 !== row2,
    });
    this.state = {
      dataSource,
    }
  }

  gotMessageDetail = message_id => {
    this.props.history.push(`/person/letter/${message_id}`, {message_id})
  }

  onScroll = () => {
    let scrollTop = this.refs['page'].listviewRef.scrollProperties.offset
    this.scrollTop = scrollTop
  }

  componentDidMount() {
    this.props.dispatch(getSyatemMessageInit())
  }

  componentWillReceiveProps(nextProps) {
    const scrollTop = nextProps.scrollTop
    if (nextProps.list && this.props.list !== nextProps.list) {
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(nextProps.list),
      }, () => {
        if(scrollTop !== 0) {
          if(this.refs['page']){
            this.refs['page'].scrollTo(0,scrollTop)
          }
        }
      })
    }
  }

  /*组建卸载，存储滚动条的位置*/
  componentWillUnmount() {
    let top = this.scrollTop || this.props.scrollTop
    this.props.dispatch(saveScrollTop(top))
  }

  render() {
    const {list} = this.props
    const Row = (data) => {
      return (
        <div onClick={() => this.gotMessageDetail(data.message_id)}>
          <MessageItem {...data} />
        </div>
      )
    }
    return (
      <div className={style.SystemMessageWrap}>
        <NavBar
          mode="dark"
          onLeftClick={() => {this.props.history.go(-1)}}
        >系统消息</NavBar>
        <div id="page" className={style.connent} onScroll={this.onScroll}>
          {
            list.length > 0 ?
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
                  height: 'calc(100vh - 1rem)',
                }}
                onScroll={this.onScroll}
              />
              : <Nothing font="什么都没有~" />
          }
        </div>
      </div>
    )
  }
}

export default SystemMessage
