/**
 * Created by gaozhiwen on 2019/1/13
 */
import React, { PureComponent } from 'react'
import NavBack from '../../components/Back'
import Cookies from 'js-cookie'
import { withRouter } from 'react-router-dom'
import style from './style.less'
import coupleback from '../../static/coupleback.png'
import Rectangle from '../../static/Rectangle@3x.png'

@withRouter
class OpintionPage extends PureComponent {

  goNextpage = (url, key) => {
    window.zhuge.track(key)
    if (Cookies.get('ticket')) {
      this.props.history.push(url)
    } else {
      this.props.history.push(
        '/register?redirect=' + this.props.history.location.pathname,
        { key: '我的' }
      )
    }
  }

  render() {
    return (
      <div className={style.OpintionPage}>
        <NavBack title="帮助与反馈"/>
        <div className={style.feedback} onClick={() => {
          this.goNextpage(`/coupleBack?redirect=${this.props.history.location.pathname}`, '帮助与反馈')
        }}>
          <img src={coupleback} alt="" className={style.left}/>
          <span>我要反馈</span>
          <img src={Rectangle} alt="" className={style.right} />
        </div>
        <div className={style.questionList}>
          <div className={style.issue}>常见问题解答</div>
          <div className={style.issueList}>
            <div className={style.issueSingle} onClick={() => {
              this.goNextpage('/problem', '常见问题解答')
            }}>
              <span>找到工作了，如何删除我的简历？</span>
              <img src={Rectangle} alt="" />
            </div>
            <div className={style.issueSingle} onClick={() => {
              this.goNextpage('/problem', '常见问题解答')
            }}>
              <span>没找到工作，如何设置我的简历？</span>
              <img src={Rectangle} alt="" />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default OpintionPage
