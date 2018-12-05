import React,{PureComponent} from 'react'
import store from 'store'
import style from './style.less'

class Connection extends PureComponent {

  showMobilePhone = (data) => {
    const auth = store.get('m:auth')
    if(auth.user_id) {
      return( <li>手机：<a href={`tel:${data.contact_phone}`}>{data.contact_phone}</a></li> )
    } else {
      return(<li>手机：<span onClick={() => this.props.goLogin()}>登录后查看</span></li>)
    }
  }

  showPhone = (data) => {
    const auth = store.get('m:auth')
    if(auth.user_id) {
      return(<li>电话：<a href={`tel:${data.contact_tel}`}>{data.contact_tel}</a></li>)
    } else {
      return(<li>电话：<span onClick={() => this.props.goLogin()}>登录后查看</span></li>)
    }
  }

  showEmail = (data) => {
    const auth = store.get('m:auth')
    if(auth.user_id) {
      return(
        <li>邮箱：<a href={`mailto:${data.contact_email}`}>{data.contact_email}</a></li>
      )
    } else {
      return(<li>邮箱：<span onClick={() => this.props.goLogin()}>登录后查看</span></li>)
    }
  }

  render() {
    const data = this.props.company
    return (
      <div className={style.content}>
        <div className={style.title}>联系方式</div>
        <ul>
          {data.contact_name ? <li>联系人：{data.contact_name}</li> : null}
          {data.contact_phone ? this.showMobilePhone(data) : null}
          {data.contact_tel ? this.showPhone(data) : null }
          {data.contact_email ? this.showEmail(data) : null}
          {data.address ? <li>地址：{data.address}</li> : null}
        </ul>
      </div>
    )
  }
}

export default Connection
