/**
 * Created by gaozhiwen on 2019/1/13
 */
import React, { PureComponent } from 'react'
import NavBack from '../../components/Back'
import { connect } from 'react-redux'
import { answerOpinion } from '../../actions/home'
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
  replacleHtml = (d = '') => {
    return d.replace(/style/g, 'styles')
  }

  componentDidMount() {
    const id = this.props.match.params.id
    this.props.dispatch(
      answerOpinion({
        appchannel: 'web',
        id: id,
      })
    )
  }

  render() {
    const data = this.props.reply
    return (
      <div className={style.problemPage}>
        <NavBack title="常见问题解答" />
        <div
          className={style.answerBox}
          style={{
            height: 'calc(100vh - 0.95rem)',
          }}
        >
          <div className={style.question}>{`Q：${data.title}`}</div>
          <div
            className={style.answer}
            dangerouslySetInnerHTML={{
              __html: this.replacleHtml(data.content),
            }}
          />
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
