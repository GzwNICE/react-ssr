import React, { PureComponent } from 'react'
import { withRouter, Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { createForm } from 'rc-form'
// import { remove as languagesRemove } from '../../actions/languages'
import { remove as skillsRemove } from '../../actions/skills'

import { NavBar, Flex, List, SwipeAction, Icon, Tabs, Radio, Accordion, Checkbox, Modal, Button, InputItem, Toast } from 'antd-mobile'
import style from './style.less'
import tickImg from '../../static/tick.png'
import { edit as languageEdit } from '../../actions/languages'
import { lanSkills } from '../../actions/languages'

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
    })
  }
  removeItem = (e, item) => {
    e.stopPropagation()
    console.log(e)
    this.props.dispatch(skillsRemove({
      skill_id: item.key,
    }))
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

  changeValue = () => {
    // 这边是保存的一个，这个项目最好是原来怎么样还怎么样返回过去,添加删除时不和后端交互，只有点击保存时才交互
    // this.props.dispatch(languageEdit({
    //   ...values,
    //   id: this.props.match.params.id,
    // })).then(data => {
    //   this.props.history.goBack()
    // })
  }

  goBack = () => {
    // this.props.history.goBack()
    this.setState({
      showModal: true,
    })
  }
  // 退出
  handleExit = () => {
    console.log('tuichu')
  }
  // 继续填写
  handleContinue = () => {
    this.setState({
      showModal: false,
    })
  }
  // 添加技能
  handleAddSkill = () => {
    this.props.form.validateFields((err, values) => {
      if (err) return
      // console.log(values.skill)
      if (values.skill.length < 1) {
        Toast.info('技能不能为空', 2)
      } else {
        const { skill } = this.state
        let arr111 = []
        let obj = {
          value: '',
          key: values.skill,
        }
        // console.log(skill)
        console.log(arr111)
        let arr1 = arr111.push(obj)
        console.log(arr1)
        // this.setState({
        //   skill: arr,
        //   showAddSkillModal: false,
        // })
      }
    })

  }
  render() {
    const { showModal, showAddSkillModal } = this.state
    const { getFieldProps } = this.props.form
    return (
      <Flex direction="column" align="stretch" className={style.root}>
        <NavBar
          mode="light"
          className={style.nav}
          icon={<Icon type="left" />}
          onLeftClick={this.goBack}
          rightContent={<span onClick={() => this.changeValue()}>保存</span>}>
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
            <div className={style.addSkill} onClick={() => { this.setState({showAddSkillModal: true})}}>
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
            {...getFieldProps('skill')}
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
