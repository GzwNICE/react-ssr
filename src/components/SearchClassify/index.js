/**
 * Created by huangchao on 2017/9/22.
 */
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import style from './style.less'
// import search from '@static/search@3x.png'
// import rectangle from '@static/Rectangle@3x.png'

class SearchClassify extends PureComponent {
  static propTypes = {
    src: PropTypes.string,
    title: PropTypes.string,
    data: PropTypes.array,
    callback: PropTypes.func,
  }
  callback = () => { // 当点击'查看更多'的时候，返回关键词
    let keyword = this.props.keyWord
    let scope = this.props.scope
    this.props.callback({
      keyword,
      scope,
    })
  }

  replaceFont = (d) => {
    let searchis = this.props.keyWord
    let result = []
    let split = d.split(new RegExp(searchis, 'g'))
    split.forEach((item, index) => {
      result.push(item)
      if (index < split.length - 1) {
        result.push(<span key={index} className={style.active}>{searchis}</span>)
      }
    })
    return result
  }
  render() {
    let { data = [], callback, scope} = this.props
    return (
      <div className={style.SearchClassify}>
       
        <div className={style.item}>
          <ul>
            {
              data.map((d, i) => (
                <li key={i} onClick={() => callback({keyword:d, scope:scope})}>
                  <span className={style.name}>{this.replaceFont(d)}</span>
                </li>
              ))
            }
          </ul>
          
        </div>
      </div>
    )
  }
}

export default SearchClassify
