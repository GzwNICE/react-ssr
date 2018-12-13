import React,{PureComponent} from 'react'
import style from './style.less'
import { NavBar, List, DatePicker, InputItem, Toast, Modal } from 'antd-mobile';
import { createForm } from 'rc-form'
import queryString from 'query-string'
import moment from 'moment'
import Cookies from 'js-cookie'
import store from 'store'
import Education from '../../inputs/Education'
import Post from '../../inputs/Post'
import Area from '../../inputs/Area'
import Gender from '../../inputs/Gender'
import Industry from '../../inputs/Industry'
import { connect } from 'react-redux'
import { microDone } from '../../actions/microresume'
const auth = store.get('m:auth') || {}


@connect(state => {
  return {
    auth: state.auth,
  }
})
@createForm()
class MicroResume extends PureComponent {
  tipsErr = (tips) => {
    var ok = true;
    for (const value of tips) {
      if (!value[2]) {
        if (!value[0] || !value[0].length) {
          Toast.info(value[1],2)
          ok = false
        }
      }else {
        if (!value[0] || !value[0].length) {
          Toast.info(value[1][0],2)
          ok = false
        }else if(!value[2].test(value[0])){
          Toast.info(value[1][1],2)
          ok = false
        }
      }
    }
    return ok;
  }
  makeSure = () => {
    const mobileReg = /^1[3456789]\d{9}$/
    this.props.form.validateFields((err, val) => {
      val.birthday = val.birthday && moment(val.birthday).format('YYYY-MM-DD')
      val.work_date = val.work_date && moment(val.work_date).format('YYYY-MM-DD')
      val.mobile = val.mobile && val.mobile.replace(/\s/g,"")
      const isOk = this.tipsErr([
        [val.person_desired_location, '请选择期望区域'],
        [val.company_industry, '请选择期望行业'],
        [val.person_desired_position, '请选择期望职位'],
        [val.work_date, '请选择参加工作时间'],
        [val.degree, '请选择学历'],
        [val.birthday, '请选择出生日期'],
        [val.mobile, ['请输入手机号', '请输入正确的手机号'], mobileReg],
        [val.true_name_cn, '请输入姓名'],
      ])
      if(isOk) {
        this.props.dispatch(microDone({
          ...val,
          person_desired_industry: '1',
        })).then((res) => {
          if( res.json && res.json.status) {
            Toast.info(res.json.msg, 2)
            window.zhuge.track('微简历保存成功')
            setTimeout(() => {
              const {redirect, sss} = queryString.parse(window.location.search)
              if(sss) { // seo注册页面近来的
               return window.location.href = sss
              }
              if(redirect) {
                this.props.history.push(redirect)
              } else {
                this.props.history.push('/')
              }
            }, 999)
          } else {
            const  msg = res.errMsg
            window.zhuge.track('保存失败', {
              '原因': msg,
            })
            window.zhuge.track('微简历页面打开', {
              '保存失败': err.errMsg,
            })
            if(msg === '未登陆') {
              return this.goLogin()
            }
            return Toast.info(msg, 2)
          }
        })
          .catch((err) => {
            window.zhuge.track('保存失败', {
              '原因': err.errMsg,
            })
            window.zhuge.track('微简历页面打开', {
              '保存失败': err.errMsg,
            })
            Toast.info(err.errMsg, 2)
          })
      }
    })
  }

  goLogin = () => {
    const search = this.props.history.location.search ? this.props.history.location.search : '?'
    const pathname = this.props.history.location.pathname
    const url = `/user/login${search}${search === '?' ? '' : '&'}redirect=${pathname}`
    console.log(url)
    Modal.alert('', '请先登录', [
      { text: '稍后', style: 'default' },
      { text: '登录', onPress: () => this.props.history.replace(url) },
    ])
  }

  componentDidMount(){
    setTimeout(() => {
      if(!auth.user_id && !Cookies('ticket')) {
        this.goLogin()
      }
    }, 400)
  }

  render() {
    const {
      form,
    } = this.props
    const { getFieldProps } = form
    const {phone} = this.props.auth
    return (
      <div className={style.container}>
        <NavBar iconName={false}>微简历</NavBar>
        <div className={style.content}>
          <div className={style.header}>你跟一份好工作的距离只差30秒</div>
          <div className={style.line}>
            <List>
              <InputItem
                {...getFieldProps('true_name_cn')}
                placeholder="请输入姓名"
              >姓&emsp;&emsp;名</InputItem>
            </List>
          </div>
          <div className={style.line}>
            <Gender
              {...getFieldProps('gender', {
                initialValue: 1,
              })}
            >
              <List.Item>性别</List.Item>
            </Gender>
          </div>
          <div className={style.line}>
            <List>
              <InputItem
                {...getFieldProps('mobile',{
                  initialValue: phone || Cookies.get('username'),
                })}
                type="phone"
                placeholder="请输入手机号"
              >手机号码</InputItem>
            </List>
          </div>
          <div className={style.line}>
            <DatePicker
              {...getFieldProps('birthday', {
                })}
                mode="date"
              title="出生日期"
              extra="请选择"
              minDate={moment().year(moment().year() - 100)}
              maxDate={moment().year(moment().year() - 15)}
            >
              <List.Item arrow="horizontal">出生日期</List.Item>
            </DatePicker>
          </div>
          <div className={style.line}>
            <Education
              {...getFieldProps('degree', {
                initialValue: [],
              })}
              title="最高学历"
              extra="请选择"
            >
              <List.Item arrow="horizontal">最高学历</List.Item>
            </Education>
          </div>
					<div className={style.line}>
            <DatePicker
              {...getFieldProps('work_date', {
                })}
                mode="date"
              title="参加工作"
              extra="请选择"
              minDate={moment().year(moment().year() - 100)}
              maxDate={moment().year(moment().year())}
            >
              <List.Item arrow="horizontal">参加工作</List.Item>
            </DatePicker>
          </div>
          <div className={style.line}>
						<Post
							{...getFieldProps('person_desired_position', {
							})}
							maxLength={5}
						>
							<List.Item arrow="horizontal">期望职位</List.Item>
            </Post>
          </div>
          <div className={style.line}>
            <Industry
              {...getFieldProps('company_industry')}
              maxLength={1}
              type="Industry"
            >
              <List.Item arrow="horizontal">期望行业</List.Item>
            </Industry>
          </div>
					<div className={style.line}>
						<Area
              {...getFieldProps('person_desired_location', {})}
            >
              <List.Item arrow="horizontal">期望区域</List.Item>
            </Area>
					</div>
          <div className={style.makeSure} onClick={ this.makeSure }>确定</div>
          {/*<div className={style.pass}><Link to="/tabs/home">跳过》</Link></div>*/}
        </div>
      </div>
    )
  }
}

export default MicroResume
