import React, {PureComponent} from 'react'
import queryString from 'query-string'
import { NavBar, Toast, Icon } from 'antd-mobile'
import { createForm } from 'rc-form'
import TipOffsType from '../../components/TipOffsType'
import TipBoard from '../../components/TipBoard'
import TipTel from '../../components/TipTel'
import { pipeline } from '../../helper/fetching'
import style from './style.less'

import {connect} from 'react-redux'

@connect(state => ({
  tel: state.auth.phone,
}))
@createForm()
class TipOffs extends PureComponent {

  submit = () => {
    const job_id = this.props.location.state && this.props.location.state.d
    const { id } = queryString.parse(window.location.search)
    this.props.form.validateFields((err, values) => {
      if (!values.feed_back_type) {
        return Toast.info('请选择举报类型',2);
      }
      values.job_id = job_id || id

      pipeline(':ve.mobile.interface/job/report',values).then(() => {
        Toast.info('举报成功',2);
      }).then(() => {
        setTimeout(() =>{
          this.props.history.go(-1)
        }, 300)
      })
    })
  }

  render() {
    const { getFieldProps } = this.props.form
    return (
      <div className={style.content}>
        <NavBar
          icon={<Icon type="left" />}
          onLeftClick={() => this.props.history.go(-1)}
          rightContent={<div onClick={this.submit}>提交</div>}
        >职位举报</NavBar>
        <TipOffsType {...getFieldProps('feed_back_type')}/>
        <TipBoard {...getFieldProps('description')}/>
        <TipTel {...getFieldProps('p_mobile', {
          initialValue: this.props.tel,
        })}/>
      </div>
    )
  }
}

export default TipOffs
