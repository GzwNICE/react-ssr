/**
 * Created by huangchao on 2017/9/29.
 */
import React, {PureComponent, Component } from 'react'
import { Link } from 'react-router-dom'
import {connect} from 'react-redux'
import store from 'store'
import JobCard from '../../components/JobCard'
// import MySearchBar from '../../components/SearchBar'
import JobList from '../../components/JobList'
import Search from '../../components/SearchBar/Search'
import queryString from 'query-string'
import * as Ad from '../../components/Ad'
import style from './style.less'
import RegisterWrap from '../../components/RegisterWrap'
import FilterSearch from '../../components/FilterSearch'
import F from '../../helper/tool'
import {getSearchInit, changeQuery, getSearchListadd,saveScrollTop ,saveQuery, deletecache} from '../../actions/jobPage'
import { ListView } from 'antd-mobile'
const option = store.get('m:option')

@connect((state) => ({
  refreshing: state.jobpage.refreshing,
  isLoading: state.jobpage.isLoading,
  searchLIst: state.jobpage.list,
  query: state.jobpage.query,
  pager: state.jobpage.pager,
  jobpageData: state.jobpage,
  userStatus: state.userStatus,
}))
class JobPage extends (PureComponent || Component) {
  constructor(props) {
    super(props)
    const dataSource = new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1 !== row2,
    });
    this.state = {
      init: {
        company_industry: 0,
        education: 0,
        room_board: 0,
        salary: 0,
        scope: 4,
        update_time: -1,
        work_mode: 0,
      },
      show: true,
      stareSearch: false,
      dataSource,
      page: this.props.jobpageData.pager.cur,
      Loaded: 'Loading',
      defaultValue: '请输入职位/公司名',
      select: false,
      showAd:false,
    }
  }

  filterSearch = (value = {}) => {

    //zhuge统计
    let val = ''
    if(value.position){ // 记录职位
      const positions_index = option.positions_index || {}
      value.position.map(item => {
        val += positions_index[item] + ';'
        return null
      })
      // window.zhuge.track('工作筛选项', {'职位': val})
    }
    if(value.area){ // 记录地区
      const areas_index = option.areas_index || {}
      val = areas_index[value.area[0]]
      // window.zhuge.track('工作筛选项', {'地区': val})
    }
    if(value.salary){ // 记录薪资
      const salary_scope_index = (option.opts_salary && option.opts_salary.salary_scope_index) || {}
      val = salary_scope_index[value.salary[0]]
      // window.zhuge.track('工作筛选项', {'薪资': val})
    }
    if(value.more){ // 记录更多
      // window.zhuge.track('工作筛选项', {'更多': 'click'})
    }

    this.props.dispatch(saveQuery(F.filterUndefindToString(value)))
    this.setState({
      page: 1,
    }, () => {
      const allQuery = this.handleSearchQuery()
      // console.log(allQuery)
      this.props.dispatch(getSearchInit(allQuery))
    })
  }

   // 关闭底部引导注册弹框
   handleCloseReg() {
    this.setState({
      showAd: false,
    })
    window.removeEventListener('scroll', this.onScroll, false)
  }

  onScroll = () => {
    // let scrollTop = this.refs['jobPage'].listviewRef.scrollProperties.offset
    // this.scrollTop = scrollTop

    let scroll = window.scrollY
    if (scroll > 360) {
      this.setState({
        showAd: true,
      })
    } else {
      this.setState({
        showAd: false,
      })
    }
  }

  searchFocus = () => {
    this.props.dispatch(deletecache())
    this.props.history.push('/search', {form: 'tab:job'})
  }

  onEndReached = () => { // 上拉加载
    const page = this.state.page + 1
    const searchState = this.props.location.state || {}
    const allPage = this.props.pager.allPage
    this.setState({
      page: page,
    })
    if(page <= allPage) {
      const allQuery = this.handleSearchQuery()
      const params = {
        ...allQuery,
        ...searchState,
        ...this.props.query,
        page: page,
        size: this.props.pager.size,
        area: this.props.query.area || (this.props.userStatus.code && (this.props.userStatus.code[0] || '')),
      }
      this.props.dispatch(getSearchListadd(params))
    } else {
      this.setState({
        Loaded: '没有更多了',
      })
    }
  }
  
  handleSearchQuery = () => {
    const data = this.props.location.state || this.props.history.location.state || {}
    const more = this.props.query && this.props.query.more
    // console.log(data, more)
    const {keyword} = queryString.parse(window.location.search)
    const key = data.keyword || keyword || ''
    // console.log(key)
    const allQuery = {
      ...data,
      ...this.state.init,
      ...this.props.query,
      keyword: key,
      company_industry: data.company_industry || more.company_industry || 0,
      update_time: more.update_time || -1,
      education: more.education || 0,
      room_board: more.room_board || 0,
      work_mode: more.work_mode || 0,
      more: '',
      page: 1,
      size: this.props.pager.size,
      area: this.props.query.area || (this.props.userStatus.code && (this.props.userStatus.code[0] || '')), // 地区编码 用户选择的时候给上
    }
    return allQuery
  }

  componentDidMount() {
    const data = this.props.location.state || {}
    const allQuery = this.handleSearchQuery()
    /* 初始化this.scrollTop */
    this.scrollTop = this.props.jobpageData.scrollTop

    if(data.keyword) {
      this.setState({
        defaultValue: data.keyword,
      })
    }
    this.props.dispatch(getSearchInit(allQuery))
    window.addEventListener('scroll', this.onScroll, false)
  }

   /* 下载或者打开app */
   downLoadAd = () => {
    window.location.href = 'https://m.veryeast.cn/mobile/index?c=mobile'
  }

  componentWillReceiveProps(nextProps) {
    const thisList = this.props.searchLIst
    const nextList = nextProps.searchLIst
    const scrollTop = nextProps.jobpageData.scrollTop

    if (thisList !== nextList) {
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(nextList),
      }, () => {
        if(scrollTop !== 0) {
          this.refs['jobPage'].scrollTo(0,scrollTop)
        }
      })
    }

    if(nextList.length < 20) {
      this.setState({
        Loaded: '没有更多了',
      })
    }

    if(this.props.location.state !== nextProps.location.state){
      const data = nextProps.location.state || {}
      const allQuery = this.handleSearchQuery()
      if(data !== {}){
        this.setState({
          defaultValue: data.keyword || '请输入职位/公司名',
        })
        setTimeout(() => {
          // console.log(allQuery)
          this.props.dispatch(changeQuery(allQuery))
            .then(() => {
              this.refs['jobPage'].scrollTo(0,0)
            })
        },100)
      }
    }
    // this.props.dispatch(nextProps.query)
  }

  /*组建卸载，存储滚动条的位置*/
  componentWillUnmount() {
    this.props.dispatch(saveScrollTop(this.scrollTop))
    window.removeEventListener('scroll', this.onScroll, false)
  }

  render() {
    const query = this.props.query
    const { show, select, showAd } =this.state
    // const Row = (d) => {
      // return <div className={style.listItem} onClick={() => window.zhuge.track('职位详情页打开', { '触发来源': '搜索结果' }) }>
        // <Link to={`/${d.company_id}/${d.job_id}`}>
          // <JobCard data={d} />
        // </Link>
      // </div>
    // }
    return (
      <div className={style.JobPageWrap}>
        <div className={style.top}>
          <Ad.AdTop show={show} downLoadAd={this.downLoadAd} />
          <Search />
          <div className={style.searchCondition}>
            <FilterSearch filterSearch={this.filterSearch} query={query} />
            {select ? <div className={style.haveOptions}>已选项：杭州</div> : null}
          </div>
        </div>
        <div className={style.listBox}>
          <JobList.JobList />
        </div>
        {showAd ? (
          <RegisterWrap
            onCloseReg={this.handleCloseReg.bind(this)}
            location={this.props.history.location.pathname}
          />
        ) : null}
      </div>
    )
  }
}

export default JobPage
