import React, { Component } from 'react'
import * as Ad from '../../components/Ad'
import Search from '../../components/SearchBar/Search'
// import { WhiteSpace } from 'antd-mobile'
import { createForm } from 'rc-form'
import { connect } from 'react-redux'
import queryString from 'query-string'
// import Salary from '../../inputs/Salary'
import {changeAllCity} from '../../actions/home'
import { saveCityCode } from '../../actions/userStatus'
import { saveQuery } from '../../actions/jobPage'
import Area from '../../inputs/Area'
import Brand from '../../inputs/Brand'
import SimpleItem from '../../inputs/SimpleItem'
import CompanyList from './CompanyList'
import FilterList from './FilterList'
import RegisterWrap from '../../components/RegisterWrap'
import style from './style.less'



@connect(state => ({
  is_login: state.userStatus.is_login,
  userStatus: state.userStatus,
  supers: state.supers,
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
  handleFilerSearch(querys){
    console.log(querys)
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

  componentWillUnmount() {}

  componentDidMount() {

  }

  componentWillReceiveProps(nextProps) {
    this.props.form.validateFields((err, values) => {
      if (err) return
      if (values.areas && nextProps.userStatus.code !== values.areas) {
        this.onChangeCity && this.onChangeCity(values)
      }
      if (values.brand) {
        this.props.onChangBrand && this.props.onChangeBrand(values)
      }
    })
  }

  render() {
    const { show, showRegWrap } = this.state
    const isLogin = this.props.is_login
    const { form, supers } = this.props
    const { getFieldProps } = form
    return (
      <div className={style.CompanyArea}>
        <div className={style.selHead}>
          <Ad.AdTop show={show} downLoadAd={this.downLoadAd} />
          <Search goBack={this.whereWillIGo} />
          <FilterList  FilterList={this.handleFilerSearch} />
        </div>
        <div className={style.blocCentent}>
          <CompanyList />
        </div>

        {isLogin === 0 ? (
          showRegWrap ? (
            <RegisterWrap
              onCloseReg={this.handleCloseReg.bind(this)}
              location={this.props.history.location.pathname}
            />
          ) : null
        ) : null}
      </div>
    )
  }
}
