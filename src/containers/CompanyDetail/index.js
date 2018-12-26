/**
 * Created by huangchao on 2017/10/10.
 */
import React, { PureComponent } from 'react'
import style from './style.less'
import { Tabs, Badge, Carousel } from 'antd-mobile'
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
import * as Ad from '../../components/Ad'
import { companydetail, companyList } from '../../actions/company' // emptyInfo
import detailLogo from '../../static/detailLogo.png'


// import company from '../../static/company@3x.png'
// const TabPane = Tabs.TabPane

@connect(state => {
  return {
    company: state.company,
    list: state.company.list,
    pageScroll: state.pageScroll,
  }
})
@PageScroll
class CompanyDetail extends PureComponent {
  state = {
    showAd: false,
    show: true,
    data: [
      'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1545392880487&di=eb69663e60461571b78ab9a81fe36688&imgtype=0&src=http%3A%2F%2Fpic2.ooopic.com%2F12%2F58%2F16%2F15bOOOPICae.jpg',
      'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1545987626&di=b1f9e504a7315f100cd6cd971db21d65&imgtype=jpg&er=1&src=http%3A%2F%2Fwx2.sinaimg.cn%2Flarge%2F6edb7b23ly1fllz9xlhqdj20dw0dw75c.jpg',
      'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1545382997404&di=f232cc3c0ef9c7efdd678fa3a0fef30c&imgtype=0&src=http%3A%2F%2Ftupian.qqjay.com%2Fu%2F2017%2F1221%2F4_143339_4.jpg',
    ],
    current: 1,
    album: false,
    searchShow: false, //顶部搜索框默认隐藏
  }

  nextPost = (job_id, c_userid) => {
    window.zhuge.track('职位详情页打开', { 触发来源: '企业招聘职位' })
    this.props.history.push(`/${c_userid}/${job_id}`)
    this.props.handleSavePageScroll(this.key)
  }

  onChangeTab = (key) => {
    let keys = key.title.key
    if (keys === '1') {
      window.zhuge.track('企业信息')
    } else if (keys === '2') {
      window.zhuge.track('在招职位')
    }
  }

  onScroll = page => {
    setTimeout(() => {
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
    const { sss } = queryString.parse(window.location.search)
    if (sss) {
      this.props.history.go(-1)
    } else {
      this.props.history.length === 2 || this.props.history.length === 1
        ? this.props.history.push('/tabs/home')
        : this.props.history.go(-1)
    }
  }

  handleCloseReg() {
    this.setState({
      showAd: true,
    })
  }

  handleChange(i) {
    this.setState({
      current: i + 1,
    })
  }

  goLogin = key => {
    window.zhuge.track('登陆后查看')
    const search = this.props.history.location.search
      ? this.props.history.location.search
      : '?'
    const pathname = this.props.history.location.pathname
    const url = `/user/register${search}${
      search === '?' ? '' : '&'
    }redirect=${pathname}`
    this.props.history.replace(url, { key: '获取联系方式' })
  }

  componentDidMount() {
    const id = this.props.match.params.comapny_id
    this.page = document.getElementById('page')
    const { from } = queryString.parse(window.location.search)
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
    window._hmt && window._hmt.push(['_trackPageview', window.location.href])
  }

  componentWillUnmount() {
    // this.props.dispatch(emptyInfo)
    this.props.handleSavePageScroll(this.key)
  }

  render() {
    const data = this.props.company
    const pathname = this.props.location.pathname
    const pageScroll = this.props.pageScroll[pathname] || {}
    const key = pageScroll['key'] || '1'
    this.key = key
    const { show, current, album, searchShow } = this.state
    const tabs = [
      { title: <Badge key="1">企业信息</Badge> },
      { title: <Badge key="2">在招职位</Badge> },
    ]
    return (
      <div className={style.CompanyDetailWrap}>
        <SearchUser searchShow={searchShow} goBack={this.whereWillIGo} title="公司详情"/>

        <div className={style.DetailWrap} onScroll={this.onScroll} id="page">
          <div className={style.DetailHead}>
            <div className={style.Detaillayout}>
              <div className={style.DetailNaLo}>
                <div>{data.company_name}</div>
                <div className={style.scale}>
                  {data.industry_star ? <span>{data.industry_star}</span> : null}
                  {data.company_size ? <span>{data.company_size}</span> : null}
                  {data.company_nature ? (
                    <span>{data.company_nature}</span>
                  ) : null}
                </div>
              </div>
              <div className={style.DetailScAt}>
                <img
                  src={data.company_logo ? data.company_logo : detailLogo}
                  alt="img"
                />
              </div>
            </div>
            <div className={style.Detailweat}>
              <ul className={style.welfare}>
                {data.label
                  ? data.label.map((item, index) => {
                      return <li key={index}>{item}</li>
                    })
                  : null}
              </ul>
              <div className={style.attention}>关注</div>
            </div>
          </div>
          <div className={style.connent}>
            <Tabs tabs={tabs} initialPage={1} swipeable={false} onChange={this.onChangeTab}>
              <CompanyDuce {...this.props} />
              <div className={style.PostList}>
                <JobList.PostList data={this.props.list} />
              </div>
            </Tabs>
          </div>
        </div>

        {this.state.showAd ? null : (
          <RegisterWrap onCloseReg={this.handleCloseReg.bind(this)} />
        )}

        {album ? (
          <div className={style.albumDetails}>
            <Ad.AdTop show={show} downLoadAd={this.downLoadAd} />
            <Carousel
              autoplay={false}
              dots={false}
              afterChange={this.handleChange.bind(this)}
              className={style.carousel}
            >
              {this.state.data.map(val => (
                <a key={val}>
                  <img
                    src={val}
                    alt=""
                    style={{ width: '100%', verticalAlign: 'top' }}
                  />
                </a>
              ))}
            </Carousel>
            <div className={style.DetailsDots}>
              {current} / {this.state.data.length}
            </div>
          </div>
        ) : null}
      </div>
    )
  }
}

export default withRouter(CompanyDetail)
