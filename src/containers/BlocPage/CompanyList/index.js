import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'
import { ListView ,WhiteSpace} from 'antd-mobile'
import { blocList, blocCategory } from '../../../actions/company'
import companyLogo from '../../../static/detailLogo.png'
import style from '../style.less'

@connect(state => {
  return {
    list: state.company.list,
    pagers: state.company.pager,
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
      individuation:
      'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1544442642838&di=c8f9fe705e692237102ddfc3c5fcb07b&imgtype=0&src=http%3A%2F%2Fh.hiphotos.baidu.com%2Fzhidao%2Fwh%253D450%252C600%2Fsign%3D4916d4fafe1f4134e0620d7a102fb9fc%2F96dda144ad3459825dbfac8b0ff431adcbef84f6.jpg',
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
    this.props
      .dispatch(
        blocList({
          c_userid: c_userid,
        })
      )
      .then(data => {
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(data.data.list),
        })
      })
  }

  render() {
    const Row = d => {
      return (
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
                <span>{d.current_location}</span>
                <span>{d.company_type}</span>
                <span>{d.employees_number}</span>
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
          ref={el => this.lv = el}
          className={style['override-am-list-view-scrollview-content']}
          dataSource={this.state.dataSource}
          renderRow={Row}
          scrollRenderAheadDistance={100}
          onEndReachedThreshold={20}
          scrollEventThrottle={100}
          initialListSize={0}
          pageSize={2000}
          onScroll={this.onScroll}
          style={{
            height: this.state.height,
            overflow: 'auto',
          }}
          renderHeader={() => (
            <div className={style.individuation}>
              <img src={this.state.individuation} alt="" />
            </div>)
          }
          onEndReached={this.onEndReached} // 上拉加载
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
