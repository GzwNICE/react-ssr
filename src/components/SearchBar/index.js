/**
 * Created by huangchao on 2017/9/28.
 */
import React, { PureComponent } from 'react'
import { withRouter } from 'react-router-dom'
import style from './style.less'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { SearchBar, Carousel } from 'antd-mobile'
import SimpleItem from '../../inputs/SimpleItem'
import { createForm } from 'rc-form'
import { Link } from 'react-router-dom'
import Area from '../../inputs/Area1'
import searchIocn from '../../static/searchIocn.png'
import angleDown from '../../static/angleDown@3x.png'
import personal from '../../static/personalHome.png'
import Userdefault from '../../static/portrait@3x.png'
import F from '../../helper/tool'
import Cookies from 'js-cookie'
const triggerFrom = '触发来源'

@withRouter
@connect(state => ({
  userStatus: state.userStatus,
  supers: state.supers,
  banner: state.banner,
  query: state.search.query,
}))
@createForm()
class MySearchBar extends PureComponent {
  static propTypes = {
    callback: PropTypes.func,
    searchFocus: PropTypes.func,
    touchCancel: PropTypes.func,
    defaultValue: PropTypes.string,
    placeholder: PropTypes.string,
    showCity: PropTypes.string,
    cityName: PropTypes.string,
    autoFocus: PropTypes.bool,
  }
  constructor(props) {
    super(props)
    this.state = {
      is_login: '',
      photo: '',
      searchCityArr: [],
    }
  }

  formatArea(value) {
    return value.length ? value.optIndex[value[0]] : '城市'
  }

  goRegister = () => {
    window.zhuge.track('注册页面打开', {
      [`${triggerFrom}`]: '首页个人中心icon',
    })
  }

  componentDidMount() {
    if (this.props.autoFocus) {
      this.autoFocusInst.focus()
    }
    this.setState({
      is_login: F.getUserInfo().is_login,
      photo: F.getUserInfo().photo,
    })
    // const searchCity = sessionStorage.getItem('searchCity')
    const searchCity = Cookies.get('searchCity')
    if (searchCity) {
      let searchCityArr = [searchCity]
      this.setState({
        searchCityArr,
      })

    }
    // const { supers } = this.props
    // this.props.dispatch(changeAllCity([]))
    // setTimeout(()=>{
    //   console.log(supers.location.address.code)

    // },500)
      // this.props.dispatch({
      //   type: 'HOME_CHANGE_CITY',
      //   area: supers.location.address.code,
      // })
    // const { supers } = this.props // userStatus
  }

  componentWillReceiveProps(nextProps) {
    // const { query } = this.props // userStatus
    
    // console.log(nextProps.supers.location.address.code)

    // if (
    //   query.area.length === 0 &&
    //   nextProps.supers.location.address.code.length > 0
    // ) {
  
    // }
   
    this.props.form.validateFields((err, values) => {
      if (err) return
 
      if (values.areas && nextProps.userStatus.code && nextProps.userStatus.code[0] !== values.areas[0]) {
      
        this.props.onChangeCity && this.props.onChangeCity(values)
        this.props.dispatch({
          type: 'SEARCH_AREA_SINGLE',
          payload: values.areas,
        })
      }
   
    })

    // const searchCity = sessionStorage.getItem('searchCity')
    const searchCity = Cookies.get('searchCity')
    if (searchCity && this.props.supers.location.address1.code[0] !== searchCity) {
      this.props.dispatch({
        type: 'JOB_PAGE_CITY_CODE_SET',
        area: [searchCity],
      })
    }
  }

  render() {
    const { form, supers } = this.props // userStatus
    const { getFieldProps } = form
    const {searchCityArr} = this.state
    let {
      callback = function() {},
      defaultValue,
      placeholder,
      showCity,
      searchFocus = function() {},
      touchCancel = function() {},
      onChange = function() {},
    } = this.props
    const { is_login, photo } = this.state

    return (
      <div className={style.SearchBarWrap}>
        {showCity === 'false' ? null : (
          <div className={style.leftContant}>
            <div>
              <Area
                {...getFieldProps('areas', {
                  initialValue: searchCityArr.length>0 ? searchCityArr:supers.location.address.code,
                })} // 触发form，调用onChangeCity
                extra=""
                format={this.formatArea}
              >
                <SimpleItem arrow="horizontal" />
              </Area>
            </div>
            <img src={angleDown} alt="img" />
          </div>
        )}
        <div
          className={`${style.search} ${
            showCity === 'false' ? style.paddingAdd : null
          }`}
        >
          <SearchBar
            defaultValue={defaultValue}
            onSubmit={val => callback(val)}
            onFocus={() => searchFocus()}
            ref={ref => (this.autoFocusInst = ref)}
            onCancel={() => touchCancel()}
            onChange={val => onChange(val)}
            className={style.bac}
            placeholder={placeholder}
          />
          {this.props.searchCarousel ? (
            <Carousel
              className={style.searchCarousel}
              vertical
              dots={false}
              dragging={false}
              swiping={false}
              autoplay
              infinite
            >
              <div className={style.searchItem}>
                <img src={searchIocn} />
                搜索职位/公司
              </div>
              <div className={style.searchItem}>{`${
                this.props.banner.job_nums
              }个职位更新`}</div>
            </Carousel>
          ) : null}
        </div>
        {this.props.SearchUser ? (
          <Link
            to={
              is_login
                ? `/user?redirect=${this.props.location.pathname}`
                : `/user/register?redirect=${this.props.location.pathname}`
            }
            onClick={this.goRegister}
          >
            {is_login ? (
              <img
                src={photo ? photo : Userdefault}
                alt=""
                className={style.personalUser}
              />
            ) : (
              <img src={personal} alt="" className={style.personal} />
            )}
          </Link>
        ) : null}
      </div>
    )
  }
}

export default MySearchBar
