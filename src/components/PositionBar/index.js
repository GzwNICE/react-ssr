/**
 * Created by huangchao on 2017/9/25.
 * https://m.veryeast.cn/service/competitive/detail 比比竞争力
 * https://m.veryeast.cn/service/matching/detail 简历匹配度
 */
import React, { PureComponent } from 'react'
import queryString from 'query-string'
import { Toast, Modal, Button } from 'antd-mobile'
import style from './style.less'
import { connect } from 'react-redux'
import select from '../../static/select@3x.png'
import unselect from '../../static/unselect@3x.png'
import validselect from '../../static/validselect.png'
import deliver from '../../static/deliverSuccess@3x.png'

// import matching from '../../static/matching@3x.png'
// import contend from '../../static/contend@3x.png'
import {
  positionCollect,
  positionUnColiect,
  positionApply,
} from '../../actions/position'
// import store from 'store'
// import Cookies from 'js-cookie'
// const auth = store.get('m:auth') || {}

@connect(state => ({}))
class PositionBar extends PureComponent {
  state = {
    isSelect: true,
    Success: false, //投递成功弹窗
    Failure: false, //投递失败弹窗
    Perfect: false, //简历不完善弹窗
  }

  // matching = () => {
  //   window.zhuge.track('匹配度')
  //   const jobId = this.props.position.job_id
  //   // window.zhuge.track('登录页面打开')
  //   window.location.href = `https://m.veryeast.cn/service/matching/detail?job_id=${jobId}`
  // }

  // competitive = () => {
  //   window.zhuge.track('竞争力')
  //   const jobId = this.props.position.job_id
  //   window.location.href = `https://m.veryeast.cn/service/competitive/detail?job_id=${jobId}`
  // }

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
          window.zhuge.track('取消收藏')
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
              return this.goLogin('收藏')
            }
          } else {
            window.zhuge.track('收藏职位')
            return Toast.success('收藏成功', 2)
          }
        })
    }
  }
  showModal = key => e => {
    if(e)e.preventDefault() // 修复 Android 上点击穿透
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
    const jobId = this.props.position.job_id
    const isApplied = this.props.position.is_applied
    const { from } = queryString.parse(window.location.search)
    const tip = this.showModal('Success')
    if (!isApplied) {
      // 去应聘
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
            if (msg === '未登陆') {
              return this.goLogin('应聘')
            }
            return Toast.info(msg, 2)
          }
          window.zhuge.track('应聘职位')
          Toast.success('申请成功', 2)
        })
    }
  }

  goLogin = key => {
    const search = this.props.history.location.search
      ? this.props.history.location.search
      : '?'
    const pathname = this.props.history.location.pathname
    const url = `/user/register${search}${
      search === '?' ? '' : '&'
    }redirect=${pathname}`
    this.props.history.replace(url, { key: key })
  }

  

  render() {
    const data = this.props.position
    const valid = this.props.valid
    return (
      <div className={style.PositionBarWrap}>
        <div className={style.leftBtns}>
          <div
            onClick={valid === 0 ? null : this.collect}
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
              {data.is_favorited ? '取消' : '收藏'}
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

        <Modal
          visible={this.state.Success}
          closable={true}
          transparent
          maskClosable={false}
          onClose={this.onClose('Success')}
        >
          <div className={style.deliverSuccess}>
            <img src={deliver} alt="" className={style.deliver} />
            <span>投递成功</span>
            <p>你可在「最佳东方APP」查看最新投递进展~</p>
            <div>打开APP</div>
          </div>
        </Modal>

        <Modal
          visible={this.state.Failure}
          closable={true}
          transparent
          maskClosable={false}
          onClose={this.onClose('Failure')}
          wrapProps={{ onTouchStart: this.onWrapTouchStart }}
        >
          <div className={style.deliveryFailure}>
            <span>简历信息不完善</span>
            <p>你的简历没有姓名，无法投递</p>
            <div>去完善</div>
          </div>
        </Modal>

      </div>
    )
  }
}

export default PositionBar
