/**
 * Created by huangchao on 2017/9/25.
 * Changed by gaozhiwen on 2018/12/28  投递简历
 */
import React, { PureComponent } from 'react'
import queryString from 'query-string'
import { Toast } from 'antd-mobile'
import Alert from '../Alert'
import style from './style.less'
import { connect } from 'react-redux'
import select from '../../static/select@3x.png'
import unselect from '../../static/unselect@3x.png'
import validselect from '../../static/validselect.png'
import deliver from '../../static/deliverSuccess@3x.png'
import {
  positionCollect,
  positionUnColiect,
  positionApply,
} from '../../actions/position'
import { getUserStatus } from '../../actions/userStatus'
import { withRouter } from 'react-router-dom'
const triggerFrom = '触发来源'
const triggerPost = '岗位'

@connect(state => ({
  position: state.position,
}))
@withRouter
class PositionBar extends PureComponent {
  state = {
    Success: false, //投递成功弹窗
    toPerfect: false, //简历<40%
    mostPerfect: false, //40%< 简历 <80%
    percentage: '0%', //简历完善度
    perfectContent: 0, //简历不完善弹框内容
  }

  collect = () => {
    const jobId = this.props.position.job_id
    const isFavorited = this.props.position.is_favorited
    if (isFavorited) {
      // 已经收藏
      this.props
        .dispatch(
          positionUnColiect({
            job_id: jobId,
          })
        )
        .then(data => {
          Toast.success('取消收藏', 2)
        })
    } else {
      // 去收藏
      this.props
        .dispatch(
          positionCollect({
            job_id: jobId,
          })
        )
        .then(data => {
          if (data.status === 0) {
            const msg = data.errMsg
            if (msg === '未登陆') {
              this.goLogin('收藏')
              window.zhuge.track('注册页面打开', {
                [`${triggerFrom}`]: '职位收藏',
              })
            }
          } else {
            Toast.success('收藏成功', 2)
            window.zhuge.track('收藏', {
              [`${triggerPost}`]: this.props.position.job_name,
            })
          }
        })
    }
  }
  showModal = key => e => {
    if (e) e.preventDefault() // 修复 Android 上点击穿透
    this.setState({
      [key]: true,
    })
  }

  onClose = key => () => {
    this.setState({
      [key]: false,
    })
  }

  toEmploy = () => {
    const isApplied = this.props.position.is_applied
    const toPerfect = this.showModal('toPerfect')
    const mostPerfect = this.showModal('mostPerfect')
    if (!isApplied) {
      this.props
        .dispatch(
          getUserStatus({
            appchannel: 'web',
          })
        )
        .then(data => {
          if (data.status === 0) {
            const msg = data.errMsg
            if (msg === '未登陆') {
              this.goLogin('应聘')
              window.zhuge.track('注册页面打开', {
                [`${triggerFrom}`]: '投递简历',
              })
            }
          } else if (data.data.resume_complete < 0.01) {
            this.setState({
              perfectContent: 0, //没有简历
            })
            toPerfect()
            return
          } else if (data.data.true_name === '') {
            this.setState({
              perfectContent: 1, //简历没有姓名
            })
            toPerfect()
            return
          } else if (data.data.resume_complete < 0.4) {
            this.setState({
              perfectContent: 2, //简历完整度<40
            })
            toPerfect()
            return
          } else if (
            data.data.resume_complete > 0.4 &&
            data.data.resume_complete < 0.8 // 40 <简历完整度 < 80
          ) {
            mostPerfect()
            this.setState({
              percentage: `${data.data.resume_complete * 100}%`,
            })
            return
          } else {
            this.deliver()
          }
        })
    }
  }

  // 投递简历
  deliver() {
    const jobId = this.props.position.job_id
    const { from } = queryString.parse(this.props.history.location.search)
    const success = this.showModal('Success')
    this.props
      .dispatch(
        positionApply({
          job_id: jobId,
          client_id: 4,
          from: from,
        })
      )
      .then(data => {
        if (data.status === 0) {
          const msg = data.errMsg
          if (msg) {
            return Toast.info(msg, 2)
          } 
        }else {
          success()
        }
      })
  }

  // 暂不完善
  wontGo() {
    this.setState({ mostPerfect: false })
    this.deliver()
  }

  goLogin = key => {
    // const search = this.props.history.location.search
    //   ? this.props.history.location.search
    //   : '?'
    const pathname = this.props.history.location.pathname
    // const url = `/register${search}${
    //   search === '?' ? '' : '&'
    // }redirect=${pathname}`
    this.props.history.replace(`/register?redirect=${pathname}`, { key: key })
  }

  // 跳转app投递列表
  openApp = () => {
    window.zhuge.track('下载APP', { [`${triggerFrom}`]: '投递成功弹窗' })
    this.setState({
      Success: false,
    })
    window.location.href =
      'share2js://app?type=7&enterpriseNum=1&interviewNum=2&notAppropriateNum=3'
    setTimeout(() => {
      window.location.href = 'https://m.veryeast.cn/mobile/index.html?c=mobile'
    }, 2000)
  }

  render() {
    const data = this.props.position
    const valid = this.props.valid
    const { percentage, perfectContent } = this.state
    return (
      <div className={style.PositionBarWrap}>
        <div className={style.leftBtns}>
          <div
            onClick={
              valid === 0
                ? () => Toast.info('该职位已停止招聘', 2)
                : this.collect
            }
            className={style.select}
          >
            <img
              className={style.img1}
              src={
                valid === 0
                  ? validselect
                  : data.is_favorited
                  ? unselect
                  : select
              }
              alt="img1"
            />
            <span className={valid === 0 ? style.validLeftBtns : null}>
              {data.is_favorited ? '已收藏' : '收藏'}
            </span>
          </div>
        </div>
        <div
          onClick={valid === 0 ? null : this.toEmploy}
          className={style.right}
        >
          <div
            className={
              valid === 0
                ? style.validRightBtn
                : `${style.rightBtn} ${data.is_applied ? style.has : null}`
            }
          >
            {valid === 0 ? '停止招聘' : data.is_applied ? '已投递' : '投递简历'}
          </div>
        </div>
        {/* 投递成功 */}
        <Alert
          icon={deliver}
          title="投递成功"
          height={182}
          closable={1}
          visible={this.state.Success}
          onClose={this.onClose('Success')}
          message="你可在「最佳东方APP」查看最新投递进展~"
          openApp={this.openApp}
          actions={[
            {
              text: '打开APP',
              onPress: () => this.openApp(),
            },
          ]}
        />
        {/* 简历信息不完善 */}
        <Alert
          title={perfectContent === 0 ? `你还没有简历` : `简历信息不完善`}
          closable={1}
          visible={this.state.toPerfect}
          onClose={this.onClose('toPerfect')}
          message={
            perfectContent === 0
              ? `投递前必须先创建一份简历`
              : perfectContent === 1
              ? `你的简历没有姓名，无法投递`
              : `你的简历完整度<40%，通过率极低`
          }
          actions={[
            {
              text: perfectContent === 0 ? `去创建` : `去完善`,
              onPress: () => {
                this.props.history.push(
                  `/resume?redirect=${this.props.history.location.pathname}`
                )
                window.zhuge.track('简历页面打开', {
                  [`${triggerFrom}`]: '投递简历-去完善',
                })
              },
              type: 'ok',
            },
          ]}
        />
        {/* 简历40%-80% */}
        <Alert
          title="简历信息不完善"
          height={134}
          visible={this.state.mostPerfect}
          onClose={this.onClose('mostPerfect')}
          wontGo={this.wontGo}
          message={`你的简历完整度为${percentage}，建议完善后再投递`}
          actions={[
            {
              text: '暂不完善',
              onPress: () => this.wontGo(),
              type: 'close',
            },
            {
              text: '去完善',
              onPress: () => {
                this.props.history.push(
                  `/resume?redirect=${this.props.history.location.pathname}`
                )
                window.zhuge.track('去完善', {
                  [`${triggerPost}`]: this.props.position.job_name,
                })
                window.zhuge.track('简历页面打开', {
                  [`${triggerFrom}`]: '投递简历-去完善',
                })
              },
              type: 'ok',
            },
          ]}
        />
      </div>
    )
  }
}

export default PositionBar
