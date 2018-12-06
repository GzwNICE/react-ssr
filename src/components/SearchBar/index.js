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
import angleDown from '@static/angleDown@3x.png'
import personal from '@static/headimg@3x.png'



@withRouter
@connect(state => ({
  userStatus: state.userStatus,
  supers: state.supers,
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

  formatArea(value) {
    // console.log(value[0])
    return value.length ? value.optIndex[value[0]] : '城市'
  }

  componentWillMount(){
  }

  componentDidMount() {
    if(this.props.autoFocus) {
      this.autoFocusInst.onFocus()
    }
  }

  componentWillReceiveProps(nextProps) {
    this.props.form.validateFields((err, values) => {
      if(err) return
      if(values.areas && nextProps.userStatus.code !== values.areas) {
        this.props.onChangeCity && this.props.onChangeCity(values)
      }
    })
  }

  render() {
    const { form, supers } = this.props // userStatus
    const { getFieldProps } = form
    // console.log(userStatus, supers)
    // const code = userStatus.code && userStatus.code.length > 0 ? userStatus.code : supers.location.address.code
    // console.log(supers.location.address)
    let { callback = function() {},
      defaultValue,
      placeholder,
      showCity,
      searchFocus = function() {},
      touchCancel = function() {},
      onChange= function() {},
    } = this.props
    return (
      <div className={style.SearchBarWrap}>
        {
          showCity === 'false'
          ? null
          : <div className={style.leftContant}>
            <div>
              <Area {...getFieldProps('areas', { initialValue: supers.location.address.code })} // 触发form，调用onChangeCity
                    format={this.formatArea}>
                <SimpleItem arrow="horizontal" />
              </Area>
            </div>
            <img src={angleDown} alt="img" />
          </div>
        }
        <div className={`${style.search} ${showCity === 'false' ? style.paddingAdd : null}`}>
          <SearchBar
            defaultValue={defaultValue}
            onSubmit={(val) => callback(val)}
            onFocus={() => searchFocus()}
            ref={ref => this.autoFocusInst = ref}
            onCancel={() => touchCancel()}
            onChange={(val) => onChange(val)}
            className={style.bac}
            placeholder={placeholder} />
        </div>
        <Link rel="stylesheet" to={`/tabs/user?redirect=${this.props.location.pathname}`}>
          <img src={personal} alt="img"  className={style.personal} />
        </Link>
      </div>
    )
  }
}

export default MySearchBar
