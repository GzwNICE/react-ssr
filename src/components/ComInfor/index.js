import React, {PureComponent} from 'react'
import {companyCollect, companyUnCollect} from '../../actions/company'
import { Toast } from 'antd-mobile'
import style from './style.less'
import guanzhu from '../../static/guanzhu.png'
import has_guanzhu from '../../static/has_guanzhu.png'

class ComInfor extends PureComponent {

  select = () => {
    const isFollowed = this.props.company.is_followed
    const companyId = this.props.company.company_id
    if(isFollowed === 1) {
      this.props.dispatch(companyUnCollect({
        company_id: companyId,
      })).then((data) => {
        Toast.success('取消关注', 2)
        window.zhuge.track('取消关注')
        window.zhuge.track('取消关注企业')
      })
    }else {
      this.props.dispatch(companyCollect({
        company_id: companyId,
      })).then((data) => {
        if (data.status === 0) {
          const  msg = data.errMsg
          if(msg === '未登陆') {
            return this.goLogin()
          }
          return Toast.info(msg, 2)
        }
        window.zhuge.track('关注')
        window.zhuge.track('关注企业')
        Toast.success('关注成功', 2)
      })
    }
  }

  goLogin = () => {
    const search = this.props.history.location.search ? this.props.history.location.search : '?'
    const pathname = this.props.history.location.pathname
    const url = `/user/register${search}${search === '?' ? '' : '&'}redirect=${pathname}`
    this.props.history.replace(url, {key: '关注'})
  }

 render(){
   const {company = {}} = this.props
   return (
     <div className={style.content}>
       <div className={style.top}>
         <div className={style.title}>{company.company_name}</div>
         <div onClick={this.select} className={style.select}>
           <img src={company.is_followed === 1 ? has_guanzhu : guanzhu} alt=""/>
         </div>
       </div>
       <ul>
         <div>
           <li className={style.first}>{company.industry || "未知"}</li>
           <li className={style.second}>{company.company_size || "未知"}</li>
         </div>
         <li className={style.third}>{company.company_nature || "未知"}</li>
       </ul>
     </div>
   )
 }
}

export default ComInfor
