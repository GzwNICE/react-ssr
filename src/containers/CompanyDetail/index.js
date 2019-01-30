/**
 * Created by gaozhiwen on 2019/01/13.
 */
import React, { PureComponent } from 'react'
import { Tabs, Badge, Toast } from 'antd-mobile'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import queryString from 'query-string'
import PageScroll from '../../components/PageScroll'
import RegisterWrap from '../../components/RegisterWrap'
import SearchUser from '../../components/SearchBar/SearchUser'
import CompanyDuce from './CompanyDuce'
import { Helmet } from 'react-helmet'
import JobList from '../../components/JobList'
import Album from './PhotoAlbum'
import missing from '../../static/missing.png'
import {
  companydetail,
  companyList,
  companydetailClear,
  saveScrollTop,
} from '../../actions/company' // emptyInfo
import detailLogo from '../../static/detailLogo.png'
import { companyCollect, companyUnCollect } from '../../actions/company'
import style from './style.less'
const triggerFrom = '触发来源'


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
              this.goLogin()
              window.zhuge.track('注册页面打开', { [`${triggerFrom}`]: '关注企业' })
            }
          } else {
            Toast.success('关注成功', 2)
            this.setState({
              attention: '已关注',
            })
            window.zhuge.track('关注企业')
          }
        })
    }
  }

  onScroll = () => {
    let top = this.detailWrap.scrollTop
    this.setScroll = setTimeout(() => {
      if (top > 0) {
        this.setState({
          searchShow: true,
        })
      } else {
        this.setState({
          searchShow: false,
        })
      }
    }, 100)
    this.scrollTop = top
  }

  whereWillIGo = () => {
    const { redirect } = queryString.parse(window.location.search)
    if (redirect) {
      this.props.history.replace(redirect)
    } else {
      this.props.history.replace('/home')
    }
  }

  handleCloseReg() {
    this.setState({
      showRegWrap: false,
    })
  }

  goLogin = () => {
    // const search = this.props.history.location.search
    //   ? this.props.history.location.search
    //   : '?'
    const pathname = this.props.history.location.pathname
    // const url = search
    //   ? `/user/register${search}${search === '?' ? '' : '&'}redirect=${pathname}`
    //   : `/user/register?redirect=${pathname}`
    // this.props.history.replace(url, )
    this.props.history.replace(`/user/register?redirect=${pathname}`, { key: '关注' })
  }

  searchFocus = () => {
    this.props.history.push(`/search?redirect=${this.props.history.location.pathname}`)
  }

  /* 下载或者打开app */
  downLoadAd = () => {
    window.location.href = 'https://m.veryeast.cn/mobile/index?c=mobile'
  }

  componentDidMount() {
    /* 初始化this.scrollTop */
    this.scrollTop = this.props.company.scrollTop
    this.detailWrap.scrollTo(0, this.scrollTop)
    
    const id = this.props.match.params.company_id
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
    this.props.dispatch(saveScrollTop(this.scrollTop))
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
        <Helmet>
          <title>{`${this.props.company.company_name}招聘信息，招工求职信息_最佳东方`}</title>
          <meta
            name="description"
            content={`最佳东方提供全面${this.props.company.company_name}招聘职位信息,${this.props.company.company_name}招工求职信息,帮助您成功入职${this.props.company.company_name},与众多${this.props.company.company_name}精英们一起开启一段崭新的职业生涯。`}
          />
          <meta
            name="keywords"
            content={`${this.props.company.company_name}招聘信息,${this.props.company.company_name}求职信息,${this.props.company.company_name}招工信息`}
          />
        </Helmet>
        <SearchUser
          searchShow={searchShow}
          goBack={this.whereWillIGo}
          title="公司详情"
          searchFocus={this.searchFocus}
          zhugeFrom={1}
        />

        <div className={style.DetailWrap} onScroll={this.onScroll} ref={(el) => { this.detailWrap = el }}>
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
                  <JobList.PostList data={this.props.list}  zhugeFrom="企业详情页-在招职位"/>
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
            zhugeFrom="企业详情页底部推荐注册"
          />
        ) : null}
      </div>
    )
  }
}

export default withRouter(CompanyDetail)
