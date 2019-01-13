/**
 * Created by huangchao on 2017/10/12.
 */
import React, { PureComponent } from 'react'
import style from './style.less'
import { SwipeAction, ListView } from 'antd-mobile'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import CollectPostItem from '../../components/CollectPostItem'
import Nothing from '../../components/Nothing'
import {
  getCollectPostInit,
  deletePost,
  saveScrollTop,
  deleteCache,
} from '../../actions/CollectPost'

@connect(state => {
  return {
    list: state.CollectPost.list,
    scrollTop: state.CollectPost.scrollTop,
  }
})
class SelectPost extends PureComponent {
  constructor(props) {
    super(props)
    const dataSource = new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1 !== row2,
    })
    this.state = {
      dataSource,
    }
  }

  /*返回上一页*/
  goBack = () => {
    this.scrollTop = 0
    this.props.dispatch(deleteCache())
    this.props.history.go(-1)
  }

  /*删除记录*/
  cancleCollect = job_id => {
    this.props.dispatch(
      deletePost({
        job_id,
      })
    )
  }

  onScroll = () => {
    let scrollTop = this.refs['page'].listviewRef.scrollProperties.offset
    this.scrollTop = scrollTop
  }

  componentDidMount() {
    this.props.dispatch(getCollectPostInit())
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
              onPress: () => this.cancleCollect(data.job_id),
              style: {
                backgroundColor: '#F4333C',
                color: 'white',
                width: '120px',
              },
            },
          ]}
        >
          <Link to={`/${data.company_id}/${data.job_id}`}>
            <CollectPostItem {...data} />
          </Link>
        </SwipeAction>
      )
    }
    return (
      <div className={style.SelectPostWrap}>
        <div id="page" className={style.listBox} onScroll={this.onScroll}>
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
              font="关注的企业还没有最新发布的职位，先看看别的职位吧！"
              botton="去看看"
              link="/"
              height="0.95rem"
            />
          )}
        </div>
      </div>
    )
  }
}

export default SelectPost
