/**
 * Created by huangchao on 2017/9/25.
 */
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import style from './style.less'
// import xiala from '../../static/xiala@3x.png'
import shangla from '../../static/shangla@3x.png'

class ShowArticle extends PureComponent {
  static propTypes = {
    title: PropTypes.string,
    src: PropTypes.string,
  }
  state = {
    init: false,
  }
  showMore = () => {
    const { title } = this.props
    if (title === '公司介绍') {
      // window.zhuge.track('点击展开公司介绍')
    } else if (title === '职位介绍') {
      // window.zhuge.track('点击展开职位介绍')
    }
    this.setState({
      init: !this.state.init,
    })
  }

  replacleHtml = (d='') => {
    return d.replace(/style/g, 'styles')
  }

  report = d => {
    window.zhuge.track('举报该职位', {
      id: d,
    })
    this.props.history.push('/tip-offs',{d})
  }
  render() {
    const description = this.props.data.decription || this.props.data.description
    return (
      <div className={style.articleWrap}>
        <div className={style.title}>
          <img className={style.titleImg} src={this.props.src} alt="图片" />
          <span>{this.props.title}</span>
        </div>
        <div className={
          this.state.init ? style.moreArticle : style.article
        }>
          <div className={style.backArticle}
               dangerouslySetInnerHTML={{__html:this.replacleHtml(description)}}
          />
          {this.props.type === '2'
            ? null
            :<div onClick={() => this.report(this.props.data.job_id)} className={style.report}>举报该职位</div>
          }
        </div>
        <div onClick={this.showMore} className={style.more}>
          <img className={this.state.init ? style.shangle : style.xiala} src={shangla} alt="图片" />
        </div>
      </div>
    )
  }
}

export default ShowArticle
