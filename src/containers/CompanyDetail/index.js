/**
 * Created by huangchao on 2017/10/10.
 */
import React, { PureComponent } from 'react'
import style from './style.less'
import { Tabs, Badge, Carousel } from 'antd-mobile'
import { connect } from 'react-redux'
import queryString from 'query-string'
// import ComInfor from '../../components/ComInfor'
// import ShowArticle from '../PositionDetail/ShowArticle'
// import Connection from '../../components/Connection/'
// import RestPosition from '../../components/RestPosition'
import PageScroll from '../../components/PageScroll'
import RegisterWrap from '../../components/RegisterWrap'
import SearchUser from '../../components/SearchBar/SearchUser'
import CompanyDuce from './CompanyDuce'
import * as JobList from '../../components/JobList'
import * as Ad from '../../components/Ad'
import { companydetail, companyList } from '../../actions/company' // emptyInfo

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
    showAd: true,
    show: true,
    // searchShow: false,  //顶部搜索框默认隐藏
    DetailLogo:
      'https://p3-v.veimg.cn/sysimg/20181112/e25e958898be67a11378011f92ef6b4c.jpg',
    data: [
      'https://p3-v.veimg.cn/sysimg/20181214/b56fd776cfaeb37f7b623eec94661ca9.jpg',
      'https://p3-v.veimg.cn/sysimg/20181217/a215c5480e49588795e1c96134b2ddb7.jpg',
      'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1545382997404&di=f232cc3c0ef9c7efdd678fa3a0fef30c&imgtype=0&src=http%3A%2F%2Ftupian.qqjay.com%2Fu%2F2017%2F1221%2F4_143339_4.jpg',
    ],
    current: 1,
    album: false,
  }

  nextPost = (job_id, c_userid) => {
    window.zhuge.track('职位详情页打开', { 触发来源: '企业招聘职位' })
    this.props.history.push(`/${c_userid}/${job_id}`)
    this.props.handleSavePageScroll(this.key)
  }

  onChangeTab = key => {
    // this.key = key
    // if (key === '1') {
    //   window.zhuge.track('企业信息')
    // } else if (key === '2') {
    //   window.zhuge.track('招聘职位')
    // }
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
      showAd: false,
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
    // const data = this.props.company
    const pathname = this.props.location.pathname
    const pageScroll = this.props.pageScroll[pathname] || {}
    const key = pageScroll['key'] || '1'
    this.key = key
    const { DetailLogo, show, current, album } = this.state
    const tabs = [
      { title: <Badge>企业信息</Badge> },
      { title: <Badge>在招职位</Badge> },
    ]
    return (
      <div
        className={style.CompanyDetailWrap}
        onScroll={() => this.props.onScroll(this.page)}
      >
        <SearchUser />

        <div className={style.DetailHead}>
          <div className={style.DetailNaLo}>
            <div>浙江蝶来三舍酒店投资管理浙江蝶来三舍酒店</div>
            <img src={DetailLogo} alt="img" />
          </div>
          <div className={style.DetailScAt}>
            <div className={style.scale}>
              <span>中式餐饮</span>
              <span>150-500人</span>
              <span>私营民营企业</span>
              <span>私营民营企业</span>
              <span>私营民营企业</span>
            </div>
            <div className={style.attention}>关注</div>
          </div>
          <ul className={style.welfare}>
            <li>节日礼物</li>
            <li>技能培训</li>
            <li>岗位晋升</li>
            <li>管理规范</li>
            <li>员工生日礼物</li>
            <li>包吃包住</li>
            <li>五险一金</li>
          </ul>
        </div>

        <div className={style.connent} id="page">
          <Tabs tabs={tabs} initialPage={0} swipeable={false}>
            <CompanyDuce />
            <div className={style.PostList}>
              <JobList.PostList />
            </div>
            
          </Tabs>
        </div>

        {this.state.showAd ? (
          <RegisterWrap onCloseReg={this.handleCloseReg.bind(this)} />
        ) : null}

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

export default CompanyDetail
