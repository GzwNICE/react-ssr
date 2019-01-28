import React from 'react'
import ComplexFormField from '../Complex/ComplexFormField'
import { NavBar, Icon, InputItem } from 'antd-mobile'
import style from './style.less'
import { connect } from 'react-redux'
import { getJcategoryTips } from "../../actions/work_exps";
import {Toast} from "antd-mobile/lib/index";

//匹配整个关键词 不拆分
function highlight(text, words) {
  //匹配每一个特殊字符 ，进行转义
  var specialStr = [
    '*',
    '.',
    '?',
    '+',
    '$',
    '^',
    '[',
    ']',
    '{',
    '}',
    '|',
    '\\',
    '(',
    ')',
    '/',
    '%',
  ]
  specialStr.forEach(item => {
    if (words.indexOf(item) !== -1) {
      words = words.replace(new RegExp('\\' + item, 'g'), '\\' + item)
    }
  })
  //匹配整个关键词
  let re = new RegExp(words, 'g')

  if (re.test(text)) {
    text = text.replace(re, `<span>${words}</span>`)
  }
  return text
}
@connect(state => {
  return {
    dataList: state.work_exps.jcategoryTipsList,
  }
})
class ComplexSelView extends ComplexFormField {
  constructor(props) {
    super(props)
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
      this.setState({
        show: false,
      })
    } else {
      Toast.info('请输入内容', 2)
    }
  }
  onChange = (value) => {
    // let val = value.replace(/[^a-zA-Z0-9\u4E00-\u9FA5_]/g,'')
    // let val = value.replace(/\?/g,'')
    const parmas = {
      keyword: value,
    }
    this.props.dispatch(getJcategoryTips(parmas)).then(() => {
      this.setState({
        value: value,
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
      value: dataList[index],
    })
  }
  componentWillReceiveProps(next) {
    if (this.props.value && next.value === this.props.value) {
      this.setState({
        value: this.props.value,
      })
    }
  }
  mainView() {
    const { dataList = [] } = this.props
    const defaultValue = this.props.value
    const { value, show } = this.state
    let arr = []
    dataList.map((item,index) => {
      item = highlight(item, value)
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
          所任职位
        </NavBar>
        <div className={style.search}>
          <InputItem
            clear
            defaultValue={defaultValue}
            // value={value}
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