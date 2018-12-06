/**
 * Created by huangchao on 2017/10/10.
 */
import React, {PureComponent} from 'react'
import style from './style.less'
import { NavBar, Tabs, Badge } from 'antd-mobile'
import {connect} from 'react-redux'
import queryString from 'query-string'
import ComInfor from '../../components/ComInfor'
import ShowArticle from '../../components/ShowArticle'
import Connection from '../../components/Connection/'
import RestPosition from '../../components/RestPosition'
import PageScroll from '../../components/PageScroll'
import RegisterWrap from '../../components/RegisterWrap'
import {companydetail, companyList} from '../../actions/company' // emptyInfo
import company from '@static/company@3x.png'
const TabPane = Tabs.TabPane

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
  }

  
  
  nextPost = (job_id, c_userid) => {
    window.zhuge.track('职位详情页打开', { '触发来源': '企业招聘职位' })
    this.props.history.push(`/${c_userid}/${job_id}`)
    this.props.handleSavePageScroll(this.key)
  }

  onChangeTab = (key) => {
    this.key = key
    if (key === '1') {
      window.zhuge.track('企业信息')
    } else if (key === '2') {
      window.zhuge.track('招聘职位')
    }
  }

  whereWillIGo = () => {
    const {sss} = queryString.parse(window.location.search)
    if(sss){
      this.props.history.go(-1)
    } else {
      (this.props.history.length === 2 || this.props.history.length === 1) ? this.props.history.push('/tabs/home') : this.props.history.go(-1)
    }
  }

  handleCloseReg(){
    this.setState({
      showAd: false,
    })
  }  

  goLogin = (key) => {
    window.zhuge.track('登陆后查看')
    const search = this.props.history.location.search ? this.props.history.location.search : '?'
    const pathname = this.props.history.location.pathname
    const url = `/user/register${search}${search === '?' ? '' : '&'}redirect=${pathname}`
    this.props.history.replace(url, {key: '获取联系方式'})
  }

  componentDidMount() {
    const id = this.props.match.params.comapny_id
    this.page = document.getElementById('page')
    const {from} = queryString.parse(window.location.search)
    this.props.dispatch(companydetail({ // 企业详细信息
      company_id: id,
      from: from,
    }))
    this.props.dispatch(companyList({ // 该企业其他职位
      company_id: id,
    })).then(() => { // 复原页面位置
      const pathname =  this.props.location.pathname
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
    const pathname =  this.props.location.pathname
    const pageScroll = this.props.pageScroll[pathname] || {}
    const key = pageScroll['key'] || '1'
    this.key = key
    return (
      <div className={style.CompanyDetailWrap} onScroll={() => this.props.onScroll(this.page)}>
        <NavBar
          mode="dark"
          onLeftClick={() => (this.whereWillIGo())}
        >企业介绍</NavBar>
        <div className={style.connent} id="page">
          <Tabs defaultActiveKey={key} onChange={this.onChangeTab} swipeable={false}>
            <TabPane tab={<Badge>企业信息</Badge>} key="1">
              <ComInfor {...this.props} />
              <ShowArticle type="2" title="公司介绍" src={company} data={data} />
              <Connection {...this.props} goLogin={this.goLogin} />
            </TabPane>
            <TabPane tab={<Badge>招聘职位</Badge>} key="2">
              <RestPosition callback={this.nextPost} noTitle={false}  data={this.props.list} />
            </TabPane>
          </Tabs>
        </div>

        {
          this.state.showAd ? <RegisterWrap onCloseReg={this.handleCloseReg.bind(this)} /> : null
        }
      </div>
    )
  }
}

export default CompanyDetail

