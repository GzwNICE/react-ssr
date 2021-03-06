import React from 'react'
import ComplexFormField from '../../../components/Complex/ComplexFormField'
import { NavBar, Toast, Icon, InputItem } from 'antd-mobile'
import style from './style.less'
import { connect } from 'react-redux'
import { getCompanyTips } from '../../../actions/work_exps'

//匹配整个关键词 不拆分
function highlight(text, words) {
  // var i,
  //   len = words.length,
  //   re
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
    // todo 这边提取为单独的函数是，这边会有问题
    text = text.replace(re, `<span>${words}</span>`)
  }
  return text
}

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
      this.changeVisible(false, true)
      this.setState({
        show: false,
      })
    } else {
      Toast.info('请输入内容', 2)
    }
  }
  onChange = value => {
    // let val = value.replace(/\?/g,'')
    // let val = value
    const parmas = {
      keyword: value,
    }
    this.props.dispatch(getCompanyTips(parmas)).then(() => {
      this.setState({
        value: value,
        show: true,
      })
    })
  }
  handleClick = index => {
    const { dataList } = this.props
    this.props.onChange(dataList[index])
    this.changeVisible(false, true)
    this.setState({
      show: false,
    })
  }
  componentWillReceiveProps(next) {
    if (this.props.value && next.value === this.props.value) {
      this.setState({
        value: this.props.value,
      })
    }
  }
  leftClick = () => {
    this.changeVisible()
    this.setState({
      show: false,
    })
  }
  mainView() {
    const { dataList = [] } = this.props
    const defaultValue = this.props.value
    const { value, show } = this.state
    let arr = []
    dataList.map((item, index) => {
      // item = highlight(item, value)
      // let re = new RegExp(value, 'g') //定义正则
      // item = item.replace(re, `<span>${value}</span>`) //进行替换，并定义高亮的样式
      let values = item.split(value);
      let str = values.join('<span>' + value + '</span>')        
      arr.push(str)
    })
    return (
      <div className={style.root}>
        <NavBar
          mode="light"
          className={style.nav}
          icon={<Icon type="left" />}
          onLeftClick={this.leftClick}
          rightContent={<span onClick={() => this.save()}>保存</span>}
        >
          所在公司
        </NavBar>
        <div className={style.search}>
          <InputItem
            clear
            defaultValue={defaultValue}
            // value={value}
            placeholder="请输入公司名称"
            onChange={this.onChange}
          />
        </div>
        <ul className={`${style.list} ${show ? style.show : style.hide}`}>
          {arr.map((item, index) => {
            return (
              <li
                key={index}
                onClick={this.handleClick.bind(this, index)}
                dangerouslySetInnerHTML={{ __html: item }}
              />
            )
          })}
        </ul>
      </div>
    )
  }
}

export default ComplexSelView
