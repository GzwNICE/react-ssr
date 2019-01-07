import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'
import { ListView } from 'antd-mobile'
import { blocList, blocCategory } from '../../../actions/company'
import companyLogo from '../../../static/detailLogo.png'
import missing from '../../../static/missing.png'
import style from '../style.less'

@connect(state => {
  return {
    list: state.company.list,
    pagers: state.company.pager,
    listPhoto: state.company.listPhoto,
    brand: state.company.brand,
  }
})
class CompanyList extends Component {
  constructor(props) {
    super(props)
    const dataSource = new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1 !== row2,
    })
    this.state = {
      dataSource,
      page: 1,
      isLoading: true,
      height: 0,
    }
  }

  /* 上拉加载 */
  onEndReached = () => {
    const page = this.state.page + 1
    const allPage = this.props.pagers && this.props.pagers.allPage
    const c_userid = this.props.match.params.c_userid
    this.setState({
      page: page,
    })
    if(page <= allPage) {
      this.props.dispatch(blocList({
        c_userid: c_userid,
        page: page,
        // location: this.props.userStatus.code && (this.props.userStatus.code[0] || ''),
      })).then(data => {
        let Source = this.state.dataSource._dataBlob.s1.concat(data.data.list)
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(Source),
        })
      })
    } else {
      this.setState({
        isLoading: false,
      })
    }
    
  }

  onScroll = () => {
    let top = document.body.scrollTop || document.documentElement.scrollTop
    this.scrollTop = top
  }

  componentDidMount() {
    const c_userid = this.props.match.params.c_userid
    const height = document.documentElement.clientHeight - ReactDOM.findDOMNode(this.lv).parentNode.parentNode.offsetTop;
    this.setState({
      height: height,
    })
    // 请求名企品牌分类
    this.props.dispatch(blocCategory({
      c_userid: c_userid,
    }))
  }

  componentWillReceiveProps(nextProps) {
    if(this.props.list !== nextProps.list){
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(nextProps.list && nextProps.list),
      })
      if(nextProps.list.length <= 20 && nextProps.pagers.allPage === 1){
        this.setState({
          isLoading: false,
          
        })
      }
    }
  }

  render() {
    const individuation = this.props.listPhoto.company_file
    const Row = d => {
      return this.state.dataSource ?  (
        <Link
          rel="stylesheet"
          to={`/${d.c_userid}?redirect=${this.props.location.pathname}`}
          key={d.c_userid}
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
      ) : (<div className={style.missing}>
        <img src={missing} alt="" />
        <p>暂无职位，可以切换条件试试哦~</p>
      </div>)
    }
    return (
      <div className={style.companyList}>
        <ListView
          ref={el => this.lv = el}
          className={style['override-am-list-view-scrollview-content']}
          dataSource={this.state.dataSource}
          renderRow={Row}
          scrollRenderAheadDistance={100}
          onEndReachedThreshold={200}
          scrollEventThrottle={100}
          initialListSize={0}
          pageSize={2000}
          onScroll={this.onScroll}
          style={{
            height: this.state.height,
            overflow: 'auto',
          }}
          renderHeader={() => (
            <div className={style.individuation} style={{
              backgroundImage: `url(${individuation})`,
            }}>
            </div>)
          }
          onEndReached={this.onEndReached}   // 上拉加载
          renderFooter={() => (
            <div style={{ padding: 5, textAlign: 'center' }}>
              {this.state.isLoading ? 'Loading...' : '没有更多了'}
            </div>
          )}
        />
      </div>
    )
  }
}
export default withRouter(CompanyList)
