import React, { Component } from 'react'
import { Flex } from 'antd-mobile'
import { connect } from 'react-redux'
import { hotTrade } from '../../../actions/home'
import { withRouter, Link } from 'react-router-dom'
import hotjobs from '../../../static/hotJobs@3x.png'
import style from '../style.less'
import Cookies from 'js-cookie'
const tiggerModule = '模块'
const tiggerCompany = '企业'
const tiggerPost = '职位'

@connect(state => ({
  tradeDtata: state.home.tradeDtata,
  userStatus: state.userStatus,
  supers: state.supers,
  address2Code: state.supers.location.address2 ? state.supers.location.address2.code : [],
}))
class HotTrade extends Component {
  constructor(props) {
    super(props)
    this.state = {
      areaParms: '',
    }
  }

  goClassify = key => {
    window.zhuge.track('分类模块', { [`${tiggerModule}`]: key })
  }

  goCompany = key => {
    window.zhuge.track('分类模块企业', { [`${tiggerCompany}`]: key })
  }

  goSearchPost = key => {
    window.zhuge.track('分类模块岗位', { [`${tiggerPost}`]: key })
  }

  goHotPost = key => {
    window.zhuge.track('热门职位_8个职位', { [`${tiggerPost}`]: key })
  }

  // ?redirect=${this.props.history.location.pathname}
  searchUrl = key => {
    const { areaParms } = this.state

    if (key === '礼宾/前台') {
      return `/search/礼宾前台?keyword=${key}&areaParms=${areaParms}`
    }
    if (key === '美容/SPA') {
      return `/search/美容SPA?keyword=${key}&areaParms=${areaParms}`
    }
    if (key === '健身中心') {
      return `/search/${key}?keyword=健身&areaParms=${areaParms}`
    }
    return `/search/${key}?keyword=${key}&areaParms=${areaParms}`
  }

  componentDidMount() {
    const tradeDtata = this.props.tradeDtata
    if (tradeDtata.length === 0) {
      const { userStatus, supers } = this.props
      const location =
        userStatus.code && userStatus.code[0]
          ? userStatus.code
          : supers.location.address.code
      this.props.dispatch(
        hotTrade({
          location: location,
        })
      )
    }
  }

  componentWillReceiveProps(nextProps) {
    if (
      this.props.userStatus.code &&
      nextProps.userStatus.code &&
      nextProps.userStatus.code[0] !== this.props.userStatus.code[0]
    ) {
      this.props.dispatch(
        hotTrade({
          location:
            nextProps.userStatus.code && nextProps.userStatus.code[0]
              ? nextProps.userStatus.code
              : nextProps.supers.location.address.code,
        })
      )
    }
    // 根据cookie来设置跳转url城市的参数
    // 当searchCity没有定义时，判断是否和定位一样，不一样判断定位有没有，有的话传定位没有传空字符串
    // 有定义时用定义的
    const searchCity = Cookies.get('searchCity')
    // const {address2Code} = this.props
    const {address2Code} = nextProps
    const { areaParms } = this.state
    if (searchCity === undefined || searchCity === 'undefined') {
      if (address2Code.length > 0) {
        // console.log(address2Code[0])
        if (areaParms !== address2Code[0]) {
          this.setState({
            areaParms: address2Code[0],
          })
        }
      } else {
        this.setState({
          areaParms: '',
        })
      }
    } else {
      this.setState({
        areaParms: searchCity,
      })
    }
    // if (searchCity !== undefined && searchCity !== 'undefined' && this.props.supers.location.address.code[0] !== searchCity) {
    //   this.props.dispatch({
    //     type: 'JOB_PAGE_CITY_CODE_SET',
    //     area: [searchCity],
    //   })

    // }
    // if (searchCity !== undefined && searchCity !== 'undefined'  && searchCity !== this.state.areaParms) {
    //   this.setState({
    //     areaParms: searchCity,
    //   })
    // }
  }

  render() {
    const { areaParms } = this.state

    const imgData = this.props.tradeDtata
    return (
      <div className={style.Hottrade}>
        {imgData.list
          ? imgData.list.map((item, index) => {
              return (
                <div className={style.tradeModule} key={index}>
                  <h1 className={style.subtitle}>
                    <Link
                      rel="stylesheet"
                      to={`/search/${item.keyArray.industry}?keyword=${
                        item.keyArray.industry
                      }&areaParms=${areaParms}`}
                      onClick={() => this.goClassify(item.keyArray.industry)}
                    >
                      {item.keyArray.industry}
                    </Link>
                  </h1>
                  <div className={style.tradeLogo}>
                    <Flex>
                      {item.logoArray
                        ? item.logoArray.map((item, index) => {
                            return (
                              <Flex.Item key={index}>
                                <Link
                                  rel="stylesheet"
                                  to={`/${item.c_userid}?redirect=${
                                    this.props.location.pathname
                                  }`}
                                  onClick={() =>
                                    this.goCompany(item.company_name)
                                  }
                                >
                                  <img src={item.company_logo} alt="img" />
                                </Link>
                              </Flex.Item>
                            )
                          })
                        : null}
                    </Flex>
                  </div>
                  <div className={style.tradePost}>
                    {item.keyArray.key.map((item, index) => {
                      return (
                        <Link
                          rel="stylesheet"
                          to={this.searchUrl(item)}
                          key={index}
                          onClick={() => this.goSearchPost(item)}
                        >
                          {item}
                        </Link>
                      )
                    })}
                  </div>
                  <i />
                </div>
              )
            })
          : null}
        <div className={style.hotjobs}>
          <i />
          <div className={style.jobList}>
            <img src={hotjobs} alt="img" />
            <div className={style.jobs}>
              {imgData.jobKey
                ? imgData.jobKey.map((item, index) => {
                    return (
                      <Link
                        rel="stylesheet"
                        to={`/search/${item}?keyword=${item}&areaParms=${areaParms}`}
                        key={index}
                        onClick={() => this.goHotPost(item)}
                      >
                        {item}
                      </Link>
                    )
                  })
                : null}
            </div>
          </div>
        </div>
      </div>
    )
  }
}
export default withRouter(HotTrade)
