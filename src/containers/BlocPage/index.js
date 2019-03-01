import React, { Component } from 'react'
import * as Ad from '../../components/Ad'
// import ReactDOM from 'react-dom'
import Search from '../../components/SearchBar/Search'
import { Toast } from 'antd-mobile'
import { connect } from 'react-redux'
import queryString from 'query-string'
import {
  blocList,
  blocSearch,
  blocSearchClear,
  blocListClear,
  saveScrollTop,
  blocCategory,
} from '../../actions/bloc'
import { Link } from 'react-router-dom'
import { ListView } from 'antd-mobile'
// import {shareWeixin} from '../../helper/tool'
// import JobList from '../../components/JobList'
import { shareToPeople, shareToAll } from '../../actions/auth'
import { saveBlocQuery, saveSearch } from '../../actions/bloc'
// import CompanyList from './CompanyList'
import FilterList from './FilterList'
import RegisterWrap from '../../components/RegisterWrap'
import { Helmet } from 'react-helmet'
import style from './style.less'
import companyLogo from '../../static/detailLogo.png'
// import missing from '../../static/missing.png'
import F from '../../helper/tool'
const tiggerKeyWord = '搜索词'
const tiggerCity = '地区'
const tiggerBrand = '品牌'
const triggerFrom = '触发来源'

// const querys = {
//   area: [],
//   brand: 0,
// }
// @createForm({
//   onValuesChange(props, values) {
//     if (values.areas) {
//       querys.area = values.areas
//     }
//     if (values.brand) {
//       querys.brand = values.brand
//     }
//     props.filterList(querys)
//   },
// })

@connect(state => ({
  userStatus: state.userStatus,
  supers: state.supers,
  list: state.bloc.list,
  listPhoto: state.bloc.listPhoto,
  pagers: state.bloc.pager,
  searchList: state.bloc.searchList,
  searchPager: state.bloc.searchPager,
  query: state.bloc.query,
  searchState: state.bloc.searchState,
  searchKeyword: state.bloc.searchKeyword,
  option: state.option,
  company: state.company,
  homeDate: state.home,
  bloc: state.bloc,
  blocDate: state.bloc,
}))
export default class CompanyArea extends Component {
  constructor(props) {
    super(props)
    const dataSource = new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1 !== row2,
    })
    this.state = {
      show: true,
      showRegWrap: true,
      search: false,
      keyWords: '',
      local: '',
      c_id: '',
      is_login: '',
      isVisable: false,
      searchValue: '',
      dataSource: dataSource.cloneWithRows(this.props.list),
    }
  }

  /* 下载或者打开app */
  downLoadAd = () => {
    window.location.href = 'share2js://app?type=1'
    setTimeout(() => {
      const triggerFrom = '触发来源'
      window.zhuge.track('下载APP', {
        [`${triggerFrom}`]: '名企列表页顶部推荐',
      })
      window.location.href =
        'https://m.veryeast.cn/mobile/ariadownload?utm_source=h503'
    }, 2000)
  }

  // 关闭底部引导注册弹框
  handleCloseReg() {
    this.setState({
      showRegWrap: false,
    })
  }

  handleFilerSearch = (value = {}) => {
    const option = this.props.option
    if (value.area) {
      // 城市选择
      const areas_index = option.areas_index || {}
      const city = areas_index[value.area[0]]
      window.zhuge.track('名企城市筛选', { [`${tiggerCity}`]: city })
    }

    if (value.brand) {
      // 薪资
      const brand_index = this.props.bloc.brand || []
      const brand =
        brand_index.filter(v => v.code === value.brand[0])[0].value || ''
      window.zhuge.track('名企品牌筛选', { [`${tiggerBrand}`]: brand })
    }

    this.props.dispatch(blocSearchClear())
    this.props.dispatch(
      saveBlocQuery({
        area: value.area ? value.area : [],
        brand: value.brand ? value.brand : [],
        // keywords: this.state.keyWords,
      })
    )
  }
  /* 记录滚动条的位置 */
  onScroll = () => {
    let top = document.body.scrollTop || document.documentElement.scrollTop
    this.scrollTop = top
  }

  whereWillIGo = () => {
    this.scrollTop = 0;
    document.body.scrollTop = document.documentElement.scrollTop = 0;
    const { redirect } = queryString.parse(window.location.search)
    if (redirect) {
      this.props.history.replace(redirect)
    } else {
      this.props.history.replace('/')
    }
  }

  onSubmit = value => {
    this.props.dispatch(blocSearchClear())
    if (value === '') {
      Toast.info('请输入搜索职位/品牌', 2)
      return
    } else {
      this.setState({
        search: true,
        keyWords: value,
      })
      this.props.dispatch(
        saveSearch({
          searchState: true,
          searchKeyword: value,
        })
      )
      this.props.dispatch(
        saveBlocQuery({
          keywords: value,
        })
      )
    }
  }

  goPostion = () => {
    window.zhuge.track('职位详情页打开', {
      [`${triggerFrom}`]: '名企搜索列表页',
    })
  }

  goCompany = () => {
    window.zhuge.track('企业详情页打开', {
      [`${triggerFrom}`]: '名企列表页',
    })
  }

  onCancel = () => {
    // this.formRef.props.form.resetFields()
    this.setState(
      {
        search: false,
        searchValue: '',
      },
      () => {
        this.setState({
          isVisable: false,
        })
      }
    )
    this.props.dispatch(
      saveSearch({
        searchState: false,
        searchKeyword: '',
      })
    )
    this.props.dispatch(blocSearchClear())
  }

  onClear = () => {
    this.props.dispatch(
      saveSearch({
        searchState: false,
        searchKeyword: '',
      })
    )
    this.props.dispatch(blocSearchClear())
  }

  onChange = value => {
    this.setState({
      keywords: value,
      searchValue: value,
    })
    this.props.dispatch(
      saveBlocQuery({
        keywords: value,
      })
    )
  }

  /* 上拉加载 */
  onEndReached = () => {
    const c_userid = this.props.match.params.c_userid
    const page = this.props.pagers.cur + 1
    const allPage = this.props.pagers.allPage
    if (page <= allPage) {
      this.props.dispatch(
        blocList({
          c_userid: c_userid,
          page: page,
        })
      )
    } else {
      this.setState({
        isLoading: false,
      })
    }
  }

  componentDidMount() {
    /* 初始化this.scrollTop */
    this.scrollTop = this.props.blocDate.scrollTop
    const c_userid = this.props.match.params.c_userid
    // 请求名企品牌分类
    this.props.dispatch(
      blocCategory({
        c_userid: c_userid,
      })
    )
    // 请求名企专区子公司
    const { listPhoto } = this.props
    if (JSON.stringify(listPhoto) === '{}') {
      Toast.loading('Loading...')
      this.props
        .dispatch(
          blocList({
            c_userid: c_userid,
            local: '',
            c_id: '',
          })
        )
        .then(res => {
          Toast.hide()
          window.wx.ready(() => {
            window.wx.updateTimelineShareData(
              shareToAll('', res.data.group_company_name, 2)
            ) // 分享到朋友圈
            window.wx.updateAppMessageShareData(
              shareToPeople('', res.data.group_company_name, 2)
            ) // 分享给朋友
          })
        })
    }
    this.setState({
      is_login: F.getUserInfo().is_login,
      // photo: F.getUserInfo().photo,
    })
  }

  componentWillReceiveProps(nextProps) {
    const scrollTop = nextProps.blocDate.scrollTop
    if (nextProps.list.length > 0 || this.props.list !== nextProps.list) {
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(nextProps.list),
      })
      if (nextProps.list.length <= 20 && nextProps.pagers.allPage === 1) {
        this.setState({
          isLoading: false,
        })
      }
      if (scrollTop !== 0) {
        document.body.scrollTop = document.documentElement.scrollTop = scrollTop
      }
    }

    // 选择城市和品牌筛选数据
    const c_userid = this.props.match.params.c_userid
    // const scrollTop = nextProps.homeDate.scrollTop
    if (
      nextProps.query.area !== this.props.query.area ||
      nextProps.query.brand !== this.props.query.brand ||
      nextProps.searchKeyword !== this.props.searchKeyword ||
      nextProps.searchState !== this.props.searchState
    ) {
      Toast.loading('Loading...', 1)
      if (nextProps.searchState) {
        this.props
          .dispatch(
            blocSearch({
              c_userid: c_userid,
              local: nextProps.query.area[0] ? nextProps.query.area[0] : '',
              c_id: nextProps.query.brand[0] ? nextProps.query.brand[0] : '',
              // key_words: nextProps.query.keywords && nextProps.query.keywords,
            })
          )
          .then(res => {
            if (res.data.data.length === 0 || res.data.pager.total === 0) {
              window.zhuge.track('名企搜索无结果', {
                [`${tiggerKeyWord}`]:
                  nextProps.query.keywords && nextProps.query.keywords,
              })
            }
            Toast.hide()
          })
      } else {
        Toast.loading('Loading...', 1)
        this.props
          .dispatch(
            blocList({
              c_userid: c_userid,
              local: nextProps.query.area[0] ? nextProps.query.area[0] : '',
              c_id: nextProps.query.brand[0] ? nextProps.query.brand[0] : '',
            })
          )
          .then(() => {
            Toast.hide()
          })
      }
    }
  }

  componentWillUnmount() {
    this.props.dispatch(blocListClear())
    /*组建卸载，存储滚动条的位置*/
    this.props.dispatch(saveScrollTop(this.scrollTop))
  }

  render() {
    const { show, showRegWrap, is_login } = this.state
    const categoryName = this.props.bloc.group_company_name
    const allPage = Number(this.props.pagers.allPage)
    const Row = d => {
      return (
        <Link
          rel="stylesheet"
          to={`/${d.c_userid}?redirect=${this.props.location.pathname}`}
          key={d.c_userid}
          onClick={this.goCompany}
        >
          <div className={style.ContentModule}>
            <img
              src={d.company_logo ? d.company_logo : companyLogo}
              alt="img"
            />
            <div className={style.inviteInfo}>
              <h1>{d.company_name}</h1>
              <div className={style.scale}>
                {d.current_location ? <span>{d.current_location}</span> : null}
                {d.company_type ? (
                  <span>
                    <span className={style.rule}>|</span>
                    {d.company_type}
                  </span>
                ) : null}
                {d.employees_number ? (
                  <span>
                    <span className={style.rule}>|</span>
                    {d.employees_number}
                  </span>
                ) : null}
              </div>
              <div className={style.inRecruit}>
                <span>{d.jobNum}</span>个在招职位
              </div>
            </div>
          </div>
        </Link>
      )
    }
    let styleObj = {}

    if (is_login !== 1 && showRegWrap === false) {
      styleObj = {
        paddingBottom: 0,
      }
    }
    return (
      <div className={style.CompanyArea} style={styleObj}>
        <Helmet>
          <title>{`${categoryName}招聘信息,招工求职信息_最佳东方`}</title>
          <meta
            name="description"
            content={`最佳东方提供全面${categoryName}招聘职位信息,${categoryName}招工求职信息,帮助您成功入职${categoryName},与众多${categoryName}精英们一起开启一段崭新的职业生涯。`}
          />
          <meta
            name="keywords"
            content={`${categoryName}招聘信息,${categoryName}求职信息,${categoryName}招工信息`}
          />
        </Helmet>
        <div className={style.selHead}>
          <Ad.AdTop show={show} downLoadAd={this.downLoadAd} />
          <Search
            searchValue={this.state.searchValue}
            goBack={this.whereWillIGo}
            // Search={this.onSubmit}
            // Cancel={this.onCancel}
            // Change={this.onChange}
            // Clear={this.onClear}
            // visable={this.state.isVisable}  //名企专区搜索功能暂时关闭
            title={categoryName}
          />
          <FilterList
            // wrappedComponentRef={inst => (this.formRef = inst)}
            filterList={this.handleFilerSearch}
          />
        </div>

        {/*<CompanyList
            // searchEnd={this.state.search} //名企专区搜索功能暂时关闭
          />*/}
        <div className={style.companyList}>
          <ListView
            ref={el => (this.lv = el)}
            className={style['override-am-list-view-scrollview-content']}
            dataSource={this.state.dataSource}
            renderRow={Row}
            scrollRenderAheadDistance={100}
            onEndReachedThreshold={10}
            scrollEventThrottle={100}
            initialListSize={1000}
            pageSize={2000}
            onScroll={this.onScroll}
            useBodyScroll
            renderHeader={() => (
              <div
                className={style.individuation}
                style={{
                  backgroundImage: `url(${this.props.listPhoto.company_file})`,
                }}
              />
            )}
            onEndReached={this.onEndReached} // 上拉加载
            renderFooter={() =>
              allPage > 0 ? (
                <div style={{ padding: 5, textAlign: 'center' }}>
                  {this.state.isLoading ? 'Loading...' : '没有更多了'}
                </div>
              ) : (
                <div className={style.missing}>
                  <p>当前条件下暂无公司，可以切换条件试试哦~</p>
                </div>
              )
            }
          />
        </div>
        {is_login ? null : showRegWrap ? (
          <div className={style.registerwrap}>
            <RegisterWrap
              onCloseReg={this.handleCloseReg.bind(this)}
              location={`${this.props.history.location.pathname}${
                this.props.history.location.search
              }`}
              zhugeFrom="名企页底部推荐注册"
            />
          </div>
        ) : null}
      </div>
    )
  }
}