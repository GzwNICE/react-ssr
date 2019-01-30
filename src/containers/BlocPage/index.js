import React, { Component } from 'react'
import * as Ad from '../../components/Ad'
import Search from '../../components/SearchBar/Search'
import { Toast } from 'antd-mobile'
import { connect } from 'react-redux'
import queryString from 'query-string'
import {
  blocList,
  blocSearch,
  blocSearchClear,
  blocListClear,
} from '../../actions/company'
import { saveScrollTop } from '../../actions/home'
import { saveQuery, saveSearch } from '../../actions/search'
import CompanyList from './CompanyList'
import FilterList from './FilterList'
import RegisterWrap from '../../components/RegisterWrap'
import { Helmet } from 'react-helmet'
import style from './style.less'
const tiggerKeyWord = '搜索词'
const tiggerCity = '地区'
const tiggerBrand = '品牌'

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
  list: state.company.list,
  listPhoto: state.company.listPhoto,
  pagers: state.company.pager,
  searchList: state.company.searchList,
  searchPager: state.company.searchPager,
  query: state.search.query,
  searchState: state.search.searchState,
  searchKeyword: state.search.searchKeyword,
  option: state.option,
  company: state.company,
  homeDate: state.home,
}))
export default class CompanyArea extends Component {
  state = {
    show: true,
    showRegWrap: true,
    search: false,
    keyWords: '',
    local: '',
    c_id: '',
    is_login: '',
    isVisable: false,
    searchValue: '',
    hasList: false,
  }

  /* 下载或者打开app */
  downLoadAd = () => {
    const triggerFrom = '触发来源'
    window.zhuge.track('下载APP', { [`${triggerFrom}`]: '名企列表页顶部推荐' })
    window.location.href = 'https://m.veryeast.cn/mobile/index?c=mobile' //"BaiduDsp://activity.veryeast.cn/baidu/mobile/index"
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
      const brand_index = this.props.company.brand || []
      const brand =
        brand_index.filter(v => v.code === value.brand[0])[0].value || ''
      window.zhuge.track('名企品牌筛选', { [`${tiggerBrand}`]: brand })
    }

    this.props.dispatch(blocSearchClear())
    this.props.dispatch(
      saveQuery({
        area: value.area ? value.area : [],
        brand: value.brand ? value.brand : [],
        keywords: this.state.keyWords,
      })
    )
  }
  /* 记录滚动条的位置 */
  onScroll = () => {
    let top = this.refs['blocCentent'].scrollTop
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
        saveQuery({
          keywords: value,
        })
      )
    }
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
      saveQuery({
        keywords: value,
      })
    )
  }

  componentDidMount() {
    /* 初始化this.scrollTop */
    this.scrollTop = this.props.homeDate.scrollTop
    this.refs['blocCentent'].scrollTo(0, this.scrollTop)

    const c_userid = this.props.match.params.c_userid
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
          this.setState({
            hasList: true,
          })
        })
    }
    this.setState({
      is_login: sessionStorage.getItem('is_login')
        ? sessionStorage.getItem('is_login')
        : '',
    })
  }

  componentWillReceiveProps(nextProps) {
    // this.props.form.validateFields((err, values) => {
    //   if (err) return
    //   if (values.areas && nextProps.userStatus.code !== values.areas) {
    //     this.onChangeCity && this.onChangeCity(values)
    //   }
    //   if (values.brand) {
    //     this.props.onChangBrand && this.props.onChangeBrand(values)
    //   }
    // })

    // 选择城市和品牌筛选数据
    const c_userid = this.props.match.params.c_userid
    const scrollTop = nextProps.homeDate.scrollTop
    if (
      nextProps.query.area !== this.props.query.area ||
      nextProps.query.brand !== this.props.query.brand ||
      nextProps.searchKeyword !== this.props.searchKeyword ||
      nextProps.searchState !== this.props.searchState
    ) {
      if (nextProps.searchState) {
        this.props
          .dispatch(
            blocSearch({
              c_userid: c_userid,
              local: nextProps.query.area[0] ? nextProps.query.area[0] : '',
              c_id: nextProps.query.brand[0] ? nextProps.query.brand[0] : '',
              key_words: nextProps.query.keywords && nextProps.query.keywords,
            })
          )
          .then(res => {
            if (res.data.data.length === 0 || res.data.pager.total === 0) {
              window.zhuge.track('名企搜索无结果', {
                [`${tiggerKeyWord}`]:
                  nextProps.query.keywords && nextProps.query.keywords,
              })
            }
            this.refs['blocCentent'].scrollTo(0,scrollTop)
          })
      } else {
        this.props.dispatch(
          blocList({
            c_userid: c_userid,
            local: nextProps.query.area[0] ? nextProps.query.area[0] : '',
            c_id: nextProps.query.brand[0] ? nextProps.query.brand[0] : '',
          })
        ).then(()=>{
          this.refs['blocCentent'].scrollTo(0,scrollTop)
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
    const category = this.props.list
    const categoryName = category.length > 0 ? category[0].category_name : ''
    return (
      <div className={style.CompanyArea}>
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
            Search={this.onSubmit}
            Cancel={this.onCancel}
            Change={this.onChange}
            Clear={this.onClear}
            visable={this.state.isVisable}
          />
          <FilterList
            // wrappedComponentRef={inst => (this.formRef = inst)}
            filterList={this.handleFilerSearch}
          />
        </div>
        <div
          className={style.blocCentent}
          ref="blocCentent"
          onScroll={this.onScroll}
        >
          <CompanyList
            searchEnd={this.state.search}
            hasList={this.state.hasList}
          />
        </div>
        {is_login ? null : showRegWrap ? (
          <RegisterWrap
            onCloseReg={this.handleCloseReg.bind(this)}
            location={this.props.history.location.pathname}
            zhugeFrom="名企页底部推荐注册"
          />
        ) : null}
      </div>
    )
  }
}
