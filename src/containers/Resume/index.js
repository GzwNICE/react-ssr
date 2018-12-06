import React, { PureComponent } from 'react'
import { withRouter, Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { getAllInfo, avatar } from '../../actions/resume'
import { NavBar, Card, Flex, Modal, TextareaItem, Icon } from 'antd-mobile'
// import queryString from 'query-string'
import BitmapMin from 'bitmap-min'
import style from './style.less'
import editIcon from '@static/edit@3x.png'
import setIcon from '@static/set.png'
import refreshIcon from '@static/refresh2@3x.png'
import previewIcon from '@static/preview@2x.png'
import portraitIcon from '@static/portrait@3x.png'

const Pla = (props) =>
  <i style={{display: 'inline-block', width: props.w + 'em'}} />

@connect(state => {
  return {
    option: state.option,
    resume: state.resume,
    DesiredPositions: (state.DesiredPositions.list || []).map(item => item.position),
    DesiredLocations: (state.DesiredLocations.list || []).map(item => item.location),
    DesiredJob: state.DesiredJob,
    educationals: state.educationals.list || [],
    work_exps: state.work_exps.list || [],
    languages: state.languages.list || [],
    skills: state.skills.list || [],
    training_exps: state.training_exps.list || [],
    certificates: state.certificates.list || [],
    other_exps: state.other_exps.list || [],
  }
})
@withRouter
class Resume extends PureComponent {
  handleFaceChange = (ev) => {
    this.bitmapMin.load(ev.target.files[0], (base64, blob) => {
      this.props.dispatch(avatar({
        avatar: blob,
      })).then(() => {
        this.props.dispatch(getAllInfo({
          appchannel: 'web',
        }))
        window.zhuge.track('我的简历', { '模块': '添加头像' })
      })
    })
  }

  componentDidMount() {
    this.canRun = true
    this.bitmapMin = new BitmapMin({
      width: 360,  // 最大宽度
      height: 360, // 最大高度
      jpeg: false,  // 强制转为 jpeg|jpg
      quality: .7, // jpeg|jpg 图片的质量
    })
    this.props.dispatch(getAllInfo({
      appchannel: 'web',
    }))
      .then( data => {
        if(data.errMsg === '未登陆') {
          return Modal.alert('', '请先登录', [
            { text: '稍后', style: 'default' },
            { text: '登录', onPress: () => this.props.history.replace('/user/login?redirect=' + this.props.history.location.pathname) },
          ])
        }
      })
    window._hmt && window._hmt.push(['_trackPageview', window.location.href])
    this.page = document.getElementById('page')
  }

  whereWillIGo = () => {
    const { history } = this.props
    history.length === 2 || history.length === 1
      ? history.push('/tabs/home')
      : history.go(-1)
  }

  onScroll = () => {
    if(!this.canRun) return
    this.canRun = false
    setTimeout(() => {
      console.log(this.page.scrollTop)
      this.canRun = true
    }, 400)
  }

  render() {
    const {
      option,
      resume,
      DesiredPositions,
      DesiredLocations,
      DesiredJob,
      educationals,
      work_exps,
      languages,
      skills,
      training_exps,
      certificates,
      other_exps,
    } = this.props

    return (
      <Flex direction="column" align="stretch" className={style.wraper}>
        <div className={style.header}>
          <Icon
            type="left"
            onClick={() => {this.whereWillIGo()}}
            className={style.nav}/>
        </div>
        <Flex.Item onScroll={this.onScroll} id="page" className={style.content}>
            <div className={style.firstcard}>
              <div className={style.photo}>
                <img src={resume.photo ? resume.photo : portraitIcon} />
              </div>
              <p className={style.title}>张杰的简历</p>
              <p className={style.subTitle}>简历完善度:<span>70%</span></p>
              <Flex>
                <Flex.Item>
                  <img src={setIcon} />
                  <p>设置</p>
                </Flex.Item>
                <Flex.Item>
                  <img src={previewIcon} />
                  <p>预览</p>
                </Flex.Item>
                <Flex.Item>
                  <img src={refreshIcon} />
                  <p>刷新</p>
                </Flex.Item>
              </Flex>
            </div>
            <Card
              className={style.card}>
              <Card.Header
                title={<span>基本信息 <span>(必填)</span></span>}
                extra={<Link to="/resume/info"><img src={editIcon} /></Link>} />
              <Card.Body className={style['card-body']}>
                <div>
                  <span>姓<Pla w={2} />名：</span>{resume.true_name_cn}
                </div>
                <div>
                  <span>性<Pla w={2} />别：</span>{option.opts_gender.filter(item => parseInt(resume.gender, 10) === item.code).map(item => item.value)[0] || '未知'}
                </div>
                <div>
                  <span>年<Pla w={2} />龄：</span>
                  {/*(() => {
                    const now = new Date()
                    const birthday = new Date(resume.birthday)
                    return parseInt((now.getFullYear() - birthday.getFullYear()) +
                      (now.getMonth() - birthday.getMonth()) / 100 +
                      (now.getDate() - birthday.getDate()) / 10000, 10)
                  })()*/}
                  {resume.age}
                </div>
                {/*<div>*/}
                  {/*<span>所在城市：</span>*/}
                  {/*{option.areas_index[resume.current_location]}*/}
                {/*</div>*/}
                <div>
                  <span>工作年限：</span>{resume.work_year}
                </div>
                <div>
                  <span>手机号码：</span>{resume.mobile}
                </div>
                <div>
                  <span>联系邮箱：</span>{resume.email}
                </div>
                {/*<div>*/}
                  {/*<span>求职状态：</span>*/}
                  {/*{option.opts_job_status_index[resume.job_status]}*/}
                {/*</div>*/}
              </Card.Body>
            </Card>
            <Card
              className={style.card}>
              <Card.Header
                title={<span>求职意向 <span>(必填)</span></span>}
                extra={<Link to="/resume/intention"><img className={style.edit} src={editIcon} /></Link>} />
              <Card.Body className={style.main}>
                <div><span>求职岗位</span>：{DesiredPositions.map(item => option.positions_index[item]).join(', ')}</div>
                <div><span>工作地点</span>：{DesiredLocations.map(item => option.areas_index[item]).join(', ')}</div>
                <div><span>期望薪资</span>：{option.opts_salary.salary_scope_index[DesiredJob.desired_salary]}</div>
              </Card.Body>
            </Card>
            <Card
              className={style.card}>
              <Card.Header
                title={<span>教育经历</span>}
                extra={<Link to="/resume/education"><img className={style.edit} src={editIcon} /></Link>} />
              <Card.Body className={style.main}>
                {educationals.map(item => (
                  <Flex key={item.id} direction="column" align="stretch" className={style.panel}>
                    <div>{item.school_cn || '学校名称'}</div>
                    <Flex>
                      <Flex.Item>
                        <span>{ item.major_cn || option.opts_edu_major[item.major_id].value || '不限'}</span> | <span>{option.opts_education_index[item.degree] || '不限'}</span>
                      </Flex.Item>
                      <span>{item.begin_year}-{item.end_year !== '0' ? item.end_year : '至今'}</span>
                    </Flex>
                  </Flex>
                ))}
              </Card.Body>
            </Card>
            <Card
              className={style.card}>
              <Card.Header
                title={<span>工作经验</span>}
                extra={<Link to="/resume/experience"><img className={style.edit} src={editIcon} /></Link>} />
              <Card.Body className={style.main}>
                {work_exps.map(item => (
                  <Flex key={item.id} direction="column" align="stretch" className={style.panel}>
                    <div>{item.company_name_cn}</div>
                    <Flex>
                      <Flex.Item>{option.positions_index[item.position_id]}</Flex.Item>
                      <span>{`${item.begin_year}.${item.begin_month}`}-{item.end_year !== '0' ? `${item.end_year}.${item.end_month}` : '至今'}</span>
                    </Flex>
                    <div className={style.info}>
                      <span>{item.job_responsibilities_cn}</span>
                    </div>
                  </Flex>
                ))}
              </Card.Body>
            </Card>
            <Card
              className={style.card}>
              <Card.Header
                title={<span>语言能力</span>}
                extra={<Link to="/resume/language"><img className={style.edit} src={editIcon} /></Link>} />
              <Card.Body className={style.main}>
                {languages.map(item => (
                  <Flex key={item.id} className={style.panel}>
                    <Flex.Item>{option.opts_language_index[item.language]}</Flex.Item>
                    <Flex.Item>{option.opts_master_degree_index[item.ability]}</Flex.Item>
                  </Flex>
                ))}
              </Card.Body>
            </Card>
            <Card
              className={style.card}>
              <Card.Header
                title={<span>技能和特长</span>}
                extra={<Link to="/resume/skills"><img className={style.edit} src={editIcon} /></Link>} />
              <Card.Body className={style.main}>
                {skills.map(item => (
                  <Flex key={item.id} className={style.panel}>
                    <Flex.Item>{item.skill_cn}</Flex.Item>
                    <Flex.Item>{option.opts_master_degree_index[item.ability]}</Flex.Item>
                  </Flex>
                ))}
              </Card.Body>
            </Card>
            <Card
              className={style.card}>
              <Card.Header
                title={<span>培训经历</span>}
                extra={<Link to="/resume/training"><img className={style.edit} src={editIcon} /></Link>} />
              <Card.Body className={style.main}>
                {training_exps.map(item => (
                  <Flex key={item.id} direction="column" align="stretch" className={style.panel}>
                    <div>{item.institutions_cn}</div>
                    <Flex>
                      <Flex.Item>
                        <span>{item.course_cn}</span>
                      </Flex.Item>
                      <span>{item.begin_year}.{item.begin_month}-{item.end_year !== '0' ? `${item.end_year}.${item.end_month}` : '至今'}</span>
                    </Flex>
                  </Flex>
                ))}
              </Card.Body>
            </Card>
            <Card
              className={style.card}>
              <Card.Header
                title={<span>证书</span>}
                extra={<Link to="/resume/certificate"><img className={style.edit} src={editIcon} /></Link>} />
              <Card.Body className={style.main}>
                {certificates.map(item => (
                  <Flex key={item.id} className={style.panel}>
                    <Flex.Item>{item.certificate_cn}</Flex.Item>
                    <span>{item.obtained_year}.{item.obtained_month}</span>
                  </Flex>
                ))}
              </Card.Body>
            </Card>
            <Card
              className={style.card}>
              <Card.Header
                title={<span>自我描述</span>}
                extra={<Link to="/resume/description"><img className={style.edit} src={editIcon} /></Link>} />
              <Card.Body className={style.main}>
                
                {
                  other_exps.length > 0 ?
                  other_exps.map(item => (
                  <Flex key={item.id} direction="column" align="stretch" className={style.panel}>
                    {/*<div>{option.opts_topic_index[item.info_type]}</div>*/}
                    <div className={style.info}>
                      <TextareaItem
                        autoHeight
                        value={`${item.content_cn || ''}`}
                        rows={8}
                        editable={false}
                        placeholder={'请简明扼要地描述你的职业优势,让企业HR快速了解你~'}
                      />
                    </div>
                  </Flex>
                )) : '请简明扼要地描述你的职业优势,让企业HR快速了解你~'}
              </Card.Body>
            </Card>

        </Flex.Item>
      </Flex>
    )
  }
}

export default Resume
