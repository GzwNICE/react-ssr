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
import Area from '../../inputs/Area'
import searchIocn from '../../static/searchIocn.png'
import angleDown from '../../static/angleDown@3x.png'
import personal from '../../static/personalHome.png'
import Userdefault from '../../static/portrait@3x.png'
// const tiggerCity = '城市'
const triggerFrom = '触发来源'

@withRouter
@connect(state => ({
  userStatus: state.userStatus,
  supers: state.supers,
  banner: state.banner,
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
    }
  }

  formatArea(value) {
    return value.length ? value.optIndex[value[0]] : '城市'
  }

  goRegister = () => {
    window.zhuge.track('注册页面打开', { [`${triggerFrom}`]: '首页个人中心icon' })
  }

  componentDidMount() {
    if (this.props.autoFocus) {
      this.autoFocusInst.focus()
    }
    this.setState({
      is_login: sessionStorage.getItem('is_login')
        ? sessionStorage.getItem('is_login')
        : '',
      photo: sessionStorage.getItem('photo')
        ? sessionStorage.getItem('photo')
        : '',
    })
  }

  componentWillReceiveProps(nextProps) {
    this.props.form.validateFields((err, values) => {
      if (err) return
      if (values.areas && nextProps.userStatus.code !== values.areas) {
        this.props.onChangeCity && this.props.onChangeCity(values)
        this.props.dispatch({
          type: 'SEARCH_AREA_SINGLE',
          payload: values.areas,
        })
      }
    })
  }

  render() {
    const { form, supers } = this.props // userStatus
    const { getFieldProps } = form
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
            <div >
              <Area
                {...getFieldProps('areas', {
                  initialValue: supers.location.address.code,
                })} // 触发form，调用onChangeCity
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
            <img
              src={is_login ? (photo ? photo : Userdefault) : personal}
              alt="img"
              className={style.personal}
              
            />
          </Link>
        ) : null}
      </div>
    )
  }
}

export default MySearchBar
