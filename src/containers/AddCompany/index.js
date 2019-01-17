/**
 * Created by huangchao on 2017/10/17.
 */
import React, { PureComponent } from 'react'
import style from './style.less'
import {connect} from 'react-redux'
import { Toast, NavBar, Icon } from 'antd-mobile'
import {searchBlackList, addBlackLIst} from '../../actions/Privacy'

@connect(state => {
  return {
    SearchList: state.Privacy.SearchList,
  }
})
class AddCompany extends PureComponent {
  static propTypes = {
  }
  state = {
    type: 1,
  }

  addCompany = (id) => {
    const _that = this
    this.props.dispatch(addBlackLIst({id}))
      .then(() => {
        Toast.info('添加成功', 2)
        setTimeout(() => {
          _that.props.history.go(-1)
        }, 1200)
      })
  }

  onChangeName = () => {
    const name = this.refs.name.value
    this.props.dispatch(searchBlackList({name}))
  }

  render() {
    const list = this.props.SearchList
    console.log(this.props)
    return (
      <div className={style.AddCompanyWrap}>
      <NavBar
      mode="light"
      className={style.nav}
      icon={<Icon type="left" />}
        onLeftClick={() => {this.props.history.go(-1)}}
      >隐私设置</NavBar>
        <div className={style.inputBox}>
          <input onChange={() => this.onChangeName()} ref="name" type="text" placeholder="输入你想屏蔽的公司" />
        </div>
        <div className={style.ListBox}>
          {
            list.map((data, index) => {
              return(
                <div key={index} onClick={() => this.addCompany(data.id)} className={style.addCompanyItem}>
                  <div className={style.connent}>{data.value}</div>
                </div>
              )
            })
          }
        </div>
      </div>
    )
  }
}

export default AddCompany
