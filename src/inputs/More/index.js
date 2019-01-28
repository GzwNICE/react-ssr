import React from 'react'
import { NavBar, Icon,Flex, WhiteSpace } from 'antd-mobile'
import { connect } from 'react-redux'
import ComplexSelView, { style } from '../../components/Complex/ComplexSelView'
import style2 from './style.less'

@connect(state => {
  return {
    options: state.option,
  }
})
class More extends ComplexSelView {
  initIndex() { }

  format = (value) => {
    const len = Object.keys(value).length
    return len ? `(${len})` : null
  }

  selectValue = (label, code) => {
    // console.log(typeof label, typeof code)
    const prevValue = this.state ? this.state.value : {}
    const value = {
      ...prevValue,
      [label]: code,
    }
    if (label === 'update_time' ? code === -1 : code === 0)
      delete value[label]
    this.setState({ value })
  }

  clearValue = () => {
    this.setState({ value: {} })
  }

  listView(sublist=[], label) {
    const prevValue = this.state ? this.state.value : {}
    return (
      <div className={style2.items}>
      {sublist.map(item => (
        
        <div
          key={item.code}
          onClick={() => this.selectValue(label, item.code)}
          className={
            prevValue.hasOwnProperty(label) ?
              prevValue[label] === item.code ? style2.action : '' :
              label === 'update_time' ?
                item.code === -1 ? style2.action : '' :
                item.code === 0 ? style2.action : ''
          }>
          {item.value}
        </div>
      ))}
      </div>
    )
  }

  allView(sublist) {
    // console.log(this.props)
    return (
      <div>
        <div className={style2.title}>行业类别</div>
        {this.listView(this.props.options.opts_search_industry, 'company_industry')}
        <div className={style2.title}>发布日期</div>
        {this.listView(this.props.options.opts_update_time, 'update_time')}
        <div className={style2.title}>学历要求</div>
        {this.listView(this.props.options.opts_search_degree, 'education')}
        <div className={style2.title}>食宿情况</div>
        {this.listView(this.props.options.opts_room_board, 'room_board')}
        <div className={style2.title}>职位性质</div>
        {this.listView(this.props.options.opts_search_work_mode, 'work_mode')}
      </div>
    )
  }

  mainView() {
    return (
      <div className={`${style.root} ${style2.root}`}>
        {/*<NavBar*/}
          {/*mode="dark"*/}
          {/*className={style.nav}*/}
          {/*onLeftClick={() => this.changeVisible()}>*/}
          {/*{this.props.title || this.props.children.props.children}*/}
        {/*</NavBar>*/}
        <NavBar
          mode="light"
          className={style2.nav}
          icon={<Icon type="left" />}
          onLeftClick={() => this.changeVisible()}>
          {this.props.title || this.props.children.props.children}
        </NavBar>
        <div className={style2.all}>
          {this.allView()}
        </div>
        <div className={style2.bar}>
          {/*<div onClick={() => this.clearValue()}>清空</div>*/}
          <div onClick={() => this.changeValue()}>保存</div>
        </div>
      </div>
    )
  }
}

export default More