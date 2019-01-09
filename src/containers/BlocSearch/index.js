import React, { Component } from 'react'
import * as Ad from '../../components/Ad'
import Search from '../../components/SearchBar/Search'
// import { WhiteSpace } from 'antd-mobile'
import { createForm } from 'rc-form'
import { Toast } from 'antd-mobile'
import { connect } from 'react-redux'
import queryString from 'query-string'
// import Salary from '../../inputs/Salary'
import { changeAllCity } from '../../actions/home'
import { saveCityCode } from '../../actions/userStatus'
import { saveQuery } from '../../actions/jobPage'
import Area from '../../inputs/Area'
import Brand from '../../inputs/Brand'
import SimpleItem from '../../inputs/SimpleItem'
import { blocList, blocSearch } from '../../actions/company'
import CompanyList from './CompanyList'
import FilterList from './FilterList'
import RegisterWrap from '../../components/RegisterWrap'
import style from './style.less'

@connect(state => ({
  is_login: state.userStatus.is_login,
  userStatus: state.userStatus,
  supers: state.supers,
  list: state.company.list,
  pagers: state.company.pager,
  searchList: state.company.searchList,
  searchPager: state.company.searchPager,
}))
export default class CompanyArea extends Component {
  state = {
    show: true,
    showRegWrap: true,
  }

  /* 下载或者打开app */
  downLoadAd = () => {
    window.zhuge.track('下载App')
    window.location.href = 'https://m.veryeast.cn/mobile/index.html?c=mobile' //"BaiduDsp://activity.veryeast.cn/baidu/mobile/index"
  }

  // 关闭底部引导注册弹框
  handleCloseReg() {
    this.setState({
      showRegWrap: false,
    })
  }

  handleFilerSearch = (value = {}) => {
    console.log(value)
    const c_userid = this.props.match.params.c_userid
    this.props.dispatch(
      blocList({
        c_userid: c_userid,
        local: value.area ? value.area : '',
        c_id: value.brand ? value.brand : '',
      })
    )
  }
  /* 记录滚动条的位置 */
  onScroll = e => {
    // let top = document.body.scrollTop || document.documentElement.scrollTop
    // this.scrollTop = top
    // let scroll = window.scrollY
    // if (scroll > 360) {
    //   this.setState({
    //     showAd: true,
    //   })
    // } else {
    //   this.setState({
    //     showAd: false,
    //   })
    // }
  }

  whereWillIGo = () => {
    const { pathSearch } = queryString.parse(window.location.search)
    if (pathSearch) {
      this.props.history.go(-1)
    } else {
      this.props.history.length === 2 || this.props.history.length === 1
        ? this.props.history.push('/tabs/home')
        : this.props.history.go(-1)
    }
  }

  onSubmit = value => {
    if (value === '') {
      Toast.info('请输入搜索职位/品牌', 2)
      return
    } else {
      const c_userid = this.props.match.params.c_userid
      this.props
        .dispatch(
          blocSearch({
            c_userid: c_userid,
            local: '',
            c_id: '',
            key_words: value,
          })
        )
        // .then(data => {
        //   console.log( data)
        // })
    }
  }

  onChange = value => {
    console.log(value)
  }
 

  componentDidMount() {
    const c_userid = this.props.match.params.c_userid
    this.props.dispatch(
      blocList({
        c_userid: c_userid,
      })
    )
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
  }

  render() {
    const { show, showRegWrap } = this.state
    const is_login = sessionStorage.getItem('is_login')
    console.log(this.props.searchList);
    console.log(this.props.searchPager);
    return (
      <div className={style.CompanyArea}>
        <div className={style.selHead}>
          <Ad.AdTop show={show} downLoadAd={this.downLoadAd} />
          <Search
            goBack={this.whereWillIGo}
            Search={this.onSubmit}
            Change={this.onChange}
          />
          <FilterList filterList={this.handleFilerSearch} />
        </div>
        <div className={style.blocCentent}>
          <CompanyList />
        </div>
        {is_login ? null : showRegWrap ? (
          <RegisterWrap
            onCloseReg={this.handleCloseReg.bind(this)}
            location={this.props.history.location.pathname}
          />
        ) : null}
      </div>
    )
  }
}
