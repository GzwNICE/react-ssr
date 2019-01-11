import React,{PureComponent} from 'react'
import {connect} from 'react-redux'
import {ListView} from 'antd-mobile'
import { Link } from 'react-router-dom'
import VisityCard from '../../components/VisityCard'
import { getVisityList, saveScrollTop } from '../../actions/visity'
import {NothingLokeMeList} from '../../components/NothingTalk'
import style from './style.less'

/*
没有分页，取数据前100条
*/

@connect(state => ({
  visityList:state.visity.list,
  scrollTop: state.visity.scrollTop,
}))
class Visity extends PureComponent {

  constructor(props) {
    super(props)
    const dataSource = new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1 !== row2,
    });
    this.state = {
      dataSource,
    }
  }


  onScroll = () => {
    let scrollTop = this.refs['page'].listviewRef.scrollProperties.offset
    this.scrollTop = scrollTop
  }

  componentDidMount() {
    /* 初始化this.scrollTop */
    this.scrollTop = this.props.scrollTop

    this.props.dispatch(getVisityList()).then(json => {
      if (json.errCode === 2002) {
        // Modal.alert('', '请先登录', [
        //   { text: '稍后', style: 'default' },
        //   { text: '登录', onPress: () => this.props.push('/register?key=2&redirect=' + this.props.history.location.pathname, {key: '消息'}) },
        // ])
      }

    })
  }

  componentWillReceiveProps(nextProps) {
    const scrollTop = nextProps.scrollTop
    if (nextProps.visityList && this.props.visityList !== nextProps.visityList) {
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(nextProps.visityList),
      }, () => {
        if(scrollTop !== 0) {
          this.refs['page'].scrollTo(0,scrollTop)
        }
      })
    }
  }

  /*组建卸载，存储滚动条的位置*/
  componentWillUnmount(){
    this.props.dispatch(saveScrollTop(this.scrollTop))
  }

  render() {
    const Row = (data) => {
      return (
        <Link to={`/${data.c_userid}`}>
          <VisityCard data={data}/>
        </Link>
      )
    }
    const {visityList} = this.props
    return (
      <div className={style.content}>
        {
          visityList.length > 0
          ? <ListView
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
                height: 'calc(100vh - 1.87rem)',
              }}
              onScroll={this.onScroll}
            />
          : <NothingLokeMeList />
        }
      </div>
    )
  }
}

export default Visity
