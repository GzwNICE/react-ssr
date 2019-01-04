import React, { Component } from 'react'
import * as Ad from '../../components/Ad'
import Search from '../../components/SearchBar/Search'
// import { WhiteSpace } from 'antd-mobile'
import { createForm } from 'rc-form'
import { connect } from 'react-redux'
import queryString from 'query-string'
import Salary from '../../inputs/Salary'
import Area from '../../inputs/Area'
import SimpleItem from '../../inputs/SimpleItem'
import CompanyList from './CompanyList'
import RegisterWrap from '../../components/RegisterWrap'
import Down from '../../static/angleDownGray@3x.png'
import style from './style.less'

@connect(state => ({
  is_login: state.userStatus.is_login,
  userStatus: state.userStatus,
  supers: state.supers,
}))
@createForm()
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
        this.props.onChangeCity && this.props.onChangeCity(values)
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
          <div className={style.selectInfo}>
            <div className={style.selCity}>
              <div className={style.city}>
                <Area
                  {...getFieldProps('areas', {
                    initialValue: supers.location.address.code,
                  })} // 触发form，调用onChangeCity
                  format={this.formatArea}
                >
                  <SimpleItem arrow="horizontal" />
                </Area>
              </div>
              <img src={Down} alt="down" />
            </div>
            <span className={style.selRule} />
            <div className={style.selBrand}>
              <div className={style.Brand}>
                <Salary.SearchBrand
                  {...getFieldProps('salary', {})}
                  extra=""
                  format={this.format}
                >
                  <SimpleItem arrow="horizontal">选择品牌</SimpleItem>
                </Salary.SearchBrand>    
              </div>
              <img src={Down} alt="down" />
            </div>
          </div>
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
