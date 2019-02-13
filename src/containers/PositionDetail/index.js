/**
 * Created by huangchao on 2017/10/10.
 */
import React, { PureComponent } from 'react'
import { Modal } from 'antd-mobile'
import Clipboard from 'clipboard'
import { connect } from 'react-redux'
import style from './style.less'
import queryString from 'query-string'
import ShowArticle from './ShowArticle'
import RestPosition from '../../components/RestPosition'
import PositionBar from '../../components/PositionBar'
import site from '../../static/area@3x.png'
import dim from '../../static/dim.png'
import { Helmet } from 'react-helmet'
import HotTopic from './HotTopic'
import HotelEntry from './HotelEntry/index'
import PageScroll from '../../components/PageScroll'
import SearchUser from '../../components/SearchBar/SearchUser'
import area from '../../static/area@3x.png'
import experience from '../../static/experience@3x.png'
import education from '../../static/education@3x.png'
import jobType from '../../static/jobType@3x.png'
import finish from '../../static/finish.png'
import { positiondetail, emptyInfo } from '../../actions/position'
import {shareWeixin} from '../../helper/tool'
const triggerFrom = '触发来源'

@connect(state => ({
  position: state.position,
  pageScroll: state.pageScroll,
}))
@PageScroll
class PositionDetail extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      is_favorited: false,
      searchShow: false, //顶部搜索框默认隐藏
    }
  }
  share = () => {
    const shareLink = window.location.href
    // const shareImg = this.props.user.portrait_url
    if (navigator.userAgent.indexOf('UCBrowser') > -1 && window.ucbrowser) {
      // uc  浏览器
      const shareArgs = [
        '简历分享',
        '快来看看我的简历吧',
        shareLink,
        '',
        '',
        '\n@' + window.location.host,
        '',
      ]
      return window.ucbrowser.web_share(...shareArgs)
    }
    Modal.alert(
      Clipboard.isSupported() ? '链接已经复制到剪贴板' : '长按分享此链接',
      <p style={{ wordWrap: 'break-word' }}>{shareLink}</p>,
      [{ text: '确定', style: 'default' }]
    )
    // window.zhuge.track('分享')
  }

  nextPost = (job_id, c_userid) => {
    // window.zhuge.track('其他职位推荐')
    this.props.history.push(`/${c_userid}/${job_id}`)
    this.props.handleSavePageScroll()
  }

  goCompany = c_userid => {
    window.zhuge.track('企业详情页打开', { [`${triggerFrom}`]: '职位详情页' })
    this.props.history.push(
      `/${c_userid}?redirect=${this.props.history.location.pathname}`
    )
  }

  //返回上一页，没有上一页返回到首页
  whereWillIGo = () => {
    // const { pathSearch } = queryString.parse(window.location.search)
    // if (pathSearch) {
    //   this.props.history.go(-1)
    // } else {
    //   this.props.history.length === 2 || this.props.history.length === 1
    //     ? this.props.history.push('/home')
    //     : this.props.history.go(-1)
    // }
    const { redirect } = queryString.parse(window.location.search)
    if (redirect) {
      this.props.history.replace(redirect)
    } else {
      this.props.history.replace('/home')
    }
  }

  /* 获取页面卷去高度显示搜索框 */
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

  // 搜索框点击进入搜索页
  searchFocus = () => {
    this.props.history.push(
      `/search?redirect=${this.props.history.location.pathname}`
    )
  }

  // 跳转到职位详情
  openApp = () => {
    window.zhuge.track('下载APP', {
      [`${triggerFrom}`]: '打开APP查看职位竞争力分析',
    })
    const jobId = this.props.match.params.job_id
    window.location.href = `share2js://app?type=6&job_id=${jobId}`
    setTimeout(() => {
      window.location.href =
        'https://m.veryeast.cn/mobile/ariadownload?utm_source=h507'
    }, 2000)
  }

  // 跳转首页
  openAppHome = () => {
    window.zhuge.track('下载APP', { [`${triggerFrom}`]: '没有想要的职位' })
    window.location.href = 'share2js://app?type=1'
    setTimeout(() => {
      window.location.href =
        'https://m.veryeast.cn/mobile/ariadownload?utm_source=h509'
    }, 2000)
  }

  componentDidMount() {
    // const href = window.location.href
    const companyId = this.props.match.params.company_id
    const jobId = this.props.match.params.job_id
    this.page = document.getElementById('page')
    const { from } = queryString.parse(window.location.search)
    const { job_name } = this.props.position
    if (!job_name) {
      this.props
        .dispatch(
          positiondetail({
            job_id: jobId,
            company_id: companyId,
            from: from,
            appchannel: 'web',
          })
        )
        .then(data => {
          // 复原页面位置
          const page = this.props.location.pathname
          const pageScroll = this.props.pageScroll
          this.page.scrollTop = pageScroll[page] || 0
          shareWeixin(1,data)
        })
    }
  }

  componentWillReceiveProps(nestprops) {
    let nowpathname = nestprops.location.pathname
    let lastpathname = this.props.location.pathname
    if (nowpathname !== lastpathname) {
      let job_id = nestprops.match.params.job_id
      let companyId = this.props.match.params.company_id
      this.props
        .dispatch(
          positiondetail({
            job_id: job_id,
            company_id: companyId,
            appchannel: 'web',
          })
        )
        .then(data => {
          // 复原页面位置
          const pathname = this.props.location.pathname
          const pageScroll = this.props.pageScroll[pathname] || {}
          this.page.scrollTop = pageScroll['page'] || 0
          this.shareWeixin(data)
        })
    }
  }

  componentWillUnmount() {
    // Clipboard.isSupported() && this.clipboard.destroy()
    this.props.dispatch(emptyInfo)
    this.props.handleSavePageScroll()
    clearTimeout(this.setScroll)
  }

  render() {
    const company = this.props.position.company_detail || {}
    const list = this.props.position.list || []
    const data = this.props.position
    const { searchShow } = this.state
    const job_name = data.job_name && data.job_name.replace(/&amp;/g, '&')
    const datalabel = this.props.position.company_detail || {}
    const is_valid = this.props.position.is_valid //职位是否有效
    const hotData = this.props.position.hotData || {}
    return (
      <div className={style.PositionDetailWrap}>
        <Helmet>
          <title>{`招聘${job_name}_${company.company_name}-最佳东方`}</title>
          <meta
            name="description"
            content={`${company.company_name},${job_name}`}
          />
          <meta
            name="keywords"
            content={`${
              company.company_name
            }${job_name}相关的招聘职位信息，帮助求职者早日找到测试职位相关工作`}
          />
        </Helmet>
        <SearchUser
          title="职位详情"
          searchShow={searchShow}
          goBack={this.whereWillIGo}
          searchFocus={this.searchFocus}
          zhugeFrom={2}
        />

        <div id="page" className={style.connent} onScroll={this.onScroll}>
          <div className={style.jobCard}>
            <div className={style.cardHeader}>
              <h1 className={style.name}>{job_name}</h1>
              <span className={style.salary}>{data.salary}</span>
              {is_valid === 0 ? (
                <img src={finish} alt="img" className={style.finish} />
              ) : null}
            </div>
            <div className={style.inner}>
              <ul className={style.mustBeCon}>
                {data.work_place ? (
                  <li
                    style={{
                      background: `url(${area}) no-repeat left center/0.12rem`,
                    }}
                  >
                    {data.work_place}
                  </li>
                ) : null}

                {data.exp ? (
                  <li
                    style={{
                      background: `url(${experience}) no-repeat left center/0.14rem`,
                    }}
                  >
                    {data.exp}
                  </li>
                ) : null}

                {data.education ? (
                  <li
                    style={{
                      background: `url(${education}) no-repeat left center/0.14rem`,
                    }}
                  >
                    {data.education}
                  </li>
                ) : null}

                {data.room_board ? (
                  <li
                    style={{
                      background: `url(${jobType}) no-repeat left center/0.14rem`,
                    }}
                  >
                    {data.room_board}
                  </li>
                ) : null}
              </ul>
            </div>
            <div className={style.companyDet}>
              <div
                onClick={() => {
                  this.goCompany(company.company_id)
                }}
              >
                <HotelEntry {...this.props} />
              </div>
              {JSON.stringify(datalabel.label) === '[]' ? null : (
                <ul className={style.welfare}>
                  {(datalabel.label || []).map((data, index) => {
                    return <li key={index}>{data}</li>
                  })}
                </ul>
              )}
            </div>
            {is_valid === 1 ? (
              <ShowArticle
                type="1"
                title="职位描述"
                data={data}
                {...this.props}
              />
            ) : null}
            {is_valid === 1 ? (
              data.address !== '' ? (
                <div className={style.workplace}>
                  <h4>工作地点</h4>
                  <div className={style.site}>
                    <img src={site} alt="img" />
                    <div>{data.address}</div>
                  </div>
                </div>
              ) : null
            ) : null}
          </div>
          {is_valid === 1 ? (
            <div className={style.analyzer}>
              <div className={style.tradeName}>知己知彼分析器</div>
              <div className={style.tradeDes}>
                目前共有{<img src={dim} alt="" />}
                位求职者投递了该职位，你的简历匹配度为{<img src={dim} alt="" />}
                ，你的综合竞争力排名为第{<img src={dim} alt="" />}名。
              </div>
              <div className={style.openApp} onClick={this.openApp}>
                打开APP查看职位竞争力分析
              </div>
            </div>
          ) : null}

          <RestPosition
            callback={this.nextPost}
            title={is_valid === 0 ? '为你推荐以下相似职位' : '相似职位推荐'}
            data={list}
            history={this.props.history}
          />

          {is_valid === 1 ? <HotTopic data={hotData} /> : null}
          {is_valid === 0 ? (
            <div className={style.guidance}>
              <div className={style.finishApp} onClick={this.openAppHome}>
                没有你想要的职位？打开APP查看更多
              </div>
            </div>
          ) : null}
        </div>
        <PositionBar {...this.props} valid={is_valid} />
      </div>
    )
  }
}

export default PositionDetail
