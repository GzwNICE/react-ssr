import React from 'react'
import ComplexFormField from '../../../components/Complex/ComplexFormField'
import { NavBar, Icon, InputItem, Menu } from 'antd-mobile'
import style from './style.less'
import { connect } from 'react-redux'
import { getJcategoryTips } from "../../../actions/work_exps";
import {Toast} from "antd-mobile/lib/index";


@connect(state => {
  return {
    dataList: state.work_exps.jcategoryTipsList,
    options: state.option.positions,
    optIndex: state.option.positions_index,
  }
})
class ComplexSelView extends ComplexFormField {
  constructor(props) {
    super(props)
    this.state = {
      value: '',
      initData: [],
      show: false,
      optionsSubChil: [],
      checked: ['0101', '0201', '0202'],
    }
  }
  componentDidMount() {
    // code value sublist
    const { options } = this.props
    this.setState({
      optionsSubChil: options[0].sublist,
    })
    // let arr = []
    // options.map((item) => {
    //   let obj = {
    //     value: item.code,
    //     label: item.value,
    //     children: [],
    //   }
    //   if (item.sublist.length > 0) {
    //     item.sublist.map(item2 => {
    //       let obj2 = {
    //         value: item2.code,
    //         label: item2.value,
    //       }
    //       obj.children.push(obj2)
    //     })
    //   }
    //   arr.push(obj)
    // })
    // this.setState({
    //   initData: arr,
    // })
  }
  format(value=[]) {
    if (this.props.optIndex) {
      return value.map((code) => this.props.optIndex[code]).join(',')
    } else {
      return null
    }
  }

  serialize(value) {
    let val = value instanceof Array ? [...value] : {...value}
    if (!val.hasOwnProperty('optIndex'))
      Object.defineProperty(val, 'optIndex', {
        get: () => this.props.optIndex,
      })
    return val
  }

  filter = (code) => {
    return this.getValue().indexOf(code) >= 0
  }
  save = () => {
    const { value } = this.state
    if (value.length > 0) {
      this.props.onChange(value)
      this.changeVisible(false, true)
    } else {
      Toast.info('请输入内容', 2)
    }
  }
  // onChange = (value) => {
  //   const parmas = {
  //     keyword: value,
  //   }
  //   this.props.dispatch(getJcategoryTips(parmas)).then(() => {
  //     this.setState({
  //       value,
  //       show: true,
  //     })
  //   })
  //
  // }
  // handleClick = (index) => {
  //   const { dataList } = this.props
  //   this.props.onChange(dataList[index])
  //   this.changeVisible(false, true)
  //   this.setState({
  //     show: false,
  //   })
  // }


  mainView() {
    const { options = [] } = this.props
    const defaultValue = this.props.value
    const { value, show, initData, optionsSubChil, checked } = this.state

    // if (optionsSubChil.length > 0) {
    //   console.log(optionsSubChil[0].code.slice(0, 2))
    // }
    return (
      <div className={style.root}>
        <NavBar
          mode="light"
          className={style.nav}
          icon={<Icon type="left" />}
          onLeftClick={() => this.changeVisible()}
          rightContent={<span onClick={() => this.save()}>保存</span>}>
          选择职位
        </NavBar>
        <div>header</div>
        <div className={style.wrap}>
          <ul className={style.left}>
            {
              options.map((item, index) =>
                <li key={index}>
                  {item.value}
                  {
                    checked.map((item2, index2) => {
                      let subCode = item2.slice(0, 2)
                      if (item.code.indexOf(subCode) !== -1) {
                        return <i key={index2}/>
                      }
                    })
                  }
                </li>
              )
            }
          </ul>
          <ul className={style.right}>
            {
              optionsSubChil.map((item, index) => <li key={index}>{item.value}</li>)
            }
          </ul>
        </div>
      </div>
    )
  }
}

export default ComplexSelView