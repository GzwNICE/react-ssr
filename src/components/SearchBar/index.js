/**
 * Created by huangchao on 2017/9/28.
 */
import React, { PureComponent } from 'react'
import { withRouter } from 'react-router-dom'
import style from './style.less'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { SearchBar } from 'antd-mobile'
import SimpleItem from '../../inputs/SimpleItem'
import { createForm } from 'rc-form'
import { Link } from 'react-router-dom'
import Area from '../../inputs/Area'
import angleDown from '../../static/angleDown@3x.png'
import personal from '../../static/personalHome.png'
import { loggingStatus } from '../../actions/userStatus'
import SearchUser from './SearchUser'
import { domainToASCII } from 'url';

@withRouter
@connect(state => ({
  userStatus: state.userStatus,
  supers: state.supers,
  is_login: state.userStatus.is_login,
  photo: state.userStatus.photo,
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
      is_login: false,
      photo: '',
    }
  }

  formatArea(value) {
    return value.length ? value.optIndex[value[0]] : '城市'
  }

  componentDidMount() {
    if (this.props.autoFocus) {
      this.autoFocusInst.focus()
    }

    this.props.dispatch(loggingStatus({})).then(() => {
      this.setState({
        is_login: this.props.is_login,
        photo: this.props.photo,
      })
    })
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
    const { photo, is_login } = this.state
    return (
      <div className={style.SearchBarWrap}>
        {showCity === 'false' ? null : (
          <div className={style.leftContant}>
            <div>
              <Area
                {...getFieldProps('areas', {
                  initialValue: supers.location.address.code,
                })} // 触发form，调用onChangeCity
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
        </div>
        {this.props.SearchUser ? (
          <Link
            rel="stylesheet"
            to={
              is_login
                ? `/tabs/user?redirect=${this.props.location.pathname}`
                : `/user/register?redirect=${this.props.location.pathname}`
            }
          >
            <img
              src={is_login ? photo : personal}
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
