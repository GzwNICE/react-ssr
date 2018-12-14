/**
 * Created by huangchao on 2017/10/10.
 */
import React, {PureComponent} from 'react'
import { Modal,SearchBar } from 'antd-mobile'
import Clipboard from 'clipboard'
import {connect} from 'react-redux'
import { Link } from 'react-router-dom'
import style from './style.less'
import queryString from 'query-string'
import ShowArticle from './ShowArticle'
import RestPosition from '../../components/RestPosition'
import PositionBar from '../../components/PositionBar'
import site from '../../static/area@3x.png'
import dim from '../../static/dim.png'
import HotTopic from './HotTopic'
import HotelEntry from './HotelEntry/index'
import PageScroll from '../../components/PageScroll'
import * as Ad from '../../components/Ad'
import area from '../../static/area@3x.png'
import experience from '../../static/experience@3x.png'
import education from '../../static/education@3x.png'
import jobType from '../../static/jobType@3x.png'
import personal from '../../static/headimg@3x.png'
import unHome from '../../static/unHome@3x.png'
import back from '../../static/back.png'
import finish from '../../static/finish.png'
import {positiondetail, emptyInfo} from '../../actions/position'
import {wxconfig, wx_config, shareToPeople, shareToAll} from '../../actions/auth'

@connect((state) => ({
  position: state.position,
  pageScroll: state.pageScroll,
}))
@PageScroll
class PositionDetail extends PureComponent {
  constructor(props) {
    super(props)
    this.state={
      show: true, 
      searchShow: true,  //顶部搜索框默认隐藏
      finishShow: false, //是否停止招聘
    }
  }
  share = () => {
    const shareLink = window.location.href
    // const shareImg = this.props.user.portrait_url
    if (navigator.userAgent.indexOf('UCBrowser') > -1 && window.ucbrowser) { // uc  浏览器
      const shareArgs = ['简历分享', '快来看看我的简历吧', shareLink, '', '', '\n@' + window.location.host, '']
      return window.ucbrowser.web_share(...shareArgs)
    }
    Modal.alert(
      Clipboard.isSupported() ? '链接已经复制到剪贴板' : '长按分享此链接',
      <p style={{wordWrap: 'break-word'}}>{shareLink}</p>, [
        { text: '确定', style: 'default' },
      ])
    window.zhuge.track('分享')
  }

  nextPost = (job_id, c_userid) => {
    window.zhuge.track('其他职位推荐')
    this.props.history.push(`/${c_userid}/${job_id}`)
    this.props.handleSavePageScroll()
  }

  goCompany = (c_userid) => {
    window.zhuge.track('点击公司名')
    window.zhuge.track('公司详情页打开')
    this.props.history.push(`/${c_userid}`)
  }

  shareWeixin = (data) => {
    let info = data.data || {}
    let {job_name, company_name} = info
    let url = window.location.href
    wxconfig(url).then(data => {
      let wechat_config = data.wechat_config
      window.wx.config(wx_config(wechat_config)) // 配置信息
      window.wx.ready(function() {
        window.wx.onMenuShareTimeline(shareToAll(job_name, company_name)) // 分享到朋友圈
        window.wx.onMenuShareAppMessage(shareToPeople(job_name, company_name)) // 分享给朋友
        window.wx.onMenuShareQQ(shareToPeople(job_name, company_name)) // 分享给QQ
        window.wx.onMenuShareQZone(shareToAll(job_name, company_name))// 分享给QQ空间
      })
    })
  }

  whereWillIGo = () => {
    window.zhuge.track('返回')
    const {sss} = queryString.parse(window.location.search)
    if(sss){
      this.props.history.go(-1)
    } else {
      (this.props.history.length === 2 || this.props.history.length === 1) ? this.props.history.push('/tabs/home') : this.props.history.go(-1)
    }
  }

  /* 获取页面卷去高度 */
  onScroll = e => {
    console.log(123)
    let scroll = window.scrollY
    if (scroll > 0) {
      this.setState({
        searchShow: true,
      })
    } else {
      this.setState({
        searchShow: false,
      })
    }
  }

  componentDidMount() {
    // const href = window.location.href
    const jobId = this.props.match.params.job_id
    this.page = document.getElementById('page')
    const {from} = queryString.parse(window.location.search)
    this.props.dispatch(positiondetail({
      job_id: jobId,
      from: from,
    })).then(data => { // 复原页面位置
      const page =  this.props.location.pathname
      const pageScroll = this.props.pageScroll
      this.page.scrollTop = pageScroll[page] || 0
      this.shareWeixin(data)
    })
    window.addEventListener('scroll', this.onScroll, false)
  }

  componentWillReceiveProps(nestprops) {
    let nowpathname = nestprops.location.pathname
    let lastpathname = this.props.location.pathname
    if (nowpathname !== lastpathname) {
      let job_id = nestprops.match.params.job_id
      this.props.dispatch(positiondetail({
        job_id: job_id,
      })).then((data) => { // 复原页面位置
        const pathname =  this.props.location.pathname
        const pageScroll = this.props.pageScroll[pathname] || {}
        this.page.scrollTop = pageScroll['page'] || 0
        this.shareWeixin(data)
      })
    }
  }

  componentWillUnmount() {
    Clipboard.isSupported() && this.clipboard.destroy()
    this.props.dispatch(emptyInfo)
    this.props.handleSavePageScroll()
    window.removeEventListener('scroll', this.onScroll, false)
  }

  render() {
    const company = this.props.position.company_detail || {}
    const list = this.props.position.list || []
    const data = this.props.position
    const { show,searchShow,finishShow } = this.state
    const job_name = data.job_name && data.job_name.replace(/&amp;/g, '&')
    const datalabel = this.props.position.company_detail || {}
    return (
      <div className={style.PositionDetailWrap} onScroll={() => this.props.onScroll(this.page)}>
        <div className={style.PositionHead}>
          <Ad.AdTop show={show} downLoadAd={this.downLoadAd} />
          <div className={style.searchbar}>
            <div className={style.goBack}>
              <img src={back} alt="bank" />
            </div>
            {searchShow ?
              <SearchBar placeholder="搜索职位/品牌" /> : null
            }
            <div className={style.navLink}>
              <Link rel="stylesheet" to={`/tabs/home`}>
                <img src={unHome} alt="img" className={style.searcHome} />
              </Link>
              <Link rel="stylesheet" to={`/tabs/user`}>
                <img src={personal} alt="img" className={style.personal} />
              </Link>
            </div>
          </div>
        </div>

        <div id="page" className={style.connent}>
          <div className={style.jobCard}>
            <div className={style.cardHeader}>
              <div className={style.name}>{job_name}</div>
              <span className={style.salary}>{data.salary}</span>
              {finishShow ?
                (<img src={finish} alt="img" className={style.finish}/>): null
              }
            </div>
            <div className={style.inner}>
              <ul className={style.mustBeCon}>
                <li style={{ background: `url(${area}) no-repeat left center/0.12rem` }}>{data.work_place}</li>
                <li style={{ background: `url(${experience}) no-repeat left center/0.14rem` }}>{data.exp}</li>
                <li style={{ background: `url(${education}) no-repeat left center/0.14rem` }}>{data.education}</li>
                <li style={{ background: `url(${jobType}) no-repeat left center/0.14rem` }}>{data.nature}</li>
              </ul>
            </div>
            <div onClick={() => { this.goCompany(company.company_id) }}>
              <HotelEntry {...this.props} />
            </div>
            <ul className={style.welfare}>
              {(datalabel.label || []).map((data, index) => {
                return <li key={index}>{data}</li>
              })}
            </ul>
            { finishShow ? null : (
              <ShowArticle type="1" title="职位描述" data={data} {...this.props} />
            )}
            { finishShow ? null : (
              <div className={style.workplace}>
                <h4>工作地点</h4>
                <div className={style.site}>
                  <img src={site} alt=""/>
                  <div>浙江省杭州市萧山区皓月路159号诺德财富中心33幢501</div>
                </div>
              </div>
            )}
          </div>
          { finishShow ? null : (
          <div className={style.analyzer}>
            <div className={style.tradeName}>知己知彼分析器</div>
            <div className={style.tradeDes}>目前共有{(<img src={dim} alt=""/>)}位求职者投递了该职位，你的简历匹配度为{(<img src={dim} alt=""/>)}，你的综合竞争力排名为第{(<img src={dim} alt=""/>)}名。</div>
            <div className={style.openApp}>打开APP查看职位竞争力分析</div>
          </div>
          )}
          <RestPosition callback={this.nextPost} title={finishShow ? "为你推荐以下相似职位" : "相似职位推荐"}  data={list} />
          { finishShow ? null :(
            <HotTopic />
          )}
          { finishShow ?(
            <div className={style.guidance}>
              <div className={style.finishApp}>没有你想要的职位？打开APP查看更多</div>
            </div>
          ): null}
        </div>

        <PositionBar {...this.props} />
      </div>
    )
  }
}

export default PositionDetail
