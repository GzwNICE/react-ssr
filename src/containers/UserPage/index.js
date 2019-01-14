import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import Cookies from 'js-cookie'
import * as auth from '../../actions/auth'
import { login_out } from '../../actions/userStatus'
import { Toast } from 'antd-mobile'
import queryString from 'query-string'
import LisetItem from '../../components/ListItem'
import { getUserStatus, userRefResume } from '../../actions/userStatus'
import Alert from '../../components/Alert'
import delivce from '../../static/delivce@3x.png'
import collectpost from '../../static/collectpost@3x.png'
import Resume from '../../static/resume@3x.png'
import systemMassage from '../../static/systemMassage@3x.png'
import headimg from '../../static/portrait@3x.png'
import refresh from '../../static/refresh@3x.png'
import inform from '../../static/inform.png'
import back from '../../static/back.png'
import style from './style.less'

@connect(state => {
  return {
    user: state.auth,
    userStatus: state.userStatus,
  }
})
class UserPage extends PureComponent {
  state = {
    refresh: false,
    messageQueue: false,
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
      this.props.history.push('')
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
        '/register?redirect=' + this.props.history.location.pathname,
        { key: '我的' }
      )
    }
  }

  loginOut = () => {
    auth
      .logout()
      .then(data => {
        if (data) {
          Toast.info('退出成功', 2)
          this.props.dispatch(login_out)
          setTimeout(() => {
            this.props.history.go(-1)
          }, 1200)
          sessionStorage.removeItem('is_login')
          sessionStorage.removeItem('photo')
        }
      })
      .catch(err => {
        Toast.info(err.errMsg, 2)
      })
  }

  whereWillIGo = () => {
    const { pathSearch } = queryString.parse(window.location.search)
    console.log(pathSearch)
    if (pathSearch) {
      this.props.history.go(-1)
    } else {
      this.props.history.length === 2 || this.props.history.length === 1
        ? this.props.history.push('/home')
        : this.props.history.go(-1)
    }
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
            '/register?redirect=' + this.props.history.location.pathname,
            { key: '我的' }
          )
          // Modal.alert('', '请先登录', [
          //   { text: '稍后', style: 'default' },
          //   { text: '登录', onPress: () => this.props.history.push('/register?redirect=' + this.props.history.location.pathname, {key: '我的'}) },
          // ])
        }
      })
    }
  }

  render() {
    const userStatus = this.props.userStatus
    const deliver =
      userStatus.deliver_success_num +
      userStatus.enterprise_view_num +
      userStatus.invitation_for_an_interview_num +
      userStatus.not_appropriate_num
    return (
      <div className={style.UserPageWrap}>
        <div className={style.top}>
          <div className={style.hasLogin}>
            <div className={style.right}>
              <div className={style.btn}>
                <div className={style.btnLeft} onClick={this.whereWillIGo}>
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
                      onClick={
                        this.showModal('messageQueue')
                        // this.goNextpage('/person/message', '系统消息')
                      }
                    />
                    {this.props.userStatus.unread_message_num ? (
                      <span>{this.props.userStatus.unread_message_num}</span>
                    ) : null}
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
        <Alert
          title={
            this.props.userStatus.unread_message_num
              ? `您有${this.props.userStatus.unread_message_num}条未读消息`
              : `您暂时没有未读消息`
          }
          height={130}
          closable={1}
          visible={this.state.messageQueue}
          onClose={this.onClose('messageQueue')}
          message={
            this.props.userStatus.unread_message_num
              ? `请登录最佳东方APP查看`
              : `可以登录最佳东方APP和HR在线聊天`
          }
          actions={[
            {
              text: '打开APP',
              onPress: this.onClose('messageQueue'),
            },
          ]}
        />
        <div className={style.middleBox}>
          <div
            onClick={() => {
              this.goNextpage('/resume', '我的简历')
            }}
          >
            <LisetItem img={Resume} titleleft="我的简历" />
          </div>
          <div
            onClick={() => {
              this.goNextpage('/person/applyRecord', '投递进展')
            }}
          >
            <LisetItem
              img={delivce}
              titleleft="投递进展"
              underline="true"
              num={deliver > 99 ? `···` : deliver}
            />
          </div>
          <div
            onClick={() => {
              this.goNextpage('/person/concern', '关注/收藏')
            }}
          >
            <LisetItem
              img={collectpost}
              titleleft="关注/收藏"
              underline="true"
            />
          </div>

          <div
            onClick={() => {
              this.goNextpage('/feedback', '帮助与反馈')
            }}
          >
            <LisetItem
              img={systemMassage}
              titleleft="帮助与反馈"
              underline="true"
            />
          </div>
        </div>
        <div className={style.bottom}>
          <div className={style.quit} onClick={this.loginOut}>
            退出登录
          </div>
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
