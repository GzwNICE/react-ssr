import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import Cookies from 'js-cookie'
import LisetItem from '../../components/ListItem'
import Clipboard from 'clipboard'
import style from './style2.less'
import Resume from '../../static/resume@3x.png'
import company from '../../static/attentioncompany@3x.png'
import delivce from '../../static/delivce@3x.png'
import collectpost from '../../static/collectpost@3x.png'
import addserver from '../../static/addserver@3x.png'
import appshear from '../../static/appshear@3x.png'
import privacyseeting from '../../static/privacyseeting@3x.png'
import systemMassage from '../../static/systemMassage@3x.png'
import moreseeting from '../../static/moreseeting@3x.png'
import userbg from '../../static/userbg@3x.png'
import headimg from '../../static/portrait@3x.png'
import refresh from '../../static/refresh@3x.png'
import inform from '../../static/inform.png'
import back from '../../static/back.png'
import { Modal, Toast } from 'antd-mobile'
import { getUserStatus, userRefResume } from '../../actions/userStatus'

@connect(state => {
  return {
    user: state.auth,
    userStatus: state.userStatus,
  }
})
class UserPage extends PureComponent {
  state = {
    refresh: false,
  }

  reFreshResume = () => {
    const _that = this
    this.setState({
      refresh: true,
    })
    this.props
      .dispatch(
        userRefResume({
          resume_status: this.props.userStatus.resume_status,
        })
      )
      .then(data => {
        if (data) {
          window.zhuge.track('刷新简历')
          Toast.info('刷新成功', 2)
          _that.setState({
            refresh: false,
          })
        }
      })
  }

  // shareApp = () => { // 弹窗分享
  //   const shareLink = window.location.href
  //   // const shareImg = this.props.user.portrait_url
  //   if (navigator.userAgent.indexOf('UCBrowser') > -1 && window.ucbrowser) { // uc  浏览器
  //     const shareArgs = ['app分享', '快来找找我的工作吧', shareLink, '', '', '\n@' + window.location.host, '']
  //     return window.ucbrowser.web_share(...shareArgs)
  //   }
  //   Modal.alert(
  //     Clipboard.isSupported() ? '链接已经复制到剪贴板' : '长按分享此链接',
  //     <p style={{wordWrap: 'break-word'}}>{shareLink}</p>, [
  //       { text: '确定', style: 'default' },
  //     ])
  //   window.zhuge.track('应用分享')
  // }

  goLogin = () => {
    if (!this.props.userStatus.true_name) {
      this.props.history.push('/user/login')
    }
  }

  ShowRefBtn = () => {
    if (this.props.user.user_id) {
      return
    }
  }

  goNextpage = (url, key) => {
    window.zhuge.track(key)
    if (this.props.user.user_id && Cookies.get('ticket')) {
      this.props.history.push(url)
    } else {
      this.props.history.push(
        '/user/register?redirect=' + this.props.history.location.pathname,
        { key: '我的' }
      )
      // Modal.alert('', '请先登录', [
      //   { text: '稍后', style: 'default' },
      //   { text: '登录', onPress: () =>  },
      // ])
    }
  }

  goSever = () => {
    window.zhuge.track('增值服务')
    window.location.href = 'https://m.veryeast.cn/service'
  }

  componentDidMount() {
    // this.clipboard = Clipboard.isSupported() && new Clipboard(this.refs.share, {
    // text: () => window.location.href,
    // })
    // 获取用户状态
    if (this.props.user) {
      this.props.dispatch(getUserStatus()).then(json => {
        if (json.errCode === 2002) {
          this.props.history.push(
            '/user/register?redirect=' + this.props.history.location.pathname,
            { key: '我的' }
          )
          // Modal.alert('', '请先登录', [
          //   { text: '稍后', style: 'default' },
          //   { text: '登录', onPress: () => this.props.history.push('/user/register?redirect=' + this.props.history.location.pathname, {key: '我的'}) },
          // ])
        }
      })
    }
  }

  componentWillUnmount() {
    // Clipboard.isSupported() && this.clipboard.destroy()
  }

  render() {
    const userStatus = this.props.userStatus
    const deliver =
      userStatus.deliver_success_num +
      userStatus.enterprise_view_num +
      userStatus.invitation_for_an_interview_num +
      userStatus.not_appropriate_num
    // console.log(this.props.user)
    return (
      <div className={style.UserPageWrap}>
        <div className={style.top}>
          <div className={style.hasLogin}>
            <div className={style.right}>
              <div className={style.btn}>
                <div className={style.btnLeft} onClick={()=>{this.props.history.go(-1)}}>
                  <img src={back} alt="back" />
                </div>
                <div className={style.btnRight}>
                  <img
                    className={this.state.refresh ? style.addFrames : null}
                    src={refresh}
                    alt="刷新"
                    onClick={this.reFreshResume}
                  />
                  <div className={style.messages}>
                    <img
                      src={inform}
                      alt="inform"
                      onClick={() => {
                        this.goNextpage('/person/message', '系统消息')
                      }}
                    />
                    <span>99</span>
                  </div>
                </div>
              </div>
            </div>
            <div className={style.left} onClick={this.goLogin}>
              <div
                className={style.imgBox}
                style={{
                  backgroundImage: `url(${this.props.userStatus.avatar ||
                    headimg})`,
                }}
              />
            </div>
          </div>
        </div>
        <div className={style.resumeBox} />
        <div className={style.middleBox}>
          <div
            onClick={() => {
              this.goNextpage('/resume', '我的简历')
            }}
          >
            <LisetItem
              img={Resume}
              titleleft="我的简历"
              // righttitle="完整度"
              // rightcontant={(Math.round(this.props.userStatus.resume_complete * 100) || 0) + '%'}
            />
          </div>
          {/*<div onClick={() => {this.goNextpage('/person/followedCompanies', '关注企业')}}>
            <LisetItem
              img={company}
              titleleft="关注企业"
              underline="true"
            />
          </div>*/}
          <div
            onClick={() => {
              this.goNextpage('/person/applyRecord', '投递记录')
            }}
          >
            <LisetItem
              img={delivce}
              titleleft="投递进展"
              underline="true"
              num={deliver}
              // rightNum="···"
              rightNum="99"
              // rightcontant={(Math.round(this.props.userStatus.resume_complete * 100) || 0) + '%'}
            />
          </div>
          <div
            onClick={() => {
              this.goNextpage('/person/jobFavorites', '收藏职位')
            }}
          >
            <LisetItem
              img={collectpost}
              titleleft="关注/收藏"
              underline="true"
            />
          </div>
          {/*<div onClick={() => {this.goSever()}}>
            <LisetItem
              img={addserver}
              titleleft="增值服务"
              underline="true"
            />
          </div>
          <div onClick={this.shareApp} ref="share">
            <LisetItem
              img={appshear}
              titleleft="应用分享"
              underline="true"
            />
          </div>
          <div onClick={() => {this.goNextpage('/person/privacy', '隐私服务')}}>
            <LisetItem
              img={privacyseeting}
              titleleft="隐私服务"
              underline="false"
            />
          </div>*/}
          <div>
            <LisetItem
              img={systemMassage}
              titleleft="意见反馈"
              num={this.props.userStatus.unread_message_num}
              underline="true"
            />
          </div>
          {/*<div onClick={() => {this.goNextpage('/person/more', '更多设置')}}>
            <LisetItem
              img={moreseeting}
              titleleft="更多设置"
              underline="false"
            />
        </div>*/}
        </div>
        <div className={style.bottom}>
          <div className={style.quit}>退出登录</div>
          <div className={style.contactWay}>
            <p>客服电话：400-826-0101</p>
            <p>工作时间：9:00-18:00</p>
          </div>
        </div>
      </div>
    )
  }
}

export default UserPage