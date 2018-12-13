import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
// import selesct from '../../static/select.png'
import style from '../style.less'

class ShowArticle extends PureComponent {
  static propTypes = {
    title: PropTypes.string,
    src: PropTypes.string,
  }

  replacleHtml = (d = '') => {
    return d.replace(/style/g, 'styles')
  }

  report = d => {
    window.zhuge.track('举报该职位', {
      id: d,
    })
    this.props.history.push('/tip-offs', { d })
  }
  render() {
    const description =
      this.props.data.decription || this.props.data.description
    return (
      <div className={style.articleWrap}>
        <div className={style.title}>{this.props.title}</div>
        <div className={style.moreArticle}>
          <div
            className={style.backArticle}
            dangerouslySetInnerHTML={{ __html: this.replacleHtml(description) }}
          />
          <div className={style.otherRequire}>
            <h4>其他要求</h4>
            <ul className={style.priority}>
              <li>国际联号工作经验：优先</li>
              <li>国内管理公司经验：优先</li>
              <li>年龄要求：20-35岁</li>
              <li>语言要求：英语-精通,法语-熟练</li>
              <li>现居住地：杭州</li>
            </ul>
          </div>
          <div
            onClick={() => this.report(this.props.data.job_id)}
            className={style.report}
          >
            举报该职位
          </div>
        </div>
      </div>
    )
  }
}

export default ShowArticle
