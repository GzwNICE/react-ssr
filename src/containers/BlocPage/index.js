import React, { Component } from 'react'
import * as Ad from '../../components/Ad'
import Search from '../../components/SearchBar/Search'
import { Toast } from 'antd-mobile'
import { connect } from 'react-redux'
import queryString from 'query-string'
// import { createForm } from 'rc-form'
import {
  blocList,
  blocSearch,
  blocSearchClear,
  blocListClear,
} from '../../actions/company'
import { saveQuery, saveSearch } from '../../actions/search'
import CompanyList from './CompanyList'
import FilterList from './FilterList'
import RegisterWrap from '../../components/RegisterWrap'
import style from './style.less'

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
    // window.zhuge.track('下载App')
    window.location.href = 'https://m.veryeast.cn/mobile/index.html?c=mobile' //"BaiduDsp://activity.veryeast.cn/baidu/mobile/index"
  }

  // 关闭底部引导注册弹框
  handleCloseReg() {
    this.setState({
      showRegWrap: false,
    })
  }

  handleFilerSearch = (value = {}) => {
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
    const { redirect } = queryString.parse(window.location.search)
    if (redirect) {
      this.props.history.replace(redirect)
    } else {
      this.props.history.replace('/home')
    }
  }

  onSubmit = value => {
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
      })
    )
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
    Toast.loading('Loading...');
    const c_userid = this.props.match.params.c_userid
    const { listPhoto } = this.props
    if (JSON.stringify(listPhoto) === '{}') {
      this.props.dispatch(
        blocList({
          c_userid: c_userid,
          local: '',
          c_id: '',
        })
      ).then(res=>{
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
    if (
      nextProps.query.area !== this.props.query.area ||
      nextProps.query.brand !== this.props.query.brand ||
      nextProps.searchState !== this.props.searchState
    ) {
      if (nextProps.searchState) {
        this.props.dispatch(
          blocSearch({
            c_userid: c_userid,
            local: nextProps.query.area[0] ? nextProps.query.area[0] : '',
            c_id: nextProps.query.brand[0] ? nextProps.query.brand[0] : '',
            key_words: nextProps.query.keywords && nextProps.query.keywords,
          })
        )
      } else {
        this.props.dispatch(
          blocList({
            c_userid: c_userid,
            local: nextProps.query.area[0] ? nextProps.query.area[0] : '',
            c_id: nextProps.query.brand[0] ? nextProps.query.brand[0] : '',
          })
        )
      }
    }
  }

  componentWillUnmount() {
    this.props.dispatch(blocListClear())
  }
  render() {
    const { show, showRegWrap, is_login } = this.state
    return (
      <div className={style.CompanyArea}>
        <div className={style.selHead}>
          <Ad.AdTop show={show} downLoadAd={this.downLoadAd} />
          <Search
            searchValue={this.state.searchValue}
            goBack={this.whereWillIGo}
            Search={this.onSubmit}
            Cancel={this.onCancel}
            Change={this.onChange}
            visable={this.state.isVisable}
          />
          <FilterList
            // wrappedComponentRef={inst => (this.formRef = inst)}
            filterList={this.handleFilerSearch}
          />
        </div>
        <div className={style.blocCentent}>
          <CompanyList searchEnd={this.state.search} hasList={this.state.hasList}/>
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
