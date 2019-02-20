/**
 * Created by huangchao on 2017/9/30.
 */
import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
// import store from 'store'
import MySearchBar from '../../components/SearchBar'
import SearchClassify from '../../components/SearchClassify'
import { getSearchTips } from '../../actions/search'
import { changeAllCity } from '../../actions/home'
import SearchHot from '../../components/SearchHot'
import SearchHistory from '../../components/SearchHistory'
import F from '../../helper/tool'
import resume from '../../static/sresume@3x.png'
import queryString from 'query-string'
import welfares from '../../static/sfuli@3x.png'
import style from './style.less'
import { getSearchHot } from '../../actions/search'
import { Helmet } from 'react-helmet'

const tiggerSearchKeyWord = '搜索词'

@connect(state => {
  return {
    hot: state.search.hot,
    tips: state.search.tips,
    supers: state.supers,
    areaCode: state.search.areaCode,
    query: state.search.query,

  }
})
class SearchPage extends PureComponent {
  static propTypes = {}


  state = {
    stareSearch: false,
    areaParms: '', // url传递的area code
  }

  componentWillReceiveProps(next) {
    const { supers, areaCode, query } = this.props // userStatus
    let area = supers.location.address.code[0]
    // console.log(areaCode[0])
    // if (areaCode.length > 0) {
      area = areaCode[0] ? areaCode[0] : ''
    // }
    if (query.area.length > 0) {
      area = query.area[0]
    }
    // this.setState({
    //   areaParms: area,
    // })
    const searchCity = sessionStorage.getItem('searchCity')
    if (searchCity && this.props.supers.location.address.code[0] !== searchCity) {
      this.props.dispatch({
        type: 'JOB_PAGE_CITY_CODE_SET',
        area: [searchCity],
      })
    }
  }
  onChangeCity = value => {
    // const Area = option.areas_index
    const code = value.areas
    // if (value.areas.length > 0) {
      this.props.dispatch(changeAllCity(code))
    // }
      //  this.props.dispatch({
      //   type: 'JOB_PAGE_CITY_CODE_SET',
      //   area: code,
      // })
  }

  change = keyWord => {
    this.setState({
      stareSearch: true,
      keyWord: keyWord,
    })
    this.props.dispatch(
      getSearchTips({
        keyword: keyWord,
        count: 10,
      })
    )
  }

  Cancel = () => {
    const { redirect } = queryString.parse(window.location.search)
    if (redirect) {
      this.props.history.replace(redirect)
    } else {
      this.props.history.replace('/')
    }
  }

  touchHot = item => {
    //热门搜索
    window.zhuge.track('热门搜索', { [`${tiggerSearchKeyWord}`]: item })
    const searchHistory = JSON.parse(
      localStorage.getItem('m:searchHis') || '[]'
    )
    searchHistory.unshift(item)
    const newHis = searchHistory.slice(0, 5)
    localStorage.setItem(
      'm:searchHis',
      JSON.stringify(F.ArrayDelRepetition(newHis))
    )
    const state = this.props.location.state || {}
    // const { supers, areaCode } = this.props // userStatus
    // let area = supers.location.address.code[0]
    // if (areaCode.length > 0) {
    //   area = areaCode[0]
    // }
    // const {areaParms} = this.state
    if (state.hasOwnProperty('form') && state.form === 'tab:job') {
      // 页面是从tab：job页面进入的
      // console.log('从tab_job进入的'+state.form)

      this.props.history.push(
        `/job/?keyword=${item}&areaParms=${this.props.supers.location.address.code}`,
        { keyword: item }
      )
    } else {
      this.props.history.push(
        `/search/${item}?keyword=${item}&areaParms=${this.props.supers.location.address.code}`,
        { keyword: item }
      )
    }
  }

  search = val => {
    //搜索
    const searchHistory = JSON.parse(
      localStorage.getItem('m:searchHis') || '[]'
    )
    searchHistory.unshift(val)
    const newHis = searchHistory.slice(0, 5)
    localStorage.setItem(
      'm:searchHis',
      JSON.stringify(F.ArrayDelRepetition(newHis))
    )
    const state = this.props.location.state || {}
    // const {areaParms} = this.state

    if (state.hasOwnProperty('form') && state.form === 'tab:job') {
      // 页面是从tab：job页面进入的
      // console.log('从tab_job进入的'+state.form)
      this.props.history.push(`/job/?keyword=${val}&areaParms=${this.props.supers.location.address.code}`, { keyword: val })
    } else {
      this.props.history.push(`/search/${val}?keyword=${val}&areaParms=${this.props.supers.location.address.code}`, { keyword: val })
    }
  }

  touchSearchItem = val => {
    // 点击筛选结果
    window.zhuge.track('点击搜索推荐职位', {
      [`${tiggerSearchKeyWord}`]: val.keyword,
    })
    const searchHistory = JSON.parse(
      localStorage.getItem('m:searchHis') || '[]'
    )
    searchHistory.unshift(val.keyword)
    const newHis = searchHistory.slice(0, 5)
    localStorage.setItem(
      'm:searchHis',
      JSON.stringify(F.ArrayDelRepetition(newHis))
    )
    const state = this.props.location.state || {}
    // const {areaParms} = this.state
    if (state.hasOwnProperty('form') && state.form === 'tab:job') {
      // 页面是从tab：job页面进入的
      // console.log('从tab_job进入的'+state.form)
      this.props.history.push(`/job/?keyword=${val.keyword}&areaParms=${this.props.supers.location.address.code}`, { ...val })
    } else {
      this.props.history.push(`/search/${val.keyword}?keyword=${val.keyword}&areaParms=${this.props.supers.location.address.code}`, {
        ...val,
      })
    }
  }

  searcHis = keyWord => {
    // 点击历史记录
    window.zhuge.track('搜索记录', { [`${tiggerSearchKeyWord}`]: keyWord })
    const searchHistory = JSON.parse(
      localStorage.getItem('m:searchHis') || '[]'
    )
    searchHistory.unshift(keyWord)
    const newHis = searchHistory.slice(0, 5)
    localStorage.setItem(
      'm:searchHis',
      JSON.stringify(F.ArrayDelRepetition(newHis))
    )
    const state = this.props.location.state || {}
    // const {areaParms} = this.state

    if (state.hasOwnProperty('form') && state.form === 'tab:job') {
      // 页面是从tab：job页面进入的
      // console.log('从tab_job进入的'+state.form)
      this.props.history.push(`/job/?keyword=${keyWord}&areaParms=${this.props.supers.location.address.code}`, { keyword: keyWord })
    } else {
      this.props.history.push(`/search/${keyWord}?keyword=${keyWord}&areaParms=${this.props.supers.location.address.code}`, {
        keyword: keyWord,
      })
    }
  }

  ShowPost = (job = []) => {
    if (job.length > 0) {
      return (
        <SearchClassify
          title="职位"
          scope="2"
          keyWord={this.state.keyWord}
          src={resume}
          data={job}
          callback={this.touchSearchItem}
        />
      )
    }
  }
  ShowCompany = (company = []) => {
    if (company.length > 0) {
      // return <SearchClassify
      //   title="企业"
      //   scope="3"
      //   keyWord={this.state.keyWord}
      //   src={qiye}
      //   data={company}
      //   callback={this.touchSearchItem}
      // />
    }
  }
  ShowWelfare = (welfare = []) => {
    if (welfare.length > 0) {
      return (
        <SearchClassify
          title="福利"
          scope="4"
          keyWord={this.state.keyWord}
          src={welfares}
          data={welfare}
          callback={this.touchSearchItem}
        />
      )
    }
  }
  ShowSearchEnd = () => {
    if (this.state.stareSearch) {
      return (
        <div>
          {this.ShowPost(this.props.tips.job)}
          {this.ShowCompany(this.props.tips.company)}
          {this.ShowWelfare(this.props.tips.welfare)}
        </div>
      )
    } else {
      return (
        <div>
          <SearchHistory callback={this.searcHis} {...this.props} />
          <SearchHot data={this.props.hot} callbackParent={this.touchHot} />
        </div>
      )
    }
  }

  componentDidMount() {
    this.props.dispatch(getSearchHot())
  }

  render() {
    return (
      <div className={style.SearchPageWrap}>
        <Helmet>
          <title>最佳东方 - 旅游服务业专业的招聘平台</title>
          <meta
            name="description"
            content="最佳东方专为个人提供全面的酒店,餐饮,物业,海外,高尔夫,游轮职位招聘信息，为企业提供校园招聘,猎头,培训,测评和人事外包在内的全方位的人力资源服务，帮助个人求职者与企业搭建最佳的人才招募和人才培养渠道。"
          />
          <meta
            name="keywords"
            content="酒店招聘,餐饮,物业,海外,高尔夫,游轮,招聘会"
          />
        </Helmet>
        <MySearchBar
          callback={this.search}
          touchCancel={this.Cancel}
          onChange={this.change}
          onChangeCity={this.onChangeCity}
          autoFocus
          showCity="true"
          defaultValue="" // 输入框的默认值
          placeholder="请输入职位/公司名"
          SearchUser={false}
        />
        {this.ShowSearchEnd()}
      </div>
    )
  }
}

export default SearchPage
