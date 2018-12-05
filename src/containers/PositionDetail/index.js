/**
 * Created by huangchao on 2017/10/10.
 */
import React, {PureComponent} from 'react'
import { NavBar, Modal } from 'antd-mobile'
import Clipboard from 'clipboard'
import {connect} from 'react-redux'
import style from './style.less'
import queryString from 'query-string'
import ShowArticle from '../../components/ShowArticle'
import RestPosition from '../../components/RestPosition'
import PositionBar from '../../components/PositionBar'
import JobDetailsCard from '../../components/JobDetailsCard'
import HotelEntry from '../../components/HotelEntry'
import PageScroll from '../../components/PageScroll'
import article from '@static/artlcle@3x.png'
import rest from '@static/rest@3x.png'
import share from '@static/share@3x.png'
import {positiondetail, emptyInfo} from '../../actions/position'
import {wxconfig, wx_config, shareToPeople, shareToAll} from '../../actions/auth'

@connect((state) => ({
  position: state.position,
  pageScroll: state.pageScroll,
}))
@PageScroll
class PositionDetail extends PureComponent {

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

  componentDidMount() {
    const href = window.location.href
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

    this.clipboard = Clipboard.isSupported() && new Clipboard(this.refs.share, {
      text: () => `${href}`,
    })
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
  }

  render() {
    const company = this.props.position.company_detail || {}
    const list = this.props.position.list || []
    const data = this.props.position
    return (
      <div className={style.PositionDetailWrap} onScroll={() => this.props.onScroll(this.page)}>
        <NavBar
          mode="dark"
          onLeftClick={() => {this.whereWillIGo()}}
          rightContent={<div onClick={this.share} className={style.share} key="1">
            <img src={share} alt="分享" ref="share" />
          </div>}
        > 职位详情</NavBar>
        <div id="page" className={style.connent}>
          <JobDetailsCard {...this.props} />
          <div>
            <div onClick={() => {this.goCompany(company.company_id)}}>
              <HotelEntry {...this.props} />
            </div>
          </div>
          <ShowArticle type="1" title="职位介绍" src={article} data={data} {...this.props}/>
          <RestPosition callback={this.nextPost} title="其他职位推荐" src={rest} data={list} />
        </div>
        <PositionBar {...this.props} />
      </div>
    )
  }
}

export default PositionDetail
