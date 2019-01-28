/**
 * Created by gaozhiwen on 2019/01/13.
 */
import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import style from './style.less'
import store from 'store'
import { Link } from 'react-router-dom'
import { ListView, Toast } from 'antd-mobile'
import queryString from 'query-string'
import SearchEndBar from '../../components/SearchEndBar'
import JobCard from '../../components/JobCard'
import FilterSearch from '../../components/FilterSearch'
import { withRouter } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import {
  getSearchListInit,
  getSearchListadd,
  saveScrollTop,
  changeQuery,
  saveQuery,
  deleteList,
} from '../../actions/search'
import F from '../../helper/tool'
import vacantIcon from '../../static/vacant@3x.png'
import * as Ad from '../../components/Ad'
import RegisterWrap from '../../components/RegisterWrap'
const option = store.get('m:option')
const triggerPost = '职位'
const triggerFrom = '触发来源'
const tiggerCity = '地区'
const tiggerSalary = '薪资'
const tiggerIndustry = '行业类别'
const tiggerUpdateTime = '发布日期'
const tiggerDegree = '学历要求'
const tiggerBoard = '食宿情况'
const tiggerWorkMode = '职位性质'
const tiggerKeyWord = '搜索词'

@connect(state => {
  return {
    isLoading: state.search.isLoading,
    searchLIst: state.search.list,
    pager: state.search.pager,
    userStatus: state.userStatus,
    query: state.search.query,
    srearchData: state.search,
    supers: state.supers,
    salaryString: state.search.salaryString,
  }
})
@withRouter
class SearchEnd extends PureComponent {
  constructor(props) {
    super(props)
    const dataSource = new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1 !== row2,
    })
    this.initData = []
    this.state = {
      init: {
        company_industry: 0,
        education: 0,
        room_board: 0,
        salary: 0,
        salary_min: 0,
        salary_max: 100000,
        scope: 4,
        update_time: -1,
        work_mode: 0,
        is_login: '',
      },
      stareSearch: false,
      dataSource,
      page: this.props.srearchData.pager.cur,
      Loaded: 'Loading',
      searchCondition: {},
      showSelectP: true, // 显示已选项
      showRegWrap: true, //是否显示引导注册
      initLoading: true, // 页面初始化时loading
      queryMore: {}, // 跳转过来展示的行业 酒店（1）、餐饮（3）、休闲娱乐（4）、康养（养老  8）、房地产（11）
    }
  }
  componentDidMount() {
    // let str = 'search/会计?keyword=会计&areaParms=050100'
    // let arr = str.split('&')
    // console.log(arr)
    const {
      // keyword,
      position,
      area,
      salary,
      company_industry,
      update_time,
      education,
      room_board,
      work_mode,
    } = queryString.parse(this.props.history.location.search)
    this.getQuery = {
      isUsed: 1,
      more: {},
    }

    if (position) this.getQuery.position = [position]
    if (area) this.getQuery.area = [area]
    if (salary) this.getQuery.salary = [parseInt(salary, 10)]
    if (company_industry)
      this.getQuery.more.company_industry = parseInt(company_industry, 10)
    if (update_time) this.getQuery.more.update_time = parseInt(update_time, 10)
    if (education) this.getQuery.more.education = parseInt(education, 10)
    if (room_board) this.getQuery.more.room_board = parseInt(room_board, 10)
    if (work_mode) this.getQuery.more.work_mode = parseInt(work_mode, 10)

    /* 初始化this.scrollTop */
    this.scrollTop = this.props.srearchData.scrollTop

    const data = this.props.location.state || {}
    const { keyword } = queryString.parse(this.props.history.location.search)
    if (keyword) this.getQuery.keyword = keyword
    const allQuery = this.handleSearchQuery()
    if (data.keyword || keyword) {
      this.setState({
        defaultValue: data.keyword || keyword,
      })
    }
    Toast.loading('Loading...')
    if (this.props.searchLIst.length < 1) {
      this.props.dispatch(getSearchListInit(allQuery)).then(res => {
        Toast.hide()
        this.setState({
          initLoading: false,
        })
        if (res.data.count === 0) {
          window.zhuge.track('搜索无结果', {
            [`${tiggerKeyWord}`]: allQuery.keyword,
          })
        }
      })
    }
    
    this.setQueryMore(keyword)
    delete this.getQuery.keyword
    delete this.getQuery.isUsed
    /*
     如果more没有值 删除this.getQuery.more这个字段
     防止在reducer中没有选择更多的时候出现more={}会覆盖原有的字段
     */
    if (Object.keys(this.getQuery.more).length === 0) {
      delete this.getQuery.more
    }
    this.props.dispatch(saveQuery(F.filterUndefindToString(this.getQuery)))
    this.timer = setTimeout(() => {
      this.setState({
        showSelectP: false,
      })
    }, 2500)
    this.setState({
      is_login: sessionStorage.getItem('is_login')
        ? sessionStorage.getItem('is_login')
        : '',
    })
  }
  // 从首页点击 酒店（1）、餐饮（3）、休闲娱乐（4）、康养（养老  8）、房地产（11）这几个时在筛选上有选项
  setQueryMore = keyword => {
    let select = ''
    switch (keyword) {
      case '酒店':
        select = 1
        break
      case '餐饮':
        select = 3
        break
      case '休闲娱乐':
        select = 4
        break
      case '康养':
        select = 8
        break
      case '房地产':
        select = 11
        break
      default:
    }
    if (select) {
      const obj = {
      company_industry: select,
      }
      this.setState({
        queryMore: obj,
      })
    }
  }
  goBack = () => {
    const { redirect } = queryString.parse(this.props.history.location.search)
    this.props.dispatch(deleteList())

    if (redirect) {
      // window.location.href = redirect
      this.props.history.push(redirect)
    }
    this.scrollTop = 0
    // this.props.history.replace('/search')
    this.props.history.goBack()
  }

  goSerch = () => {
    this.props.history.push(`/search`)
    // const { redirect, sss } = queryString.parse(
    //   this.props.history.location.search
    // )
    // this.props.dispatch(deleteList())
    // console.log(redirect)
    // console.log(sss)

    // if (redirect) {
    //   this.props.history.push(redirect)
    // }
    // if (
    //   this.props.history.length === 2 ||
    //   this.props.history.length === 1 ||
    //   sss
    // ) {
    //   this.props.history.push(`/search?sss=${sss}`)
    // } else {
    //   this.scrollTop = 0
    //   this.props.history.go(-1)
    // }
  }

  goPosition = () => {
    window.zhuge.track('职位详情页打开', {
      [`${triggerFrom}`]: '搜索职位列表页',
    })
  }

  onEndReached = () => {
    // 上拉加载
    const page = this.state.page + 1
    // const searchState = this.props.location.state
    const allPage = this.props.pager.allPage
    this.setState({
      page: page,
    })
    if (page <= allPage) {
      const allQuery = this.handleSearchQuery()
      const params = {
        ...allQuery,
        page: page,
        size: this.props.pager.size,
        area:
          this.props.query.area ||
          (this.props.userStatus.code && (this.props.userStatus.code[0] || '')),
        ...this.state.searchCondition,
      }
      this.props.dispatch(getSearchListadd(params))
    } else {
      this.setState({
        Loaded: '没有更多了',
      })
    }
  }

  showCount = () => {
    const count = this.props.pager.count || 0
    return count > 10000 ? '10000+' : count
  }

  filterSearch = (value = {}) => {
    //zhuge统计
    let val = ''
    if (value.position) {
      // 记录职位
      const positions_index = option.positions_index || {}
      value.position.map(item => {
        val += positions_index[item] + ';'
        return null
      })
      // console.log(value.position)
      window.zhuge.track('搜索无结果', { [`${triggerPost}`]: val })
    }
    if (value.area) {
      // 城市选择
      const areas_index = option.areas_index || {}
      val = areas_index[value.area[0]]
      window.zhuge.track('城市筛选', { [`${tiggerCity}`]: val })
    }
    if (value.salary) {
      // 薪资
      window.zhuge.track('薪资筛选', {
        [`${tiggerSalary}`]: `${value.salary[0]}-${value.salary[1]}`,
      })
    }
    if (value.more) {
      // 筛选
      // 行业类别
      const industry_index =
        (option.opts_company_industry_all &&
          option.opts_company_industry_all_index) ||
        {}
      const industry = industry_index[value.more.company_industry] || ''
      // 发布日期
      const update_time_index =
        (option.opts_update_time && option.opts_update_time_index) || {}
      const update_time = update_time_index[value.more.update_time] || ''
      // 学历要求
      const degree_level =
        (option.opts_search_degree && option.opts_education_index) || {}
      const degree = degree_level[value.more.education] || ''
      // 食宿情况
      const room_board =
        (option.opts_room_board && option.opts_room_board_index) || {}
      const board = room_board[value.more.room_board] || ''
      // 企业性质
      const work_mode_index =
        (option.opts_search_work_mode && option.opts_work_mode_index) || {}
      const work_mode = work_mode_index[value.more.work_mode] || ''

      if (industry) {
        window.zhuge.track('更多筛选', { [`${tiggerIndustry}`]: industry })
      }
      if (update_time) {
        window.zhuge.track('更多筛选', { [`${tiggerUpdateTime}`]: update_time })
      }
      if (degree) {
        window.zhuge.track('更多筛选', { [`${tiggerDegree}`]: degree })
      }
      if (board) {
        window.zhuge.track('更多筛选', { [`${tiggerBoard}`]: board })
      }
      if (work_mode) {
        window.zhuge.track('更多筛选', { [`${tiggerWorkMode}`]: work_mode })
      }
    }

    this.props.dispatch({
      type: 'SEARCH_SALARYSHOW',
      payload: false,
    })
    this.props.dispatch(saveQuery(F.filterUndefindToString(value)))
    this.setState(
      {
        page: 1,
      },
      () => {
        const allQuery = this.handleSearchQuery()
        this.props.dispatch(getSearchListInit(allQuery))
      }
    )
    this.getQuery.isUsed = 0
  }

  onScroll = () => {
    let top = document.body.scrollTop || document.documentElement.scrollTop
    this.scrollTop = top
  }

  handleSearchQuery = () => {
    const data = this.props.location.state || {}
    const more = this.props.query && this.props.query.more
    const salary_min =
      this.props.query && this.props.query.salary
        ? this.props.query.salary[0]
        : 0
    const salary_max =
      this.props.query && this.props.query.salary
        ? this.props.query.salary[1]
        : 100000
    const { keyword } = queryString.parse(this.props.history.location.search)
    const key = data.keyword || keyword || ''
    const code =
      this.props.userStatus.code && this.props.userStatus.code.length > 0
        ? this.props.userStatus.code
        : this.props.supers.location.address.code
    let allQuery = {
      ...data,
      ...this.state.init,
      ...this.props.query,
      keyword: key,
      company_industry: more.company_industry || 0,
      update_time: more.update_time || -1,
      education: more.education || 0,
      room_board: more.room_board || 0,
      work_mode: more.work_mode || 0,
      more: '',
      page: 1,
      salary_min,
      salary_max,
      size: this.props.pager.size,
      area:
        this.props.query.area ||
        (this.props.userStatus.code && (this.props.userStatus.code[0] || '')) ||
        code ||
        this.getQuery.area,
    }
    if (this.getQuery.isUsed) {
      allQuery = {
        ...allQuery,
        ...this.getQuery,
        ...(this.getQuery.more ? this.getQuery.more : null),
        more: '',
      }
    }

    //this.props.dispatch(getSearchListInit(allQuery))
    return allQuery
  }
  noVacancies = query => {
    // 记录地区
    const areas_index = option && option.areas_index ? option.areas_index : {}
    const areaVal = areas_index[query.area[0]]
    const more = query.more ? query.more : {}
    let company_industry
    if (more.company_industry) {
      company_industry = `-${
        option.opts_company_industry_all_index[more.company_industry]
      }`
    }
    const defaultValue = this.state.defaultValue
      ? `-${this.state.defaultValue}`
      : null
    let salary = this.props.salaryString ? `-${this.props.salaryString}` : null

    if (salary && salary.indexOf('不限') !== -1) {
      salary = null
    }

    let ellipsis
    for (let key in more) {
      if (key !== 'company_industry') {
        ellipsis = '等'
      }
    }
    const { initLoading } = this.state
    if (initLoading) {
      return null
    } else {
      return (
        <div className={style.vacant}>
          <img src={vacantIcon} />
          <p>
            【{areaVal}
            {company_industry}
            {defaultValue}
            {salary}
            {ellipsis}】
          </p>
          <p>暂无职位，可以切换条件试试哦~</p>
        </div>
      )
    }
  }
  selectProjectRender = query => {
    const areas_index = option && option.areas_index ? option.areas_index : {}
    const areaVal = areas_index[query.area[0]]
    // const more = query.more ? query.more : {}
    // let company_industry
    // if (more.company_industry) {
    //   company_industry =
    //     option.opts_company_industry_all_index[more.company_industry]
    // }

    const { keyword } = queryString.parse(this.props.history.location.search)
    const arr = ['酒店', '餐饮', '休闲娱乐', '康养', '房地产']
    let showKeyword = ''
    arr.forEach(item => {
      if (item === keyword) {
        showKeyword = keyword
      }
    })
    if (showKeyword === '康养') {
      showKeyword = '养老'
    }
    let symbol = areaVal && showKeyword ? '、' : null

    return (
      <div className={style.selectproject}>
        已选项： {areaVal}
        {symbol}
        {showKeyword}
      </div>
    )
  }

  /* 下载或者打开app */
  downLoadAd = () => {
    const triggerFrom = '触发来源'
    window.zhuge.track('下载APP', { [`${triggerFrom}`]: '职位列表页顶部推荐' })
    window.location.href = 'https://m.veryeast.cn/mobile/index.html?c=mobile'
  }

  componentWillReceiveProps(nextProps) {
    const nextList = nextProps.searchLIst
    const thisList = this.props.searchLIst
    const scrollTop = nextProps.srearchData.scrollTop
    if (nextList !== thisList) {
      this.setState(
        {
          dataSource: this.state.dataSource.cloneWithRows(nextList),
        },
        () => {
          if (scrollTop !== 0) {
            document.body.scrollTop = document.documentElement.scrollTop = scrollTop
          }
        }
      )
    }

    if (nextList.length < 20) {
      this.setState({
        Loaded: '没有更多了',
      })
    }

    if (this.props.location.state !== nextProps.location.state) {
      const data = nextProps.location.state || {}
      const allQuery = this.handleSearchQuery()
      if (data !== {}) {
        setTimeout(() => {
          this.props.dispatch(changeQuery(allQuery)).then(data => {
            document.body.scrollTop = document.documentElement.scrollTop = 0
            if (data.data.count === 0) {
              this.setState({
                Loaded: '没有更多了',
              })
            }
          })
        })
      }
    }
    if (window && window._hmt) {
      window._hmt && window._hmt.push(['_trackPageview', window.location.href])
    }
  }
  // 关闭底部引导注册弹框
  handleCloseReg() {
    this.setState({
      showRegWrap: false,
    })
  }
  /*组建卸载，存储滚动条的位置*/
  componentWillUnmount() {
    this.getQuery.isUsed = 0
    this.props.dispatch(saveScrollTop(this.scrollTop))
    this.props.dispatch({
      type: 'SEARCH_EMPTY_ALL',
    })
    clearTimeout(this.timer)
  }

  render() {
    const {queryMore} = this.state
    let query = this.props.query
    const area =
      this.props.userStatus.code && this.props.userStatus.code.length > 0
        ? this.props.userStatus.code
        : this.props.supers.location.address.code
    if (query.area.length === 0) {
      query.area = area
    }
    query.more = {...query.more, ...queryMore}
    delete query.keyword
    delete query.isUsed

    const Row = d => {
      return (
        <div className={style.listItem}>
          <Link to={`/${d.company_id}/${d.job_id}`} onClick={this.goPosition}>
            <JobCard data={d} />
          </Link>
        </div>
      )
    }
    const allPage = Number(this.props.pager.allPage)
    const { showRegWrap, is_login } = this.state
    let styleObj = {}

    if (is_login !== 1 && showRegWrap === false) {
      styleObj = {
        paddingBottom: 0,
      }
    }

    return (
      <div className={style.SearchEndWrap} style={styleObj}>
        <Helmet>
          <title>最佳东方 - 旅游服务业专业的招聘平台</title>
          <meta
            name="description"
            content="11最佳东方专为个人提供全面的酒店,餐饮,物业,海外,高尔夫,游轮职位招聘信息，为企业提供校园招聘,猎头,培训,测评和人事外包在内的全方位的人力资源服务，帮助个人求职者与企业搭建最佳的人才招募和人才培养渠道。"
          />
          <meta
            name="keywords"
            content="酒店招聘,餐饮,物业,海外,高尔夫,游轮,招聘会"
          />
        </Helmet>
        <div className={style.top}>
          <Ad.AdTop downLoadAd={this.downLoadAd} />

          <SearchEndBar
            goBack={this.goBack}
            goSerch={this.goSerch}
            keyword={this.state.defaultValue}
            number={this.showCount()}
            location={this.props.location}
          />
          <div className={style.searchCondition}>
            <FilterSearch filterSearch={this.filterSearch} query={query} />
          </div>
          {this.state.showSelectP ? this.selectProjectRender(query) : null}
        </div>

        {allPage > 0 ? (
          <div className={style.listBox}>
            <ListView
              className={style.listView}
              dataSource={this.state.dataSource}
              renderRow={Row}
              scrollRenderAheadDistance={100}
              onEndReachedThreshold={10}
              scrollEventThrottle={100}
              initialListSize={1000}
              pageSize={2000}
              useBodyScroll
              onScroll={this.onScroll}
              onEndReached={this.onEndReached} // 上啦加载
              renderFooter={() => (
                <div style={{ padding: 10, textAlign: 'center' }}>
                  {this.props.isLoading ? 'Loading...' : this.state.Loaded}
                </div>
              )}
            />
          </div>
        ) : (
          this.noVacancies(query)
        )}

        {is_login ? null : showRegWrap ? (
          <div className={style.registerwrap}>
            <RegisterWrap
              onCloseReg={this.handleCloseReg.bind(this)}
              location={this.props.history.location.pathname}
              zhugeFrom="职位列表页底部推荐注册"
            />
          </div>
        ) : null}
      </div>
    )
  }
}

export default SearchEnd
