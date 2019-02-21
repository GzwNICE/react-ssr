import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'
import { ListView } from 'antd-mobile'
import { saveScrollTop,blocList, blocCategory, blocSearch } from '../../../actions/bloc'
import JobList from '../../../components/JobList'
import companyLogo from '../../../static/detailLogo.png'
import missing from '../../../static/missing.png'
import {  } from '../../../actions/home'
import style from '../style.less'
const triggerFrom = '触发来源'

@connect(state => {
  return {
    list: state.bloc.list,
    pagers: state.bloc.pager,
    listPhoto: state.bloc.listPhoto,
    brand: state.bloc.brand,
    searchList: state.bloc.searchList,
    searchPager: state.bloc.searchPager,
    query: state.search.query,
    blocDate: state.bloc,
  }
})
class CompanyList extends Component {
  constructor(props) {
    super(props)

    const dataSource = new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1 !== row2,
    })
    this.state = {
      dataSource: this.props.searchEnd
        ? dataSource.cloneWithRows(this.props.searchList)
        : dataSource.cloneWithRows(this.props.list),
      // page: 1,
      isLoading: true,
      height: 0,
    }
  }

  /* 上拉加载 */
  onEndReached = () => {
    const c_userid = this.props.match.params.c_userid
    if (this.props.searchEnd) {
      const page = this.props.searchPager.page + 1
      const allPage = this.props.searchPager.allpages
      if (page <= allPage) {
        this.props.dispatch(
          blocSearch({
            c_userid: c_userid,
            page: page,
            local: this.props.query.area ? this.props.query.area : '',
            c_id: this.props.query.brand ? this.props.query.brand : '',
            key_words: this.props.query.keywords
              ? this.props.query.keywords
              : '',
          })
        )
      } else {
        this.setState({
          isLoading: false,
        })
      }
    } else {
      const page = this.props.pagers.cur + 1
      const allPage = this.props.pagers.allPage
      if (page <= allPage) {
        this.props.dispatch(
          blocList({
            c_userid: c_userid,
            page: page,
          })
        )
      } else {
        this.setState({
          isLoading: false,
        })
      }
    }
  }

  onScroll = () => {
    const top = ReactDOM.findDOMNode(this.lv).scrollTop
    this.scrollTop = top
  }

  goPostion = () =>{
    window.zhuge.track('职位详情页打开', {
      [`${triggerFrom}`]: '名企搜索列表页',
    })
  }

  goCompany = () =>{
    window.zhuge.track('企业详情页打开', {
      [`${triggerFrom}`]: '名企列表页',
    })
  }

  componentDidMount() {
     /* 初始化this.scrollTop */
    this.scrollTop = this.props.blocDate.scrollTop
    if(ReactDOM.findDOMNode(this.lv)){
      ReactDOM.findDOMNode(this.lv).scrollTop = this.scrollTop
    }
    const c_userid = this.props.match.params.c_userid
    const height =
      document.documentElement.clientHeight -
      ReactDOM.findDOMNode(this.lv).parentNode.parentNode.offsetTop
    this.setState({
      height: height,
    })
    // 请求名企品牌分类
    this.props.dispatch(
      blocCategory({
        c_userid: c_userid,
      })
    )
  }

  componentWillReceiveProps(nextProps) {
    const scrollTop = nextProps.blocDate.scrollTop
    if (nextProps.searchEnd) {
      if (this.props.searchList !== nextProps.searchList) {
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(nextProps.searchList),
        })
        if (
          nextProps.searchList.length <= 20 &&
          nextProps.searchPager.allPage === 1
        ) {
          this.setState({
            isLoading: false,
          })
        }
        if(ReactDOM.findDOMNode(this.lv)){
          ReactDOM.findDOMNode(this.lv).scrollTop(0,scrollTop)
        }
        
      }
    } else {
      if (
        (!nextProps.searchEnd && nextProps.list.length > 0) ||
        this.props.list !== nextProps.list
      ) {
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(nextProps.list),
        })
        if (nextProps.list.length <= 20 && nextProps.pagers.allPage === 1) {
          this.setState({
            isLoading: false,
          })
        }
      }
      if(ReactDOM.findDOMNode(this.lv)){
        ReactDOM.findDOMNode(this.lv).scrollTop=scrollTop
      }
      
    }
  }

  componentWillUnmount(){
    this.props.dispatch(saveScrollTop(this.scrollTop))
  }

  render() {
    const Row = d => {
      return this.props.searchEnd ? (
        <Link
          rel="stylesheet"
          to={`/${d.c_userid}/${d.job_id}?redirect=${
            this.props.location.pathname
          }`}
          key={d.job_id}
          onClick={this.goPostion}
        >
          <JobList.JobList data={d} />
        </Link>
      ) : (
        <Link
          rel="stylesheet"
          to={`/${d.c_userid}?redirect=${this.props.location.pathname}`}
          key={d.c_userid}
          onClick={this.goCompany}
        >
          <div className={style.ContentModule}>
            <img
              src={d.company_logo ? d.company_logo : companyLogo}
              alt="img"
            />
            <div className={style.inviteInfo}>
              <h1>{d.company_name}</h1>
              <div className={style.scale}>
                {d.current_location ? <span>{d.current_location}</span> : null}
                {d.company_type ? <span>{d.company_type}</span> : null}
                {d.employees_number ? <span>{d.employees_number}</span> : null}
              </div>
              <div className={style.inRecruit}>
                <span>{d.jobNum}</span>个在招职位
              </div>
            </div>
          </div>
        </Link>
      )
    }
    return (
      <div className={style.companyList}>
        <ListView
          ref={el => (this.lv = el)}
          className={style['override-am-list-view-scrollview-content']}
          dataSource={this.state.dataSource}
          renderRow={Row}
          scrollRenderAheadDistance={100}
          onEndReachedThreshold={200}
          scrollEventThrottle={100}
          initialListSize={20}
          pageSize={20}
          onScroll={this.onScroll}
          style={{
            height: this.state.height,
            overflow: 'auto',
          }}
          renderHeader={() =>
            this.props.searchEnd ? null : (
              <div
                className={style.individuation}
                style={{
                  backgroundImage: `url(${this.props.listPhoto.company_file})`,
                }}
              />
            )
          }
          onEndReached={this.onEndReached} // 上拉加载
          renderFooter={() =>
            this.props.hasList ? (
              this.state.dataSource._cachedRowCount ? (
                <div style={{ padding: 5, textAlign: 'center' }}>
                  {this.state.isLoading ? 'Loading...' : '没有更多了'}
                </div>
              ) : this.props.searchEnd ? (
                <div className={style.missJob}>
                  <img src={missing} alt="" />
                  <p>暂无职位，可以切换条件试试哦~</p>
                </div>
              ) : (
                <div className={style.missing}>
                  <p>当前条件下暂无公司，可以切换条件试试哦~</p>
                </div>
              )
            ) : null
          }
        />
      </div>
    )
  }
}
export default withRouter(CompanyList)
