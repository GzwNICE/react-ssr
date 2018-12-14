import React, { PureComponent } from 'react'
import { withRouter, Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { getAllInfo, avatar } from '../../actions/resume'
import { NavBar, Card, Flex, Modal, TextareaItem, Icon, Progress } from 'antd-mobile'
// import queryString from 'query-string'
import BitmapMin from 'bitmap-min'
import style from './style.less'
import editIcon from '../../static/edit@3x.png'
import setIcon from '../../static/set.png'
import refreshIcon from '../../static/refresh2@3x.png'
import previewIcon from '../../static/preview@2x.png'
import portraitIcon from '../../static/portrait@3x.png'
import addIcon from '../../static/add@3x.png'
import circleIcon from '../../static/circle.png'
import upIcon from '../../static/packUp@3x.png'
import downIcon from '../../static/packDown@3x.png'

const Pla = (props) =>
  <i style={{display: 'inline-block', width: props.w + 'em'}} />
const progressStyle = {
  height: '8px',
  borderRadius: '4px',
}
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
  state = {
    toogle: true, // 默认收起
  }

  componentDidMount() {
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
  }
  handleToogle() {
    this.setState({
      toogle: !this.state.toogle,
    })
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
    const { toogle } = this.state

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
                <span>性<Pla w={2} />别：</span>{option.opts_gender ? option.opts_gender.filter(item => parseInt(resume.gender, 10) === item.code).map(item => item.value)[0] || '未知' : '未知'}
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
              extra={<Link to="/resume/info"><img src={editIcon} /></Link>} />
            <Card.Body className={style['card-body']}>
              <div>
                <span>意向职位：</span>{DesiredPositions.map(item => option.positions_index[item]).join(', ')}
              </div>
              <div>
                <span>意向行业：</span>
              </div>
              <div>
                <span>意向地点：</span>{DesiredLocations.map(item => option.areas_index[item]).join(', ')}
              </div>
              <div>
                <span>期望薪资：</span>{option.opts_salary ? option.opts_salary.salary_scope_index[DesiredJob.desired_salary] : ''}
              </div>
              <div>
                <span>求职状态：</span>{option.opts_job_status_index[resume.job_status]}
              </div>
            </Card.Body>
          </Card>
          <Card
            className={style.card}>
            <Card.Header
              title={<span>工作经历 <span>(必填)</span></span>}/>
            <Card.Body className={style['card-job']}>
              <div className={style['card-job-wraper']}>
                <img src={circleIcon} className={style['card-job-wraper-circle']}/>
                <span>大唐福利 | 杭州香1111122222111港酒店</span>
                <img src={editIcon} className={style['card-job-wraper-editor']}/>
                <p>2018.03-至今</p>
                <p>1.的房间卡了发的卡拉夫看了发的卡手机付款了大家快来</p>
              </div>
              <div className={style['card-job-footer']}>
                <img src={addIcon}/>
                添加工作经验
              </div>
            </Card.Body>
          </Card>
          <Card
            className={style.card}>
            <Card.Header
              title={<span>教育经历 <span>(必填)</span></span>}/>
            <Card.Body className={style['card-education']}>
              <div className={style['card-education-wraper']}>
                <img src={circleIcon} className={style['card-education-wraper-circle']}/>
                <p>中国能放得开学院</p>
                <img src={editIcon} className={style['card-education-wraper-editor']}/>
                <p>本科 | 环境的房间的咖啡</p>
                <p>2014年毕业</p>
                <div className={style['card-education-wraper-line']}></div>
              </div>
              <div className={style['card-education-wraper']}>
                <img src={circleIcon} className={style['card-education-wraper-circle']}/>
                <p>中国能放得开学院</p>
                <img src={editIcon} className={style['card-education-wraper-editor']}/>
                <p>本科 | 环境的房间的咖啡</p>
                <p>2014年毕业</p>
              </div>
              <div className={style['card-education-footer']}>
                <img src={addIcon}/>
                添加工作经验
              </div>
            </Card.Body>
          </Card>
          <Card className={style.card}>
            <Card.Header
              title={<span>语言/技能</span>}
              extra={<Link to="/resume/info"><img src={editIcon} /></Link>} />
            <Card.Body className={style['card-language']}>
              <div className={style['card-language-content']}>
                <div className={style['card-language-content-header']}>
                  <span>普通话</span>
                  <span>熟练</span>
                </div>
                <Progress style={progressStyle} percent={40} position="normal" unfilled={true} />
              </div>
              <div className={style['card-language-content']}>
                <div className={style['card-language-content-header']}>
                  <span>英语</span>
                  <span>熟练</span>
                </div>
                <Progress style={progressStyle} percent={40} position="normal" unfilled={true} />
              </div>
              <div className={style['card-language-content']}>
                <div className={style['card-language-content-header']}>
                  <span>PPT</span>
                  <span>熟练</span>
                </div>
                <Progress style={progressStyle} percent={40} position="normal" unfilled={true} />
              </div>
            </Card.Body>
          </Card>
          <Card
            className={style.card}>
            <Card.Header
              title={<span>自我描述</span>}
              extra={<Link to="/resume/info"><img src={editIcon} /></Link>} />
            <Card.Body className={style['card-body']}>
              <p className={style['card-body-describe']}>jdfkldjaskf放开了大家分开了打手机放开了  1fdafdasfdasf放大发生的范德萨范德萨发的 </p>
            </Card.Body>
          </Card>
          <div className={style.toogle} onClick={this.handleToogle}>
            <div>
              <img src={toogle ? upIcon : downIcon} />
              收起更多模块
            </div>
            <p>更多简历信息请前往最佳东方官网编辑</p>
          </div>
        </Flex.Item>
      </Flex>
    )
  }
}

export default Resume
