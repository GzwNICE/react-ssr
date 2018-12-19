import React, { PureComponent } from 'react'
import { withRouter, Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { getAllInfo } from '../../actions/resume'
import { remove as languagesRemove } from '../../actions/languages'
import { NavBar, Flex, List, SwipeAction, Icon, Tabs, Radio, Accordion } from 'antd-mobile'
import style from './style.less'
import tickImg from '../../static/tick.png'

const RadioItem = Radio.RadioItem
const Item = List.Item
const tabs = [
  { title: '语言能力' },
  { title: '技能水平' },
]
@connect(state => {
  return {
    option: state.option,
    languages: state.languages.list,
  }
})
@withRouter
class ResumeInfo extends PureComponent {
  state = {
    language: [
      {
        value: 0,
        key: 'yingyu',
      },
      {
        value: 1,
        key: 'riyu',
      },
    ],
  }

  componentDidMount() {
    this.props.dispatch(getAllInfo({
      appchannel: 'web',
    }))
  }

  goTo(id) {
    this.props.history.push(`/resume/language/${id}`)
  }

  removeItem(item) {
    this.props.dispatch(languagesRemove({
      lang_id: item.id,
    }))
  }

  onChange = (value, key) => {
    console.log(value, key);
    let { language } = this.state
    language = language.map((item) => {
      if (item.key === key) {
        if (item.value === value) {
          return null
        }
      }
    })
    console.log(language)
    let obj = {
      value,
      key,
    }
    language.push(obj)
    // this.setState({
    //   value,
    //   key,
    // });
  };
  language = () => {
    const { language } = this.state
    const data = [
      { value: 0, label: 'yiban', text: '一般' },
      { value: 1, label: 'lianghao', text: '良好' },
      { value: 2, label: 'shulain', text: '熟练' },
      { value: 3, label: 'jingtong', text: '精通' },
    ]
    const arr = [
      {
        title: '英语',
        key: 'yingyu',
      },
      {
        title: '日语',
        key: 'riyu',
      },
      {
        title: '法语',
        key: 'fayu',
      },
      {
        title: '德语',
        key: 'deyu',
      },
      {
        title: '俄语',
        key: 'eyu',
      },
      {
        title: '其他',
        key: 'other',
      },
    ]
    const content = (
      arr.map((item, index) => {
        const header = (
          <div className={style.title}>
            {item.key === 1 ? <img src={tickImg} /> : null}
            <span>{item.title}</span>
          </div>
        )
        return  (
          <Accordion.Panel header={header} key={index}>
            <Flex className={style.option}>
              {data.map(i => {
                let checked = false
                language.map((item1) => {
                  if (item1.value === i.value && item1.key === item.key ) {
                    checked = true
                  }
                })

                return (
                  <Flex.Item key={i.value}>
                    <Radio key={i.value } onChange={() => this.onChange(i.value, item.key)} >{i.text}</Radio>
                  </Flex.Item>
                )
              })}
            </Flex>
          </Accordion.Panel>
        )
      })
    )

    return  (
      <Accordion defaultActiveKey="0">
        {content}
      </Accordion>
    )

  }
  render() {
    const {
      option,
      languages=[],
    } = this.props

    return (
      <Flex direction="column" align="stretch" className={style.root}>
        <NavBar
          mode="light"
          className={style.nav}
          icon={<Icon type="left" />}
          onLeftClick={() => this.props.history.goBack()}
          rightContent={<span onClick={() => this.changeValue()}>保存</span>}>
          语言与技能
        </NavBar>

        <Tabs tabs={tabs}
              // initialPage={0}
              onChange={(tab, index) => { console.log('onChange', index, tab); }}
              onTabClick={(tab, index) => { console.log('onTabClick', index, tab); }}
        >
          <div className={style.wraper}>
            {this.language()}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '150px', backgroundColor: '#fff' }}>
            Content of second tab
          </div>
        </Tabs>
      </Flex>
    )
  }
}

export default ResumeInfo
