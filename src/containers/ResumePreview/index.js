import React, { PureComponent } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { getAllInfo, avatar } from '../../actions/resume'
import {
  NavBar,
  Card,
  Flex,
  Modal,
  TextareaItem,
  Icon,
  Progress,
} from 'antd-mobile'
// import queryString from 'query-string'
import BitmapMin from 'bitmap-min'
import style from '../Resume/style.less'
import style2 from './style.less'
import portraitIcon from '@static/portrait@3x.png'
import circleIcon from '@static/circle.png'
import overSeaIcon from '@static/icon_studay.png'
import { Toast } from 'antd-mobile/lib/index'

const Pla = props => (
  <i style={{ display: 'inline-block', width: props.w + 'em' }} />
)
const progressStyle = {
  height: '9px',
  borderRadius: '4px',
}
@connect(state => {
  return {
    option: state.option,
    resume: state.resume,
    DesiredPositions: (state.DesiredPositions.list || []).map(
      item => item.position
    ),
    DesiredLocations: (state.DesiredLocations.list || []).map(
      item => item.location
    ),
    DesiredJob: state.DesiredJob,
    educationals: state.educationals.list || [],
    work_exps: state.work_exps.list || [],
    languages: state.languages.list || [],
    skills: state.skills.list || [],
    training_exps: state.training_exps.list || [],
    certificates: state.certificates.list || [],
    other_exps: state.other_exps.list || [],
    DesiredCompanyTypes: state.DesiredCompanyTypes.list,
  }
})
@withRouter
class Resume extends PureComponent {
  state = {
    toogle: true, // 默认收起
  }

  componentDidMount() {
    this.bitmapMin = new BitmapMin({
      width: 360, // 最大宽度
      height: 360, // 最大高度
      jpeg: false, // 强制转为 jpeg|jpg
      quality: 0.7, // jpeg|jpg 图片的质量
    })
    this.props
      .dispatch(
        getAllInfo({
          version: '5.2.1',
          appchannel: 'web',
        })
      )
      .then(data => {
        if (data.errMsg === '未登陆') {
          return Modal.alert('', '请先登录', [
            { text: '稍后', style: 'default' },
            {
              text: '登录',
              onPress: () =>
                this.props.history.replace(
                  '/user/login?redirect=' + this.props.history.location.pathname
                ),
            },
          ])
        }
      })
  }
  handleFaceChange = ev => {
    this.bitmapMin.load(ev.target.files[0], (base64, blob) => {
      this.props
        .dispatch(
          avatar({
            avatar: blob,
          })
        )
        .then(() => {
          this.props.dispatch(
            getAllInfo({
              appchannel: 'web',
            })
          )
        })
    })
  }
  handleRefresh = () => {
    this.props
      .dispatch(
        getAllInfo({
          appchannel: 'web',
        })
      )
      .then(() => {
        Toast.info('刷新成功', 2)
      })
  }
  handleGoto = item => {
    this.props.history.push(item)
  }
  handleToogle = () => {
    this.setState({
      toogle: !this.state.toogle,
    })
  }
  handleGoBack = () => {
    this.props.history.goBack()
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
      other_exps,
      DesiredCompanyTypes = [],
    } = this.props

    let desiredSalary = '暂无'
    if (DesiredJob.desired_salary && DesiredJob.desired_salary !== '0') {
      desiredSalary =
        option.opts_salary.salary_scope_index[DesiredJob.desired_salary]
      if (desiredSalary.indexOf('以上') === -1) {
        desiredSalary = desiredSalary + '元'
      }
    }
    return (
      <Flex direction="column" align="stretch" className={style.wraper}>
        <NavBar
          mode="light"
          className={style2.nav}
          icon={<Icon type="left" />}
          onLeftClick={() => this.handleGoBack()}
        >
          简历预览
        </NavBar>
        <Flex.Item
          onScroll={this.onScroll}
          id="page"
          className={[style.content, style2.content]}
        >
          <div>
            <div className={[style.contentWrp, style2.content]}>
              <div className={style2.firstcard}>
                <div className={style2.photo}>
                  <img src={resume.photo ? resume.photo : portraitIcon} />
                </div>

                <p className={style2.title}>{resume.true_name_cn}</p>
              </div>
              <Card className={style.card}>
                <Card.Header title={<span>基本信息 </span>} />
                <Card.Body className={style['card-body']}>
                  <div>
                    <span>
                      姓<Pla w={2} />
                      名：
                    </span>
                    {resume.true_name_cn ? resume.true_name_cn : '暂无'}
                  </div>
                  <div>
                    <span>
                      性<Pla w={2} />
                      别：
                    </span>
                    {option.opts_gender
                      ? option.opts_gender
                          .filter(
                            item => parseInt(resume.gender, 10) === item.code
                          )
                          .map(item => item.value)[0] || '暂无'
                      : '暂无'}
                  </div>
                  <div>
                    <span>
                      年<Pla w={2} />
                      龄：
                    </span>
                    {resume.age ? `${resume.age}岁` : '暂无'}
                  </div>
                  <div>
                    <span>工作年限：</span>
                    {resume.work_year ? resume.work_year : '暂无'}
                  </div>
                  <div>
                    <span>手机号码：</span>
                    {resume.hidden_mobile ? resume.hidden_mobile : '暂无'}
                  </div>
                  <div>
                    <span>联系邮箱：</span>
                    {resume.hidden_email ? resume.hidden_email : '暂无'}
                  </div>
                </Card.Body>
              </Card>
              <Card className={style.card}>
                <Card.Header title={<span>求职意向 </span>} />
                <Card.Body className={style['card-body']}>
                  <div className={style.ellipsis}>
                    <span>意向职位：</span>
                    {DesiredPositions && DesiredPositions.length > 0
                      ? DesiredPositions.map(
                          item => option.positions_index[item]
                        ).join(', ')
                      : '暂无'}
                  </div>
                  <div className={style.ellipsis}>
                    <span>意向行业：</span>
                    {DesiredCompanyTypes && DesiredCompanyTypes.length > 0
                      ? DesiredCompanyTypes.map(
                          item =>
                            option.opts_company_industry_all_index[
                              item.industry
                            ]
                        ).join(', ')
                      : '暂无'}
                  </div>
                  <div className={style.ellipsis}>
                    <span>意向地点：</span>
                    {DesiredLocations && DesiredLocations.length > 0
                      ? DesiredLocations.map(
                          item => option.areas_index[item]
                        ).join(', ')
                      : '暂无'}
                  </div>
                  <div>
                    <span>期望薪资：</span>
                    {desiredSalary}
                  </div>
                  <div>
                    <span>求职状态：</span>
                    {resume.job_status && resume.job_status !== '0'
                      ? option.opts_job_status_index[resume.job_status]
                      : '暂无'}
                  </div>
                </Card.Body>
              </Card>
              {work_exps && work_exps.length > 0 ? (
                <Card className={style.card}>
                  <Card.Header
                    className={style.boder1px}
                    title={<span>工作经历 </span>}
                  />
                  <Card.Body className={style['card-job']}>
                    {work_exps.map((item, key) => (
                      <div key={key} className={style['card-job-wraper']}>
                        <img
                          src={circleIcon}
                          className={style['card-job-wraper-circle']}
                        />
                        <div className={style.ellipsis}>
                          {item.position_cn}
                          {item.company_name_cn
                            ? ` | ${item.company_name_cn}`
                            : null}
                        </div>
                        <p>
                          {`${item.begin_year}.${item.begin_month}`}-
                          {item.end_year !== '0'
                            ? `${item.end_year}.${item.end_month}`
                            : '至今'}
                        </p>
                        {item.job_responsibilities_cn ? (
                          <TextareaItem
                            autoHeight
                            value={`${item.job_responsibilities_cn || ''}`}
                            editable={false}
                          />
                        ) : (
                          <p>暂未填写岗位职责</p>
                        )}
                        {work_exps.length - 1 !== key ? (
                          <div
                            className={style['card-education-wraper-line']}
                          />
                        ) : null}
                      </div>
                    ))}
                  </Card.Body>
                </Card>
              ) : null}
              {educationals && educationals.length > 0 ? (
                <Card className={style.card}>
                  <Card.Header
                    className={style.boder1px}
                    title={<span>教育经历 </span>}
                  />
                  <Card.Body className={style['card-education']}>
                    {educationals.map((item, key) => (
                      <div key={key} className={style['card-education-wraper']}>
                        <img
                          src={circleIcon}
                          className={style['card-education-wraper-circle']}
                        />
                        <div className={style.oversea}>
                          <div className={style.ellipsis}>{item.school_cn}</div>
                          {item.is_overseas === '1' ? (
                            <img src={overSeaIcon} />
                          ) : null}
                        </div>

                        <p>
                          {option.opts_education_index[item.degree] || '不限'} |{' '}
                          {item.major_cn || '不限'}
                        </p>
                        <p>{`${item.begin_year}.${item.begin_month}-${
                          item.end_year
                        }.${item.end_month}`}</p>
                        {educationals.length - 1 !== key ? (
                          <div
                            className={style['card-education-wraper-line']}
                          />
                        ) : null}
                      </div>
                    ))}
                  </Card.Body>
                </Card>
              ) : null}
              {(languages && languages.length > 0) ||
              (skills && skills.length > 0) ? (
                <Card className={style.card}>
                  <Card.Header
                    className={style.boder1px}
                    title={<span>语言/技能</span>}
                  />
                  <Card.Body className={style['card-language']}>
                    {languages.map((item, index) => (
                      <div
                        key={index}
                        className={style['card-language-content']}
                      >
                        <div className={style['card-language-content-header']}>
                          <span>
                            {option.opts_language_index[item.language]}
                          </span>
                          <span>
                            {option.opts_master_degree_index[item.ability]}
                          </span>
                        </div>
                        <Progress
                          style={progressStyle}
                          percent={Number(item.ability - 1) * 25}
                          position="normal"
                          unfilled={true}
                        />
                      </div>
                    ))}
                    {skills.map((item, index) => (
                      <div
                        key={index}
                        className={style['card-language-content']}
                      >
                        <div className={style['card-language-content-header']}>
                          <span>{item.skill_cn}</span>
                          <span>
                            {option.opts_master_degree_index[item.ability]}
                          </span>
                        </div>
                        <Progress
                          style={progressStyle}
                          percent={Number(item.ability - 1) * 25}
                          position="normal"
                          unfilled={true}
                        />
                      </div>
                    ))}
                  </Card.Body>
                </Card>
              ) : null}

              {other_exps && other_exps.length > 0 ? (
                <Card className={style.card}>
                  <Card.Header
                    className={style.boder1px}
                    title={<span>自我描述</span>}
                  />
                  <Card.Body className={style['card-body']}>
                    {other_exps.length > 0
                      ? other_exps.map(item => (
                          <div key={item.id} className={style.panel}>
                            {/*<div>{option.opts_topic_index[item.info_type]}</div>*/}
                            <div className={style.info}>
                              <TextareaItem
                                autoHeight
                                value={`${item.content_cn || ''}`}
                                rows={1}
                                editable={false}
                                placeholder={
                                  '请简明扼要地描述你的职业优势,让企业HR快速了解你~'
                                }
                              />
                            </div>
                          </div>
                        ))
                      : '请简明扼要地描述你的职业优势,让企业HR快速了解你~'}
                  </Card.Body>
                </Card>
              ) : null}
            </div>
          </div>
          <div />
        </Flex.Item>
      </Flex>
    )
  }
}
// todo 自我描述底部border 去除
export default Resume
