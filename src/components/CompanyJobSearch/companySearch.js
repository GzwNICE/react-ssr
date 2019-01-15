import React from 'react'
import ComplexFormField from '../Complex/ComplexFormField'
import { NavBar, Toast, Accordion, List, Icon, InputItem } from 'antd-mobile'
import style from './style.less'
import { connect } from 'react-redux'
import { getCompanyTips } from "../../actions/work_exps";

@connect(state => {
  return {
    dataList: state.work_exps.companyTipsList,
  }
})
class ComplexSelView extends ComplexFormField {
  constructor(props) {
    super(props)
    // console.log(this.props)
    this.state = {
      value: '',
      show: false,
    }
  }

  save = () => {
    const { value } = this.state
    if (value.length > 0) {
      this.props.onChange(value)
      this.changeVisible(false, false)
    } else {
      Toast.info('请输入内容', 2)
    }
  }
  onChange = (value) => {
    const parmas = {
      keyword: value,
    }
    this.props.dispatch(getCompanyTips(parmas)).then(() => {
      this.setState({
        value,
        show: true,
      })
    })

  }
  handleClick = (index) => {
    const { dataList } = this.props
    this.props.onChange(dataList[index])
    this.changeVisible(false, false)
    this.setState({
      show: false,
    })
  }
  mainView() {
    const { dataList = [] } = this.props
    const defaultValue = this.props.value
    const { value, show } = this.state
    let arr = []
    dataList.map((item,index) => {
      let re =new RegExp(value,"g"); //定义正则
      item = item.replace(re, `<span>${value}</span>`); //进行替换，并定义高亮的样式
      arr.push(item)
    })
    return (
      <div className={style.root}>
        <NavBar
          mode="light"
          className={style.nav}
          icon={<Icon type="left" />}
          onLeftClick={() => this.changeVisible()}
          rightContent={<span onClick={() => this.save()}>保存</span>}>
          所在公司
        </NavBar>
        <div className={style.search}>
          <InputItem
            clear
            defaultValue={defaultValue}
            placeholder="请输入职位名称"
            onChange={this.onChange}
          />
        </div>
        <ul className={`${style.list} ${show ? style.show : style.hide}`} >
          {
            arr.map((item, index) => {
              return (
                <li
                  key={index}
                  onClick={this.handleClick.bind(this, index)}
                  dangerouslySetInnerHTML={{__html: item}} />
              )
            })
          }
        </ul>
      </div>
    )
  }
}

export default ComplexSelView