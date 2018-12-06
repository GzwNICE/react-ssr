import React, {PureComponent } from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import style from './style.less'
import Carousels from '../../components/Carousels'
import MySearchBar from '../../components/SearchBar'
import FamousCompany from '../../components/FamousCompany'
import HotTrade from '../../components/HotTrade'
import HotJobs from '../../components/HotJobs'
import { WhiteSpace } from 'antd-mobile';
import JobCard from '../../components/JobCard'
import * as Ad from '../../components/Ad'
import { getPostInit,changeCity, refReshPost, addPost, saveScrollTop } from '../../actions/home'
import {saveCityCode} from '../../actions/userStatus'
import { saveQuery } from '../../actions/jobPage'
import { ListView } from 'antd-mobile'

/*
关于地点的逻辑梳理
首页和搜索页的地点来着SearchBar组件，引用地点来自定位地点
地点修改逻辑，
<SearchBar 的地点修改会修改super，userStatus， jobPage，search，的reducer的地点>
<jobPage, search 的修改同样会修改super userStatus， jobPage，search，的reducer的地点>
*/

@connect(state => ({
  homeList: state.home.list,
  homeDate: state.home,
  userStatus: state.userStatus,
  supers: state.supers,
}))
class HomePage extends PureComponent {
  static propTypes = {
    history: PropTypes.object,
    homeDate: PropTypes.object,
    homeList: PropTypes.array,
  }
  constructor(props) {
    super(props)
    const dataSource = new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1 !== row2,
    });
    this.initData = []
    this.state = {
      dataSource,
      page: this.props.homeDate.pager.cur,
      Loaded: 'Loading',
      show: false,
    }
  }

  searchFocus = () => {
    this.props.history.push('/search')
  }

  goPosition = (d) => {
    window.zhuge.track('职位详情页打开', { '触发来源': '首页推荐列表' })
    this.props.history.push(`/${d.c_userid}/${d.job_id}`)
  }


  onTouchList = (data, name) => {
    window.zhuge.track(name)
    let area = this.props.userStatus.code
    this.props.history.push('/tabs/job', {...data})
    let more = {
      ...(data.company_industry ? {company_industry: parseInt(data.company_industry, 10)} : null),
    }
    this.setState({more})
    this.props.dispatch(saveQuery({
      area,
      more,
    }))
  }

  onChangeCity = (values) => {
    /* 放入用户信息的reducer 重新改变props 渲染页面  userStatus*/
    this.props.dispatch(saveCityCode({
      code: values.areas,
    }))

    /* 改变工作页面及搜索页面的this.props.query , jobPage*/
    this.props.dispatch(saveQuery({
      area:values.areas,
      more: this.state.more,
    }))
  }

  /* 关闭广告 */
  onCloseAd = () => {
    sessionStorage.setItem('ad', 'yes')
    this.setState({show: true})
  }

  /* 下载或者打开app */
  downLoadAd = () => {
    window.zhuge.track('下载App')
    window.location.href = "https://m.veryeast.cn/mobile/index.html?c=mobile" //"BaiduDsp://activity.veryeast.cn/baidu/mobile/index"
  }

  /* 下拉刷新 */
  onRefresh = () => {
    const location = this.props.userStatus.code && this.props.userStatus.code[0] ? this.props.userStatus.code : this.props.supers.location.address.code
    if(!this.props.homeDate.refreshing) {
      this.setState({
        page: 1,
      })

      this.props.dispatch(refReshPost({
        location,
        page: 1,
      }))
    }
  }

  /* 上拉加载 */
  onEndReached = () => {
    const page = this.state.page + 1
    const allPage = this.props.homeDate.pager.allPages
    this.setState({
      page: page,
    })
    if(page <= allPage) {
      this.props.dispatch(addPost({
        page: page,
        location: this.props.userStatus.code && (this.props.userStatus.code[0] || ''),
      }))
    } else {
      this.setState({
        Loaded: '没有更多了',
      })
    }
  }

  /* 记录滚动条的位置 */
  onScroll = () => {
    let top = document.body.scrollTop || document.documentElement.scrollTop
    this.scrollTop = top
  }

  componentWillMount() {
    /* 初始化this.scrollTop */
    this.scrollTop = this.props.homeDate.scrollTop
    const { userStatus, supers } = this.props
    const location = userStatus.code && userStatus.code[0] ? userStatus.code : supers.location.address.code
    this.props.dispatch(getPostInit({
      location,
      page: 1,
    }))
  }

  componentDidMount() {
    let yes = sessionStorage.getItem('ad') || false
    if(!yes) {
      this.setState({
        show: false,
      })
    } else {
      this.setState({
        show: true,
      })
    }
  }

  componentWillReceiveProps(nextProps) {
    const nextList = nextProps.homeList
    const thisList = this.props.homeList
    const scrollTop = nextProps.homeDate.scrollTop
    if (nextList !== thisList) {
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(nextList),
      }, () => {
        if (scrollTop !== 0) {
          document.body.scrollTop = document.documentElement.scrollTop = scrollTop
        }
      })
    }
    /* 用户重新选择了城市 */
    if (this.props.userStatus.code && nextProps.userStatus.code && (nextProps.userStatus.code[0] !== this.props.userStatus.code[0])) {
      this.props.dispatch(changeCity({
        page: 1,
        location: nextProps.userStatus.code[0] || [],
      })).then(() => {
        document.body.scrollTop = document.documentElement.scrollTop = 0
      })
    }
    window._hmt && window._hmt.push(['_trackPageview', window.location.href])
  }

  /*组建卸载，存储滚动条的位置*/
  componentWillUnmount() {
    this.props.dispatch(saveScrollTop(this.scrollTop))
  }

  render() {
    const {show} = this.state
    const Row = (d) => {
      return <div className={style.listitem}>
        <div onClick={() => this.goPosition(d) }>
          <JobCard data={d} />
        </div>
      </div>
    }
    return (
      <div className={`${style.HomePageWrap} ${show ? style.height200x : ''}`}>
        <Ad.AdWindow
          show={show}
          onCloseAd={this.onCloseAd}
          downLoadAd={this.downLoadAd}
        />
        <div className={style.searchBar}>
          <Ad.AdTop
            show={show}
            downLoadAd={this.downLoadAd}
          />
          <MySearchBar
            searchFocus={this.searchFocus}
            onChangeCity={this.onChangeCity}
            showCity="true"
            defaultValue="" // 输入框的默认值
            placeholder="请输入职位/公司名"
          />
        </div>
        <Carousels {...this.props}/>
        <WhiteSpace size="sm" />
        <FamousCompany />
        <WhiteSpace size="sm" />
        <HotTrade />
        <HotJobs />        
      </div>
    )
  }
}

export default HomePage
