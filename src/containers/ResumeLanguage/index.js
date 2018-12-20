import React, { PureComponent } from 'react'
import { withRouter, Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { createForm } from 'rc-form'
import { remove as languagesRemove } from '../../actions/languages'
import { remove as skillsRemove } from '../../actions/skills'

import { NavBar, Flex, List, SwipeAction, Icon, Tabs, Radio, Accordion, Checkbox, Modal, Button, InputItem, Toast } from 'antd-mobile'
import style from './style.less'
import tickImg from '../../static/tick.png'
import { edit as languageEdit } from '../../actions/languages'
import { lanSkills } from '../../actions/languages'
import { setLanSkills } from '../../actions/languages'

const CheckboxItem = Checkbox.CheckboxItem
const tabs = [
  { title: '语言能力' },
  { title: '技能水平' },
]
const ability = [
  { value: '2', text: '一般' },
  { value: '3', text: '良好' },
  { value: '4', text: '熟练' },
  { value: '5', text: '精通' },
]
@connect(state => {
  return {
    option: state.option,
    languages: state.languages.get_languages,
    skills: state.languages.get_skills,
  }
})
@createForm()
@withRouter
class ResumeInfo extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      language: [
        // {
        //   value: '3',  // 熟练度
        //   key: '1',    // 语言
        // },
      ],
      skill: [
        // {
        //   value: '2',  // 熟练度
        //   key: 'ppt', // 技能
        // },
      ],
      skillArr: [],  // 技能数组遍历使用
      showModal: false,
      showAddSkillModal: false, // 添加技能modal
      inputChangeVal: '',   // 添加技能输入框内容
      operation: false,    // 页面只有有操作就为true,保存过为false
    }
  }
  componentDidMount() {
    this.init()
  }

  init = () => {
    this.props.dispatch(lanSkills({
      appchannel: 'web',
    })).then(() => {
      const {
        languages,
        skills,
      } = this.props
      console.log(languages)
      console.log(skills)

      let arrLan = languages.map(item => {
        let obj = {
          value: item.ability,
          key: item.language,
        }
        return obj
      })

      // 保证技能水平的名称重复的只显示一个
      let arrSkill = []
      let keyArr = []
      skills.map(item => {
        if (item.ability && item.skill_cn) {
          keyArr.push(item.skill_cn)
          let obj = {
            value: item.ability,
            key: item.skill_cn,
          }
          arrSkill.push(obj)
        }
      })
      keyArr = [...new Set(keyArr)]
      let arrSkill2 = []
      keyArr.map((item1) => {
        let obj = {}
        arrSkill.map((item2) => {
          if (item1 === item2.key) {
            obj = {
              value: item2.value,
              key: item2.key,
            }
          }
        })
        arrSkill2.push(obj)
      })

      // 技能遍历数据
      let skillArr = []
      arrSkill2.map(item => {
        let obj = {
          title: item.key,
          key: item.key,
        }
        skillArr.push(obj)
      })
      this.setState({
        language: arrLan,
        skill: arrSkill2,
        skillArr,
      })
    })
  }
  goTo(id) {
    this.props.history.push(`/resume/language/${id}`)
  }

  // 下面自己写的
  onLanguageChange = (value, key) => {
    let { language } = this.state

    const languageArr = this.onChange(language, value, key)
    this.setState({
      language: languageArr,
      operation: true,
    })
  }

  language = () => {
    const { language } = this.state
    const data = [...ability]
    const arr = [
      { title: '英语', key: '1' },
      { title: '日语', key: '2' },
      { title: '法语', key: '3' },
      { title: '德语', key: '4' },
      { title: '俄语', key: '5' },
      { title: '其他', key: '15' },
    ]
    const content = (
      arr.map((item, index) => {
        let showImg = false
        language.map((itemShow) => {
          if (itemShow.key === item.key ) {
            showImg = true
          }
        })
        const header = (
          <div className={style.title}>
            {showImg ? <img src={tickImg} /> : null}
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
                    <CheckboxItem key={i.value} checked={checked} onChange={() => this.onLanguageChange(i.value, item.key)}>
                      {i.text}
                    </CheckboxItem>
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

  onChange = (oldVal, value, key ) => {
    let arrLanguage = [...oldVal]
    let arrKey = []
    let obj = {
      value,
      key,
    }
    arrLanguage.map((item, index) => {
      if (item.key === key) {
        if (item.value === value) {
          arrLanguage.splice(index, 1)
        } else {
          arrLanguage[index] = obj
        }
      }
      arrKey.push(item.key)
    })
    if (arrKey.indexOf(key) === -1) {
      arrLanguage.push(obj)
    }
    return arrLanguage
  }

  onSkillChange = (value, key) => {
    // console.log(value, key)
    let { skill } = this.state
    const skillArr = this.onChange(skill, value, key)

    this.setState({
      skill: skillArr,
      operation: true,
    })
  }
  // 技能水平-删除
  removeItem = (e, item) => {
    e.stopPropagation()
    const { skillArr, skill } = this.state
    let arr = [...skillArr]
    let arr2 = [...skill]
    arr.map((i, index) => {
      if (i.key === item.key) {
        arr.splice(index, 1)
      }
    })
    arr2.map((i, index) => {
      if (i.key === item.key) {
        arr2.splice(index, 1)
      }
    })
    this.setState({
      skillArr: arr,
      skill: arr2,
      operation: true,
    })
  }
  skills = () => {
    const { skill, skillArr } = this.state
    const data = [...ability]
    const content = (
      skillArr.map((item, index) => {
        const header = (
          <div className={style.titleSkill}>
            <div className={style.left}>
              <span>{item.title}</span>
              <div><i className={`arrow ${style.skillArrow}`}/></div>
            </div>
            <div className={style.right} onClick={(e) => this.removeItem(e, item)}>删除</div>
          </div>
        )
        return  (
          <Accordion.Panel header={header} key={index}>
            <Flex className={style.option}>
              {data.map(i => {
                let checked = false
                skill.map((item1) => {
                  if (item1.value === i.value && item1.key === item.key ) {
                    checked = true
                  }
                })

                return (
                  <Flex.Item key={i.value}>
                    <CheckboxItem key={i.value} checked={checked} onChange={() => this.onSkillChange(i.value, item.key)}>
                      {i.text}
                    </CheckboxItem>
                  </Flex.Item>
                )
              })}
            </Flex>
          </Accordion.Panel>
        )
      })
    )

    return  (
      <Accordion defaultActiveKey="0" className={style.content}>
        {content}
      </Accordion>
    )

  }

  saveValue = () => {
    const { language, skill } = this.state
    // language.map  value: "2", key: "1      language: "15", ability:
    let arr = []
    let arr2 = []
    language.map((item) => {
      let obj = {
        "language": item.key,
        "ability": item.value,
      }
      arr.push(obj)
    })
    skill.map((item) => {
      let obj = {
        "skill_cn": item.key,
        "ability": item.value,
      }
      arr2.push(obj)
    })

    let parmas = {
      "get_languages": arr,
      "get_skills": arr2,
    }
    parmas = JSON.stringify(parmas)
    this.props.dispatch(setLanSkills({
      appchannel: 'web',
      data: parmas,
    })).then(() => {
      Toast.info('保存成功', 2)
      this.setState({
        operation: false,
      })
    })
  }

  goBack = () => {
    const { operation } = this.state
    if (operation) {
      this.setState({
        showModal: true,
      })
    } else {
      this.props.history.goBack()
    }
  }
  // 退出
  handleExit = () => {
    this.setState({
      showModal: false,
    })
    this.props.history.goBack()
  }
  // 继续填写
  handleContinue = () => {
    this.setState({
      showModal: false,
    })
  }
  // 添加技能输入框显示
  handleShowInputModal = () => {
    this.setState({
      inputChangeVal: '',
      showAddSkillModal: true,
    })
  }
  // 添加技能输入框内容change
  handleInputChange = (item) => {
    this.setState({
      inputChangeVal: item,
    })
  }
  // 添加技能确定
  handleAddSkill = () => {
    const { inputChangeVal } = this.state
    if (inputChangeVal.length < 1) {
      Toast.info('技能不能为空', 2)
    } else {
      const { skillArr, skill } = this.state
      let arr = [...skillArr]
      let arr2 = [...skill]
      let obj = {
        title: inputChangeVal,
        key: inputChangeVal,
      }
      let obj2 = {
        value: '',
        key: inputChangeVal,
      }
      arr.unshift(obj)
      arr2.unshift(obj2)
      this.setState({
        skillArr: arr,
        showAddSkillModal: false,
        operation: true,
      })
    }

  }
  render() {
    const { showModal, showAddSkillModal } = this.state
    return (
      <Flex direction="column" align="stretch" className={style.root}>
        <NavBar
          mode="light"
          className={style.nav}
          icon={<Icon type="left" />}
          onLeftClick={this.goBack}
          rightContent={<span onClick={() => this.saveValue()}>保存</span>}>
          语言与技能
        </NavBar>

        <Tabs tabs={tabs}
              initialPage={1}
              onChange={(tab, index) => { console.log('onChange', index, tab); }}
              onTabClick={(tab, index) => { console.log('onTabClick', index, tab); }}
        >
          <div className={style.wraper}>
            {this.language()}
          </div>
          <div className={style.wraperSkill}>
            {this.skills()}
            <div className={style.addSkill} onClick={this.handleShowInputModal}>
              添加技能
            </div>
          </div>
        </Tabs>

        <Modal
          visible={showModal}
          transparent
          maskClosable={false}
          className={style.modal}
          title="内容尚未保存"
        >
          <div className={style.modalBody}>
            <p>你确定要退出吗?</p>
            <div>
              <div onClick={this.handleExit}>退出</div>
              <div onClick={this.handleContinue}>继续填写</div>
            </div>
          </div>
        </Modal>

        <Modal
          visible={showAddSkillModal}
          transparent
          maskClosable={true}
          className={style.addSkillModal}
          title="添加技能"
        >
          <InputItem
            onChange={this.handleInputChange}
            placeholder="请输入30个字以内的技能"
            maxLength={30}/>
          <div className={style.confirm}>
            <div onClick={this.handleAddSkill}>确定</div>
          </div>
        </Modal>
      </Flex>
    )
  }
}

export default ResumeInfo
