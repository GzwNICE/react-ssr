/**
 * Created by gaozhiwen on 2019/1/13
 */
import React, { PureComponent } from 'react'
import NavBack from '../../components/Back'
import { connect } from 'react-redux'
import {answerOpinion} from '../../actions/home'
import { withRouter } from 'react-router-dom'
import answer from '../../static/answer.png'
import style from './style.less'

@withRouter
@connect(state => {
  return {
    reply: state.home.reply,
  }
})
class ProblemPage extends PureComponent {

  componentDidMount(){
    const id = this.props.match.params.id
    this.props.dispatch(answerOpinion({
      appchannel: "web",
      id: id,
    })).then((data)=>{
      console.log(data);
    })
  }

  render() {
    // const data = 'this.props.issuesList.find((i)=>(i.id === this.props.match.params.id))' || ''
    const data = ''
    return (
      <div className={style.problemPage}>
        <NavBack title="常见问题解答" />
        <div className={style.answerBox} style={{
          height: 'calc(100vh - 0.95rem)',
        }}>
          <div className={style.question}>
            {`Q：${data.title}`}
          </div>
          <div className={style.answer}>
            简历是最佳东方账号必须的，暂时不允许删除
          </div>
          <img src={answer} alt="" />
        </div>
        <div
          className={style.commit}
          onClick={() => {
            this.props.history.push(
              `/coupleBack?redirect=${this.props.history.location.pathname}`
            )
          }}
        >
          我要反馈
        </div>
      </div>
    )
  }
}

export default ProblemPage
