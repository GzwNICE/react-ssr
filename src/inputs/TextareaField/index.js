import React from 'react'
import ComplexFormField from '../../components/Complex/ComplexFormField'
import { NavBar, List, TextareaItem, Icon, Toast } from 'antd-mobile'
import style from './style.less'
import { connect } from 'react-redux'
import { getWorkExample } from '../../actions/work_exps'

@connect(state => {
  return {
    getWorkExample: state.work_exps.get_work_example,
  }
})
class TextareaField extends ComplexFormField {
  constructor(props) {
    super(props)
    this.state = {
      value: props.value,
      hide: true, // 看看别人怎么写显示隐藏
      count: 0, // 计数
    }
  }
  componentDidMount() {
    this.props.dispatch(
      getWorkExample({
        appchannel: 'web',
      })
    )
  }
  handleValueChange = value => {
    const len = value.length
    this.setState({
      value,
      count: len,
    })
  }

  changeValue() {
    const { count } = this.state
    if (count === 0) {
      Toast.info('请填写岗位职责', 2)
    } else {
      this.props.onChange(this.state.value)
      this.changeVisible()
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.value !== nextProps.value) {
      this.setState({ value: nextProps.value })
    }
  }
  handleLook = () => {
    this.setState({
      hide: !this.state.hide,
    })
  }
  handleExchange = () => {
    this.props.dispatch(
      getWorkExample({
        appchannel: 'web',
      })
    )
  }
  modelRender = () => {
    const { getWorkExample } = this.props
    // const arr = getWorkExample.content_cn.split('。')
    // console.log(arr)
    return (
      <div className={style.wraper2}>
        <div className={style.moadl}>
          <div className={style.title}>
            <span>{getWorkExample.title_cn}</span>
            <span onClick={this.handleExchange}>换一个</span>
          </div>
          <div className={style.content}>
            <TextareaItem
              autoHeight
              value={`${getWorkExample.content_cn || ''}`}
              rows={1}
              editable={false}
            />
            {/*{*/}
            {/*arr.map((item, index) => <p key={index}>{item}。</p>)*/}
            {/*}*/}
          </div>
        </div>
        <div className={style['triangle-up']} />
      </div>
    )
  }
  allView() {
    // console.log(this.props)
    const { hide, count } = this.state
    return (
      <List>
        <TextareaItem
          // autoHeight
          rows={12}
          value={this.state.value}
          placeholder={this.props.placeholder}
          maxLength={this.props.maxLength}
          onChange={this.handleValueChange}
          // count={this.props.count}
        />
        <div className={style.footer}>
          <div className={style.wraper}>
            <span onClick={this.handleLook}>看看别人怎么写</span>
            <span className={style.last}>
              {count}
              <span>/2000</span>
            </span>
          </div>
          {hide ? null : this.modelRender()}
        </div>
      </List>
    )
  }

  wrapView(opt, main) {
    return (
      <div className={style.wrap}>
        <div className={style.opt}>{opt}</div>
        <div className={style.all}>{main}</div>
      </div>
    )
  }

  mainView() {
    return (
      <div className={style.root}>
        <NavBar
          mode="light"
          className={style.nav}
          icon={<Icon type="left" />}
          onLeftClick={() => this.changeVisible()}
          rightContent={<span onClick={() => this.changeValue()}>保存</span>}
        >
          {this.props.title || this.props.children.props.children}
        </NavBar>
        {/*{this.allView(this.props.options)}*/}
        {this.wrapView(this.allView(this.props.options))}
      </div>
    )
  }
}

export default TextareaField
