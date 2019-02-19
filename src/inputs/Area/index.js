import React from 'react'
import ComplexFormField from '../../components/Complex/ComplexFormField'
import { NavBar, Icon } from 'antd-mobile'
import style from './style.less'
import { connect } from 'react-redux'
import { Toast } from 'antd-mobile/lib/index'
// import guanbiIcon from '../../static/guanbi@2x.png'
const triggerCity = "城市"

@connect(state => {
  return {
    options: state.option.areas,
    optIndex: state.option.areas_index || {},
    hot: state.option.opts_hot_area,
    coord: state.supers.location,
  }
})
class ComplexSelView extends ComplexFormField {
  static defaultProps = {
    value: [],
    maxLength: 1,
    root: true,
  }
  constructor(props) {
    super(props)
    this.state = {
      value: [],
      maxLength: 1,
      root: true,
      optionsSubChil: [], // 右侧数据
      clickCode: 'hot', // 右侧点击省份的code
      hotData: [], // 热门城市
      selectedHight: 60, // 顶部被选中城市框的高度
    }
    this.saveRef = ref => {
      this.refDom = ref
    }
  }
  componentDidMount() {
    const { hot } = this.props
    let hotData = {
      value: '热门城市',
      code: 'hot',
      sublist: hot,
    }
    // console.log(hotData)

    this.setState({
      optionsSubChil: hot,
      hotData,
      value: this.props.value,
    })
  }
  format(value = []) {
    if (this.props.optIndex) {
      return value.map(code => this.props.optIndex[code]).join(',')
    } else {
      return null
    }
  }

  serialize(value) {
    let val = value instanceof Array ? [...value] : { ...value }
    if (!val.hasOwnProperty('optIndex'))
      Object.defineProperty(val, 'optIndex', {
        get: () => this.props.optIndex,
      })
    return val
  }

  filter = code => {
    return this.getValue().indexOf(code) >= 0
  }
  selectValue = (code,value) => {
    code = String(code)
    window.zhuge.track('城市筛选', {[`${triggerCity}`]: value})
    if (this.props.maxLength > 1) {
      const { maxLength } = this.props
      let value = [...this.getValue()]
      let indexof = value.indexOf(code)
      let type = this.props.type
      if (indexof >= 0) {
        // 已经存在
        value.splice(indexof, 1)
      } else {
        // 新添加的
        if (maxLength <= 0 || value.length < maxLength) {
          value.push(code)
          value = value.filter(item => item !== 0)
          if (type === 'Industry' && code === 0) value = [0]
        } else {
          return Toast.info(`最多选择 ${maxLength} 个哦!`, 1)
        }
      }
      this.setState({ value }, () => {
        const { clientHeight } = this.refDom
        this.setState({
          selectedHight: clientHeight,
        })
      })
    } else {
      // if(this.state.value[0] === code) {
      //   this.setState({ value: [] })
      // } else {
      //
      // }
      this.setState({ value: [code] }, () => this.changeValue())
      // setTimeout(() => this.changeValue())
    }
  }

  changeValue = () => {
    if (this.props.onChange) {
      this.props.onChange(this.serialize(this.getValue()))
      this.changeVisible(false, true)
    } else {
      this.changeVisible()
    }
  }

  handleVisible = visible => {
    if (!visible && this.props.root) {
      this.setState({ value: this.props.value })
    }
  }
  componentWillReceiveProps(nextProps) {
    if (
      this.props.root &&
      JSON.stringify(this.props.value) !== JSON.stringify(nextProps.value)
    ) {
      this.setState({ value: nextProps.value })
    }
  }

  getValue() {
    return this.props.root ? this.state.value : this.props.value
  }

  save = () => {
    const { value } = this.state
    if (value.length > 0) {
      this.props.onChange(value)
      this.changeVisible(false, true)
    } else {
      Toast.info('请至少选择一项', 2)
    }
  }

  handleChangeSubChil = item => {
    this.setState({
      clickCode: item.code,
    })
    if (item.sublist) {
      this.setState({
        optionsSubChil: item.sublist,
      })
    } else {
      this.setState({
        optionsSubChil: [],
      })
    }
  }
  componentDidUpdate() {
    if (this.refDom) {
      const { clientHeight } = this.refDom
      this.setState({
        selectedHight: clientHeight,
      })
    }
  }
  // <img src={guanbiIcon} onClick={() => (this.props.onSelect || this.selectValue)(code)}/>

  optView() {
    const selected = this.getValue() || []
    return (
      <div className={style.selected} ref={this.saveRef}>
        {selected.length === 0 ? (
          <div className={style.title}>{`最多可选 ${
            this.props.maxLength
          } 个`}</div>
        ) : null}
        <div className={style.num}>
          {selected.length}
          <span>/{this.props.maxLength}</span>
        </div>
        {selected.map(code => (
          <div key={code} className={style['select-content']}>
            <slot>
              {this.props.optIndex ? this.props.optIndex[code] : null}
            </slot>
            <Icon
              onClick={() => (this.props.onSelect || this.selectValue)(code)}
              type="cross"
            />
          </div>
        ))}
      </div>
    )
  }

  mainView() {
    const { options = [] } = this.props
    const {
      value,
      optionsSubChil,
      clickCode,
      hotData,
      selectedHight,
    } = this.state
    if (this.props.coord && this.props.coord.address) {
      Object.keys(this.props.optIndex || {}).forEach(key => {
        if (this.props.coord.address.code && this.props.coord.address.code[0]) {
          if (key === this.props.coord.address.code[0]) {
            this.myCity = key
          }
        }
        // if (new RegExp(this.props.optIndex[key]).test(this.props.coord.address.city)) {
        //   console.log(key)
        //   this.myCity = key
        // }
      })
    }
    let styleObj = {
      top: `${55 + selectedHight}px`,
    }
    let myCityCkecked = false
    value.forEach(item => {
      if (item === this.myCity) {
        myCityCkecked = true
      }
    })
    let rightContent =
      this.props.maxLength && this.props.maxLength > 1 ? (
        <span onClick={() => this.save()}>保存</span>
      ) : null
    return (
      <div className={style.root}>
        <NavBar
          mode="light"
          className={style.nav}
          icon={<Icon type="left" />}
          onLeftClick={() => this.changeVisible()}
          rightContent={rightContent}
        >
          选择城市
        </NavBar>
        {this.optView()}
        <div className={style.wrap} style={styleObj}>
          <ul className={style.left}>
            <li onClick={this.handleChangeSubChil.bind(this, hotData)}>
              热门
              {clickCode === 'hot' ? <i /> : null}
            </li>
            {options
              .filter(item => item.code !== '380000')
              .map((item, index) => (
              <li
                key={index}
                onClick={this.handleChangeSubChil.bind(this, item)}
              >
                {item.value}
                {clickCode === item.code ? <i /> : null
                // value.map((item2, index2) => {
                //   let subCode = item2.slice(0, 2)
                //   if (item.code.indexOf(subCode) !== -1) {
                //     return <i key={index2}/>
                //   }
                // })
                }
              </li>
            ))}
          </ul>
          <ul className={style.right}>
            <li className={style.mycity}>
              <span>当前定位</span>
              {this.myCity && clickCode === 'hot' ? (
                <span
                  onClick={() =>
                    (this.props.onSelect || this.selectValue)(this.myCity)
                  }
                  style={{ color: myCityCkecked ? '#FF4F00' : '#4A4A4A' }}
                >
                  {this.props.optIndex[this.myCity]}
                </span>
              ) : (
                <span>定位失败</span>
              )}
            </li>

            <ul className={style.content}>
              {optionsSubChil
                ? optionsSubChil.map((item, index) => {
                    let isChecked = false
                    value.map((item2) => {
                      if (item.code === item2) {
                        isChecked = true
                      }
                    })
                    return (
                      <li
                        className={style.citymode}
                        onClick={() =>
                          (this.props.onSelect || this.selectValue)(item.code,item.value)
                        }
                        style={{ color: isChecked ? '#FF4F00' : '#4A4A4A' }}
                        key={index}
                      >
                        {item.value}
                      </li>
                    )
                  })
                : null}
            </ul>
          </ul>
        </div>
      </div>
    )
  }
}

export default ComplexSelView
