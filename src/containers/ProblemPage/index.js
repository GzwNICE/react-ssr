/**
 * Created by gaozhiwen on 2019/1/13
 */
import React, { PureComponent } from 'react'
import NavBack from '../../components/Back'
import { withRouter } from 'react-router-dom'
import answer from '../../static/answer.png'
import style from './style.less'

@withRouter
class ProblemPage extends PureComponent {
  render() {
    return (
      <div className={style.problemPage}>
        <NavBack title="常见问题解答" />
        <div className={style.answerBox} style={{
          height: 'calc(100vh - 0.95rem)',
        }}>
          <div className={style.question}>
            Q：找到工作了，如何删除我的简历？
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
