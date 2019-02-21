import React,{PureComponent} from 'react';
import {connect} from 'react-redux'
import JobCard from '../../components/JobCard'
// import { pipeline } from '../../helper/fetching'
// import { getSearchListInit, getSearchListadd } from '../../actions/search'
import {getPostInit, addPost} from '../../actions/home'
import {saveScrollTop} from '../../actions/massage'
import { ListView } from 'antd-mobile'
import style from './style.less'
import { Link } from 'react-router-dom'
/*
 这里和首页推荐用的是同一套数据
*/

@connect(state => ({
  list: state.home.list,
  refreshing: state.home.refreshing,
  searchData: state.home,
  pager: state.home.pager,
  scrollTop: state.massage.scrollTop,
  userStatus: state.userStatus,
  supers: state.supers,
}))
class RecommendList extends PureComponent {
    constructor(props) {
      super(props)
      const dataSource = new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      });
      this.state = {
        dataSource,
        page: this.props.pager.cur,
        Loaded: 'Loading',
      }
    }

    onEndReached = () => { // 上拉加载
      const page = this.state.page + 1
      const allPages = this.props.pager.allPages
      this.setState({
        page: page,
      })
      if(page <= allPages) {
        this.props.dispatch(addPost({
          page: page,
          size: this.props.pager.size,
          location: this.props.userStatus.code && (this.props.userStatus.code[0] || ''),
        }))
      } else {
        this.setState({
          Loaded: '没有更多了',
        })
      }
    }

  onScroll = () => {
    let scrollTop = this.refs['Page'].listviewRef.scrollProperties.offset
    this.scrollTop = scrollTop
  }
    
    componentDidMount() {

      // pipeline(':ve.my/user/subscribe/index').then(data => {
      //   const id = data.data.data[0].id
      //   return pipeline(`:ve.my/user/api/getSubscribeData?id=${id}`)
      //   console.log(id)
      // }).then(json => {
      //   console.log(json)
      //   this.props.dispatch(getSearchListInit({
      //     ...json.data,
      //     page: 1,
      //   }))
      // }).catch(() => {
      //
      // })

      /* 初始化this.scrollTop */
      this.scrollTop = this.props.scrollTop

      const { userStatus, supers } = this.props
      const location = userStatus.code && userStatus.code.length > 0 ? userStatus.code : supers.location.address.code
      this.props.dispatch(getPostInit({
        page: 1,
        location,
      }))

    }

    componentWillReceiveProps(nextProps) {
      const scrollTop = nextProps.scrollTop
      if (nextProps.list && this.props.list !== nextProps.list) {
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(nextProps.list),
        }, () => {
          if(scrollTop !== 0) {
            if(this.refs['Page']){
              this.refs['Page'].scrollTop=scrollTop
            }
          }
        })
      }
      if(nextProps.list.length < 10) {
        this.setState({
          Loaded: '没有更多了',
        })
      }
    }

    /*组建卸载，存储滚动条的位置*/
    componentWillUnmount() {
      this.props.dispatch(saveScrollTop(this.scrollTop))
    }

    render() {
      const Row = (props) => (
        <div className={style.listItem}>
        <Link to={`/${props.c_userid}/${props.job_id}`}>
          <JobCard data={props} />
        </Link>
      </div>
      )
      return (
        <div className={style.wrap}>
          <ListView
            ref="Page"
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
            onEndReached={this.onEndReached} // 上啦加载
            renderFooter={() => (<div style={{ padding: 10, textAlign: 'center' }}>
              {this.props.isLoading ? 'Loading...' : this.state.Loaded}
            </div>)}
          />
        </div>
      )
    }
}

export default RecommendList;
