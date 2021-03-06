/**
 * Created by huangchao on 2017/9/21.
 */
import React, { PureComponent } from 'react'
// import searchHistory from '../../static/search_history.png'
import deleteHistory from '../../static/delete_history@3x.png'
// import Rectangle from '../../static/Rectangle@3x.png'
import style from './style.less'
// import PropTypes from 'prop-types'

class SearchHistory extends PureComponent {
  static propTypes = {}
  state = {
    searchHis: [],
  }
  deleteHistory = () => {
    localStorage.removeItem('m:searchHis')
    this.setState({
      searchHis: [],
    })
  }

  componentDidMount() {
    const searchHis = JSON.parse(localStorage.getItem('m:searchHis') || '[]')
    const data = searchHis === 'undefined' ? [] : searchHis.slice(0, 5)
    this.setState({
      searchHis: data,
    })
  }
  // <img className={`${style.titleImg} ${style.imgMargin}`} src={searchHistory} alt="hot" />

  render() {
    return (
      <div className={style.searchHistoryBox}>
        <div className={style.titleBox}>
          <div className={style.title}>
            <span>搜索记录</span>
          </div>
          <div onClick={this.deleteHistory}>
            {this.state.searchHis.length ? (
              <img
                className={style.titleImg}
                src={deleteHistory}
                alt="delete_history"
              />
            ) : null}
          </div>
        </div>
        <div className={style.historyItem}>
          <ul>
            {this.state.searchHis.length ? (
              this.state.searchHis.map((d, i) => {
                return !/^\s+$/.test(`${d}`) ? (
                  <li key={i} onClick={() => this.props.callback(d)}>
                    {d}
                  </li>
                ) : null
              })
            ) : (
              <p className={style.noData}>近期暂无搜索记录</p>
            )}
          </ul>
        </div>
      </div>
    )
  }
}

export default SearchHistory
