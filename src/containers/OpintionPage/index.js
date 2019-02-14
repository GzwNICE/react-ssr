/**
 * Created by gaozhiwen on 2019/1/13
 */
import React, { PureComponent } from 'react'
import NavBack from '../../components/Back'
import Cookies from 'js-cookie'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import {questionOpinion} from '../../actions/home'
import coupleback from '@static/coupleback.png'
import Rectangle from '@static/Rectangle@3x.png'
import style from './style.less'
const triggerFrom = '来源'
const triggerIssue = '问题'

@withRouter
@connect(state => {
  return {
    issuesList: state.home.issuesList,
  }
})
class OpintionPage extends PureComponent {

  goNextpage = (url, key, val) => {
    if(key === 1){
      window.zhuge.track('我要反馈',{
        [`${triggerFrom}`] : '帮助与反馈',
      })
    }else {
      window.zhuge.track('常见问题解答', {
        [`${triggerIssue}`] : val,
      })
    }
    
    if (Cookies.get('ticket')) {
      this.props.history.push(url)
    } else {
      this.props.history.push(
        '/user/register?redirect=' + this.props.history.location.pathname,
        { key: '我的' }
      )
    }
  }

  componentDidMount(){
    this.props.dispatch(questionOpinion({
      appchannel: "web",
    }))
  }


  render() {
    const issuesList = this.props.issuesList
    return (
      <div className={style.OpintionPage}>
        <NavBack title="帮助与反馈"/>
        <div className={style.feedback} onClick={() => {
          this.goNextpage(`/coupleBack?redirect=${this.props.history.location.pathname}`, 1 , '帮助与反馈')
        }}>
          <img src={coupleback} alt="" className={style.left}/>
          <span>我要反馈</span>
          <img src={Rectangle} alt="" className={style.right} />
        </div>
        <div className={style.questionList}>
          <div className={style.issue}>常见问题解答</div>
          <div className={style.issueList}>
            {issuesList ? issuesList.map(i =>{
              return (
                <div className={style.issueSingle} onClick={() => {
                  this.goNextpage(`/problem/${i.id}`, 2, i.title)
                }} key={i.id}>
                  <span>{i.title}</span>
                  <img src={Rectangle} alt="" />
                </div>
              )
            }): null}
          </div>
        </div>
      </div>
    )
  }
}

export default OpintionPage
