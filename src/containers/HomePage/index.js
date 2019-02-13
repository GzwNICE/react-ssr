import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import style from './style.less'
import Carousels from '../../components/Carousels'
import MySearchBar from '../../components/SearchBar'
import FamousCompany from './FamousCompany'
import HotTrade from './HotTrade'
import { Helmet } from 'react-helmet'
import * as Ad from '../../components/Ad'
import { saveScrollTop } from '../../actions/home'
import { saveCityCode } from '../../actions/userStatus'
import { saveQuery } from '../../actions/jobPage'
import { ListView } from 'antd-mobile'
import RegisterWrap from '../../components/RegisterWrap'

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
    })
    this.initData = []
    this.state = {
      dataSource,
      page: this.props.homeDate.pager.cur,
      Loaded: 'Loading',
      show: false,
      showRegWrap: true, //是否显示引导注册
      is_login: '',
    }
  }

  searchFocus = () => {
    this.props.history.push(`/search?redirect=${this.props.history.location.pathname}`)
  }

  goPosition = d => {
    // window.zhuge.track('职位详情页打开', { 触发来源: '首页推荐列表' })
    this.props.history.push(`/${d.c_userid}/${d.job_id}`)
  }

  // 关闭底部引导注册弹框
  handleCloseReg() {
    this.setState({
      showRegWrap: false,
    })
  }

  onTouchList = (data, name) => {
    // window.zhuge.track(name)
    let area = this.props.userStatus.code
    this.props.history.push('/job', { ...data })
    let more = {
      ...(data.company_industry
        ? { company_industry: parseInt(data.company_industry, 10) }
        : null),
    }
    this.setState({ more })
    this.props.dispatch(
      saveQuery({
        area,
        more,
      })
    )
  }

  onChangeCity = values => {
    /* 放入用户信息的reducer 重新改变props 渲染页面  userStatus*/
    this.props.dispatch(
      saveCityCode({
        code: values.areas,
      })
    )
    this.props.dispatch({
      type: 'JOB_PAGE_CITY_CODE_SET',
      area: values.areas,
    })
    /* 改变工作页面及搜索页面的this.props.query , jobPage*/
    this.props.dispatch(
      saveQuery({
        area: values.areas,
        more: this.state.more,
      })
    )
  }

  /* 关闭广告 */
  onCloseAd = () => {
    sessionStorage.setItem('ad', true)
    // Cookies.set('ad', true)
    this.setState({ show: true })
  }

  /* 下载或者打开app */
  downLoadAd = key => {
    window.location.href = 'share2js://app?type=1'
    setTimeout(() => {
      const triggerFrom = '触发来源'
      if (key === 1) {
        window.zhuge.track('下载APP', { [`${triggerFrom}`]: '首页弹窗' })
        window.location.href = 'https://m.veryeast.cn/mobile/ariadownload?utm_source=h502'
      } else {
        window.zhuge.track('下载APP', { [`${triggerFrom}`]: '首页顶部推荐' })
        window.location.href = 'https://m.veryeast.cn/mobile/ariadownload?utm_source=h501'
      }
    }, 2000)
  }

  /* 记录滚动条的位置 */
  onScroll = () => {
    let top = this.homecentent.scrollTop
    this.scrollTop = top
  }

  componentDidMount() {
    /* 初始化this.scrollTop */
    this.scrollTop = this.props.homeDate.scrollTop
    this.homecentent.scrollTo(0, this.scrollTop)
    // const { userStatus, supers } = this.props
    // const location =
    //   userStatus.code && userStatus.code[0]
    //     ? userStatus.code
    //     : supers.location.address.code
    // const { homeList } = this.props
    // if (homeList.length === 0) {
    //   this.props.dispatch(
    //     getPostInit({
    //       location,
    //       page: 1,
    //     })
    //   )
    // }

    this.setState({
      show: sessionStorage.getItem('ad') ? sessionStorage.getItem('ad') : '',
      is_login: sessionStorage.getItem('is_login')
        ? sessionStorage.getItem('is_login')
        : '',
    })
  }

  componentWillReceiveProps(nextProps) {
    const nextList = nextProps.homeList
    const thisList = this.props.homeList
    const scrollTop = nextProps.homeDate.scrollTop
    if (nextList !== thisList) {
      this.setState(
        {
          dataSource: this.state.dataSource.cloneWithRows(nextList),
        },
        () => {
          if (scrollTop !== 0) {
            this.homecentent.scrollTo(0,scrollTop)
          }
        }
      )
    }
    /* 用户重新选择了城市 */
    // if (
    //   this.props.userStatus.code &&
    //   nextProps.userStatus.code &&
    //   nextProps.userStatus.code[0] !== this.props.userStatus.code[0]
    // ) {
    //   this.props
    //     .dispatch(
    //       changeCity({
    //         page: 1,
    //         location: nextProps.userStatus.code[0] || [],
    //       })
    //     )
    //     .then(() => {
    //       document.body.scrollTop = document.documentElement.scrollTop = 0
    //     })
    // }


    window._hmt && window._hmt.push(['_trackPageview', window.location.href])
  }

  /*组建卸载，存储滚动条的位置*/
  componentWillUnmount() {
    this.props.dispatch(saveScrollTop(this.scrollTop))
  }

  render() {
    const { show, showRegWrap, is_login } = this.state
    return (
      <div className={style.HomePageWrap}>
        <Helmet>
          <title>最佳东方 - 旅游服务业专业的招聘平台</title>
          <meta
            name="description"
            content="最佳东方专为个人提供全面的酒店,餐饮,物业,海外,高尔夫,游轮职位招聘信息，为企业提供校园招聘,猎头,培训,测评和人事外包在内的全方位的人力资源服务，帮助个人求职者与企业搭建最佳的人才招募和人才培养渠道。"
          />
          <meta
            name="keywords"
            content="酒店招聘,餐饮,物业,海外,高尔夫,游轮,招聘会"
          />
        </Helmet>
       
        <div className={style.homehead}>
          <div className={style.searchBar}>
            <Ad.AdTop downLoadAd={() => this.downLoadAd(2)} />
            <MySearchBar
              searchFocus={this.searchFocus}
              onChangeCity={this.onChangeCity}
              showCity="true"
              defaultValue="" // 输入框的默认值
              SearchUser={true}
              searchCarousel="true"
            />
          </div>
        </div>

        <div className={style.homecentent} onScroll={this.onScroll} ref={(el) => { this.homecentent = el }}>
          <Carousels {...this.props} />
          <FamousCompany />
          <HotTrade />
        </div>
        {is_login ? null : showRegWrap ? (
          <RegisterWrap
            onCloseReg={this.handleCloseReg.bind(this)}
            location={this.props.history.location.pathname}
            zhugeFrom="首页底部推荐注册"
          />
        ) : null}
        <Ad.AdWindow
          show={show}
          onCloseAd={this.onCloseAd}
          downLoadAd={() => this.downLoadAd(1)}
        />
      </div>
    )
  }
}

export default withRouter(HomePage)
