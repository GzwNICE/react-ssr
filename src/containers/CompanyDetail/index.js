/**
 * Created by huangchao on 2017/10/10.
 */
import React, { PureComponent } from 'react'
import style from './style.less'
import { Tabs, Badge, Carousel, Toast } from 'antd-mobile'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import queryString from 'query-string'
// import ComInfor from '../../components/ComInfor'
// import ShowArticle from '../PositionDetail/ShowArticle'
// import Connection from '../../components/Connection/'
// import RestPosition from '../../components/RestPosition'
import PageScroll from '../../components/PageScroll'
import RegisterWrap from '../../components/RegisterWrap'
import SearchUser from '../../components/SearchBar/SearchUser'
import CompanyDuce from './CompanyDuce'
import JobList from '../../components/JobList'
import Album from './PhotoAlbum'
import missing from '../../static/missing.png'
// import * as Ad from '../../components/Ad'
import {
  companydetail,
  companyList,
  companydetailClear,
} from '../../actions/company' // emptyInfo
import detailLogo from '../../static/detailLogo.png'
import { companyCollect, companyUnCollect } from '../../actions/company'

// import company from '../../static/company@3x.png'
// const TabPane = Tabs.TabPane

@connect(state => {
  return {
    company: state.company,
    album: state.company.album,
    list: state.company.list,
    pageScroll: state.pageScroll,
    is_login: state.userStatus.is_login,
  }
})
@PageScroll
class CompanyDetail extends PureComponent {
  state = {
    showRegWrap: true, //引导注册
    searchShow: false, //顶部搜索框默认隐藏
    albumShow: false, //相册详情
    current: 1, //相册当前页
    show: true, //引导下载框
    attention: '关注', //关注企业
    is_login: '',
  }

  nextPost = (job_id, c_userid) => {
    // window.zhuge.track('职位详情页打开', { 触发来源: '企业招聘职位' })
    this.props.history.push(`/${c_userid}/${job_id}`)
    this.props.handleSavePageScroll(this.key)
  }

  onChangeTab = key => {
    let keys = key.title.key
    if (keys === '1') {
      // window.zhuge.track('企业信息')
    } else if (keys === '2') {
      // window.zhuge.track('在招职位')
    }
  }

  handleChange(i) {
    this.setState({
      current: i + 1,
    })
  }

  handleAttention() {
    const isFollowed = this.props.company.is_followed
    const companyId = this.props.company.company_id
    if (isFollowed === 1) {
      this.props
        .dispatch(
          companyUnCollect({
            company_id: companyId,
          })
        )
        .then(data => {
          Toast.success('取消关注', 2)
          this.setState({
            attention: '关注',
          })
        })
    } else {
      this.props
        .dispatch(
          companyCollect({
            company_id: companyId,
          })
        )
        .then(data => {
          if (data.status === 0) {
            const msg = data.errMsg
            if (msg === '未登陆') {
              return this.goLogin()
            }
            return Toast.info(msg, 2)
          } else {
            Toast.success('关注成功', 2)
            this.setState({
              attention: '已关注',
            })
          }
        })
    }
  }

  onScroll = page => {
    this.setScroll = setTimeout(() => {
      if (this.page.scrollTop > 0) {
        this.setState({
          searchShow: true,
        })
      } else {
        this.setState({
          searchShow: false,
        })
      }
    }, 100)
  }

  whereWillIGo = () => {
    const { pathSearch } = queryString.parse(window.location.search)
    if (pathSearch) {
      this.props.history.go(-1)
    } else {
      this.props.history.length === 2 || this.props.history.length === 1
        ? this.props.history.push('/home')
        : this.props.history.go(-1)
    }
  }

  handleCloseReg() {
    this.setState({
      showRegWrap: false,
    })
  }

  // goLogin = key => {
  //   window.zhuge.track('登陆后查看')
  //   const search = this.props.history.location.search
  //     ? this.props.history.location.search
  //     : '?'
  //   const pathname = this.props.history.location.pathname
  //   const url = `/register${search}${
  //     search === '?' ? '' : '&'
  //   }redirect=${pathname}`
  //   this.props.history.replace(url, { key: '获取联系方式' })
  // }

  goLogin = () => {
    const search = this.props.history.location.search
      ? this.props.history.location.search
      : '?'
    const pathname = this.props.history.location.pathname
    const url = search
      ? `/register${search}${search === '?' ? '' : '&'}redirect=${pathname}`
      : `/register?redirect=${pathname}`
    this.props.history.replace(url, { key: '关注' })
  }

  searchFocus = () => {
    this.props.history.push('/search')
  }

  /* 下载或者打开app */
  downLoadAd = () => {
    window.location.href = 'https://m.veryeast.cn/mobile/index.html?c=mobile'
  }

  componentDidMount() {
    const id = this.props.match.params.company_id
    this.page = document.getElementById('page')
    const { from } = queryString.parse(window.location.search)
    const label = this.props.company.label
    if (label.length === 0) {
      this.props.dispatch(
        companydetail({
          // 企业详细信息
          company_id: id,
          from: from,
        })
      )
      this.props
        .dispatch(
          companyList({
            // 该企业其他职位
            company_id: id,
            appchannel: 'web',
          })
        )
        .then(() => {
          // 复原页面位置
          const pathname = this.props.location.pathname
          const pageScroll = this.props.pageScroll[pathname] || {}
          this.page.scrollTop = pageScroll['page'] || 0
        })
    }

    window._hmt && window._hmt.push(['_trackPageview', window.location.href])
    this.setState({
      is_login: sessionStorage.getItem('is_login')
        ? sessionStorage.getItem('is_login')
        : '',
    })
  }

  componentWillUnmount() {
    this.props.handleSavePageScroll(this.key)
    clearTimeout(this.setScroll)
    this.props.dispatch(companydetailClear())
  }

  render() {
    const data = this.props.company
    const is_followed = data.is_followed
    const pathname = this.props.location.pathname
    const pageScroll = this.props.pageScroll[pathname] || {}
    const key = pageScroll['key'] || '1'
    this.key = key
    const { searchShow, attention, showRegWrap, is_login } = this.state
    const tabs = [
      { title: <Badge key="1">企业信息</Badge> },
      { title: <Badge key="2">在招职位</Badge> },
    ]
    return (
      <div className={style.CompanyDetailWrap}>
        <SearchUser
          searchShow={searchShow}
          goBack={this.whereWillIGo}
          title="公司详情"
          searchFocus={this.searchFocus}
        />

        <div className={style.DetailWrap} onScroll={this.onScroll} id="page">
          <div className={style.DetailHead}>
            <div className={style.Detaillayout}>
              <div className={style.DetailNaLo}>
                <h1 className={style.company_name}>{data.company_name}</h1>
                <div className={style.scale}>
                  {data.industry_star ? (
                    <span>{data.industry_star}</span>
                  ) : null}
                  {data.company_size ? <span>{data.company_size}</span> : null}
                  {data.company_nature ? (
                    <span>{data.company_nature}</span>
                  ) : null}
                </div>
                <div className={style.Detailweat}>
                  <ul className={style.welfare}>
                    {data.label
                      ? data.label.map((item, index) => {
                          return <li key={index}>{item}</li>
                        })
                      : null}
                  </ul>
                </div>
              </div>
              <div className={style.DetailScAt}>
                <img
                  src={data.company_logo ? data.company_logo : detailLogo}
                  alt="img"
                />
                <div
                  className={style.attention}
                  onClick={this.handleAttention.bind(this)}
                >
                  {is_followed === 1 ? '已关注' : attention}
                </div>
              </div>
            </div>
          </div>
          <div className={style.connent}>
            <Tabs
              tabs={tabs}
              initialPage={1}
              swipeable={false}
              onChange={this.onChangeTab}
            >
              <div>
                <CompanyDuce {...this.props} is_login={this.state.is_login} />
                {this.props.album.length === 0 ? null : (
                  <Album album={this.props.album} />
                )}
              </div>
              <div className={style.PostList}>
                {this.props.list.length ? (
                  <JobList.PostList data={this.props.list} />
                ) : (
                  <div className={style.noMore}>
                    <img src={missing} alt="" />
                    <p>暂无职位发布，先关注看看吧~</p>
                  </div>
                )}
              </div>
            </Tabs>
          </div>
        </div>

        {is_login ? null : showRegWrap ? (
          <RegisterWrap
            onCloseReg={this.handleCloseReg.bind(this)}
            location={this.props.history.location.pathname}
          />
        ) : null}
      </div>
    )
  }
}

export default withRouter(CompanyDetail)
