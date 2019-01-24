import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import Cookies from 'js-cookie'
import * as auth from '../../actions/auth'
import { login_out } from '../../actions/userStatus'
import { Link } from 'react-router-dom'
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
    loginOutAlert: false,
  }

  reFreshResume = () => {
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
        if (data.status === 1) {
          // window.zhuge.track('刷新简历')
          Toast.info('简历已刷新', 2)
          this.setState({
            refresh: false,
          })
        } else {
          // window.zhuge.track('刷新简历')
          Toast.info(data.errMsg, 2)
          this.setState({
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

  // 跳转app消息列表
  openApp = () =>{
    const triggerFrom = '触发来源'
    window.zhuge.track('下载APP', { [`${triggerFrom}`]: '您有未读消息' })
    this.setState({
      messageQueue: false,
    })
    window.location.href = 'share2js://app?type=2'
    setTimeout(() => {
      window.location.href = 'https://m.veryeast.cn/mobile/index.html?c=mobile'
    }, 2000)
  }

  goNextpage = (url, key) => {
    // window.zhuge.track(key)
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
        this.setState({
          loginOutAlert: false,
        })
        if (data) {
          setTimeout(() => {
            Toast.info('退出成功', 2)
            this.props.dispatch(login_out)
          }, 1000)
          setTimeout(() => {
            this.props.history.replace('/')
          }, 2000)
          sessionStorage.removeItem('is_login')
          sessionStorage.removeItem('photo')
        }
      })
      .catch(err => {
        Toast.info(err.errMsg, 2)
      })
  }

  whereWillIGo = () => {
    const  {redirect}  = queryString.parse(this.props.history.location.search)
    if (redirect) {
      this.props.history.replace(redirect)
    } else {
      this.props.history.replace('/home')
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
    const deliver = userStatus.deliver_total_num
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
              <Link to={`/resume?source=/user${this.props.history.location.search}`}>
                <div
                  className={style.imgBox}
                  style={{
                    backgroundImage: `url(${this.props.userStatus.avatar ||
                      headimg})`,
                  }}
                />
              </Link>
            </div>
            <div className={style.username}>
              <Link to={`/resume?source=/user${this.props.history.location.search}`}>
                {this.props.userStatus.true_name ? this.props.userStatus.true_name : '暂无'}
              </Link>
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
          openApp={this.openApp}
          message={
            this.props.userStatus.unread_message_num
              ? `请登录最佳东方APP查看`
              : `可以登录最佳东方APP和HR在线聊天`
          }
          actions={[
            {
              text: '打开APP',
              onPress: () => this.openApp(),
            },
          ]}
        />
        <div className={style.middleBox}>
          <div
            onClick={() => {
              this.goNextpage(
                `/resume?source=/user${this.props.history.location.search}`,
                '我的简历'
              )
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
          <div className={style.quit} onClick={this.showModal('loginOutAlert')}>
            退出登录
          </div>
          <div className={style.contactWay}>
            <p>客服电话：400-826-0101</p>
            <p>工作时间：9:00-18:00</p>
          </div>
        </div>
        <Alert
          title="退出登录"
          height={130}
          closable={0}
          visible={this.state.loginOutAlert}
          onClose={this.onClose('loginOutAlert')}
          message="确定要退出登录么？"
          actions={[
            {
              text: '取消',
              onPress: this.onClose('loginOutAlert'),
              type: 'close',
            },
            {
              text: '确定',
              onPress: () => this.loginOut(),
              type: 'ok',
            },
          ]}
        />
      </div>
    )
  }
}

export default UserPage
