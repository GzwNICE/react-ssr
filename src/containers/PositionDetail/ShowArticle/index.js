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
    // window.zhuge.track('举报该职位', {
    //   id: d,
    // })

    this.props.history.push('/tip-offs', { d })
  }
  render() {
    const description =
      this.props.data.decription || this.props.data.description
    const other = this.props.data.other || this.props.data.other
    return (
      <div className={style.articleWrap}>
        <div className={style.title}>{this.props.title}</div>
        {this.props.data.apply_nums ? (
          <div className={style.recruitingNum}>{`招聘人数：${
            this.props.data.apply_nums
          }人`}</div>
        ) : null}
        <div className={style.moreArticle}>
          <div
            className={style.backArticle}
            dangerouslySetInnerHTML={{ __html: this.replacleHtml(description) }}
          />
          {JSON.stringify(other) === '[]' ? null : (
            <div className={style.otherRequire}>
              <h4>其他要求</h4>
              <ul className={style.priority}>
                {(other || []).map((item, index) => {
                  return <li key={index}>{item}</li>
                })}
              </ul>
            </div>
          )}

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
