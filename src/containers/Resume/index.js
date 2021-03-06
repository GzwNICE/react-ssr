import React, { PureComponent } from 'react'
import { withRouter, Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { getAllInfo, avatar } from '../../actions/resume'
import { Card, Flex, TextareaItem, Icon, Progress } from 'antd-mobile'
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
import overSeaIcon from '../../static/icon_studay.png'
import { Toast } from 'antd-mobile/lib/index'
import { getUserStatus } from '../../actions/userStatus'
import { userRefResume } from '../../actions/userStatus'
import { Helmet } from 'react-helmet'
import BorderBottomLine from '../../components/BorderBottomLine'
import Cookies from 'js-cookie'

const Pla = props => (
  <i style={{ display: 'inline-block', width: props.w + 'em' }} />
)
const progressStyle = {
  height: '8px',
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
    minutesThree: true, // 3分钟内只能刷一次
    userStatus: state.userStatus,
    resumeToogle: state.resumeNew,
  }
})
@withRouter
class Resume extends PureComponent {
  state = {
    toogle: true,
    percentage: '',
    toInfo: '', // 跳转到基本信息
    search: '', // history search
    showToogleModal: false, // 底部toogle是否展示
    languagesArr: [],
    skillsArr: [],
  }

  componentDidMount() {
    window.zhuge.track('简历页面打开')
    this.bitmapMin = new BitmapMin({
      width: 360, // 最大宽度
      height: 360, // 最大高度
      jpeg: false, // 强制转为 jpeg|jpg
      quality: 0.7, // jpeg|jpg 图片的质量
    })
    this.setState({
      toInfo: '/resume/info' + this.props.history.location.search,
      search: this.props.history.location.search,
    })
    this.props
      .dispatch(
        getAllInfo({
          // version: '5.2.1',
          appchannel: 'web',
        })
      )
      .then(data => {
        if (data.errMsg === '未登陆') {
          this.props.history.replace(
            '/user/register?redirect=' + this.props.history.location.pathname
          )
        }
        this.languageKillArr()
      })

    this.props
      .dispatch(
        getUserStatus({
          appchannel: 'web',
        })
      )
      .then(data => {
        if (data.errMsg === '未登陆') {
        } else {
          if (data && data.data && data.data.resume_complete) {
            let resume_complete = (
              Number(data.data.resume_complete) * 100
            ).toFixed(0)
            this.setState({
              percentage: `${resume_complete}%`,
            })
          }
        }
      })
  }
  languageKillArr = () => {
    // console.log(this.props.resumeToogle)

    const { skills, languages, other_exps, resumeToogle } = this.props
    if (skills.length > 0 || languages.length > 0) {
      let languagesLen = languages.length
      let skillsLen = skills.length
      let languagesArr = []
      let skillsArr = []
      if (languagesLen + skillsLen > 5) {
        if (languagesLen > 5) {
          languagesArr = languages.slice(0, 5)
          skillsArr = []
        } else {
          languagesArr = languages
          let remainingLen = 5 - languagesLen
          skillsArr = skills.slice(0, remainingLen)
        }
      } else {
        languagesArr = languages
        skillsArr = skills
      }
      this.setState({
        languagesArr,
        skillsArr,
      })
    }
    if (skills.length > 0 || languages.length > 0) {
      if (other_exps.length > 0) {
        // const {toogleSet= false} = this.props.resume
        this.setState({
          showToogleModal: true,
          toogle: resumeToogle.toogleSet,
        })
        // const skillsPros = this.props.skills
        // const languagesPros = this.props.skills
        // const other_expsPros = this.props.skills
      }
    }
  }
  handleFaceChange = ev => {
    this.bitmapMin.load(ev.target.files[0], (base64, blob) => {
      this.props
        .dispatch(
          avatar({
            avatar: blob,
          })
        )
        .then((data) => {
          if(data.status === 1) {
            Toast.info('上传头像成功', 2)
            this.props.dispatch(
              getAllInfo({
                appchannel: 'web',
              })
            ).then(data => {
              const photo = data.data.get_base.photo
                if(photo) {
                  Cookies.set('photo', photo)
                }
            })
          } else {
            Toast.info(data.errMsg, 2)
          }
          
        })
    })
  }

  handleRefresh = () => {
    this.setState({
      refresh: true,
    })
    this.props
      .dispatch(
        userRefResume({
          resume_status: this.props.userStatus.resume_status,
        })
      )
      .then(data => {
        if (data.status === 1) {
          // window.zhuge.track('刷新简历')
          Toast.info('简历已刷新', 2)
          this.setState({
            refresh: false,
          })
        } else {
          // window.zhuge.track('刷新简历')
          Toast.info(data.errMsg, 2)
          this.setState({
            refresh: false,
          })
        }
      })
  }
  handleGoto = item => {
    this.props.history.push(item)
  }
  handleToogle = () => {
    const toogle = !this.state.toogle
    this.setState({
      toogle,
    })
    this.props.dispatch({
      type: 'RESUMETOOGLE',
      payload: toogle,
    })
  }
  gotoPreview = () => {
    const { isAllowPreview } = this.props.resume
    if (isAllowPreview === '1') {
      this.props.history.push('/resumepreview')
    } else {
      Toast.info('您还未创建简历', 2)
    }
  }
  whereWillIGo = () => {
    const search = this.props.history.location.search
    if (search.indexOf('source=/user') !== 0) {
      let path = '/user'
      if (search.indexOf('?redirect=') !== -1) {
        path = path + '?redirect=' + search.split('?redirect=')[1]
      }
      this.props.history.push(path)
    } else {
      this.props.history.push('/')
    }
  }
  componentWillReceiveProps(next) {
    // const {skills, languages, other_exps} = next
    // console.log(next)
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
      // languages,
      // skills,
      other_exps,
      DesiredCompanyTypes = [],
    } = this.props
    const {
      toogle,
      percentage,
      toInfo,
      search,
      showToogleModal,
      languagesArr,
      skillsArr,
    } = this.state
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
        <Helmet>
          <title>最佳东方 - 旅游服务业专业的招聘平台</title>
          <meta
            name="description"
            content="最佳东方专为个人提供全面的酒店,餐饮,物业,海外,高尔夫,游轮职位招聘信息，为企业提供校园招聘,猎头,培训,测评和人事外包在内的全方位的人力资源服务，帮助个人求职者与企业搭建最佳的人才招募和人才培养渠道。"
          />
          <meta
            name="keywords"
            content="酒店招聘,餐饮,物业,海外,高尔夫,游轮,招聘会"
          />
        </Helmet>
        <div className={style.header}>
          <Icon
            type="left"
            onClick={() => {
              this.whereWillIGo()
            }}
            className={style.nav}
          />
        </div>
        <Flex.Item onScroll={this.onScroll} id="page" className={style.content}>
          <div>
            <div className={style.backdrop} />
            <div className={style.contentWrp}>
              <div className={style.firstcard}>
                <div className={style.photo}>
                  <img src={resume.photo ? resume.photo : portraitIcon} />
                  <input
                    className={style.face}
                    type="file"
                    accept="image/gif,image/jpeg,image/jpg,image/png,image/svg"
                    onChange={this.handleFaceChange}
                  />
                </div>
                <p className={style.title}>
                  {resume.true_name_cn
                    ? `${resume.true_name_cn}的简历`
                    : '暂无'}
                </p>
                <p className={style.subTitle}>
                  简历完整度:<span>{percentage ? percentage : '暂无'}</span>
                </p>
                <Flex>
                  <Flex.Item
                    onClick={this.handleGoto.bind(this, `/person/privacy`)}
                  >
                    <img src={setIcon} />
                    <p>设置</p>
                  </Flex.Item>
                  <Flex.Item onClick={this.gotoPreview}>
                    <img src={previewIcon} />
                    <p>预览</p>
                  </Flex.Item>
                  <Flex.Item>
                    <img onClick={this.handleRefresh} src={refreshIcon} />
                    <p>刷新</p>
                  </Flex.Item>
                </Flex>
              </div>
              <Card className={style.card}>
                <Card.Header
                  title={
                    <span>
                      基本信息 <span>(必填)</span>
                    </span>
                  }
                  extra={
                    <Link to={toInfo}>
                      <img src={editIcon} />
                    </Link>
                  }
                />
                <BorderBottomLine />
                <Card.Body className={style['card-body']}>
                  <div className={style.ellipsis}>
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
                <Card.Header
                  title={
                    <span>
                      求职意向 <span>(必填)</span>
                    </span>
                  }
                  extra={
                    <Link
                      to={`/resume/intention${
                        this.props.history.location.search
                      }`}
                    >
                      <img src={editIcon} />
                    </Link>
                  }
                />
                <BorderBottomLine />
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
              <Card className={style.card}>
                {work_exps && work_exps.length > 0 ? (
                  <div>
                    <Card.Header
                      title={
                        <span>
                          工作经历 <span>(必填)</span>
                        </span>
                      }
                    />
                    <BorderBottomLine />
                  </div>
                ) : null}

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
                      <img
                        src={editIcon}
                        onClick={this.handleGoto.bind(
                          this,
                          `/resume/experience/${item.id}${search}`
                        )}
                        className={style['card-job-wraper-editor']}
                      />
                      <p className={style.jobtime}>
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
                        <div className={style['card-education-wraper-line']} />
                      ) : null}
                    </div>
                  ))}
                  <div className={style['card-education-footer']}>
                    <img src={addIcon} />
                    <Link to={`/resume/experience/add${search}`}>
                      添加工作经验
                    </Link>
                  </div>
                </Card.Body>
              </Card>
              <Card className={style.card}>
                {educationals && educationals.length > 0 ? (
                  <div>
                    <Card.Header
                      title={
                        <span>
                          教育经历 <span>(必填)</span>
                        </span>
                      }
                    />
                    <BorderBottomLine />
                  </div>
                ) : null}

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

                      <img
                        src={editIcon}
                        onClick={this.handleGoto.bind(
                          this,
                          `/resume/education/${item.id}${search}`
                        )}
                        className={style['card-education-wraper-editor']}
                      />
                      <p>
                        {option.opts_education_index[item.degree] || '不限'} |{' '}
                        {item.major_cn || '不限'}
                      </p>
                      <p>{`${item.begin_year}.${item.begin_month}-${
                        item.end_year
                      }.${item.end_month}`}</p>
                      {educationals.length - 1 !== key ? (
                        <div className={style['card-education-wraper-line']} />
                      ) : null}
                    </div>
                  ))}
                  <div className={style['card-education-footer']}>
                    <img src={addIcon} />
                    <Link to={`/resume/education/add${search}`}>
                      添加教育经历
                    </Link>
                  </div>
                </Card.Body>
              </Card>
              {toogle ? (
                <Card className={style.card}>
                {(languagesArr.length + skillsArr.length) > 0 ? (
                  <div>
                  <Card.Header
                  title={<span>语言/技能</span>}
                  extra={
                    <Link to="/resume/language">
                      <img src={editIcon} />
                    </Link>
                  }
                />
                <BorderBottomLine />
                  </div>
                ) : null}
                 
                  <Card.Body className={style['card-language']}>
                    {languagesArr.map((item, index) => (
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
                    {skillsArr.map((item, index) => (
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
                    {(languagesArr.length + skillsArr.length) === 0 ? (
                      <div className={style['add-footer']}>
                      <img src={addIcon} />
                      <Link to={`/resume/language`}>
                        添加语言/技能
                      </Link>
                    </div>
                    ) : null}
                    
                  </Card.Body>
                
                
                
          
                  </Card>
              ) : null}
              {toogle ? (
                <Card className={style.card}>
                  
                  {other_exps.length > 0 ? (
                    <div>
                    <Card.Header
                    title={<span>自我描述</span>}
                    extra={
                      <Link to="/resume/description">
                        <img src={editIcon} />
                      </Link>
                    }
                  />
                  <BorderBottomLine />
                    </div>
                  
                  ) : null}
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
                      : null}
                      {other_exps.length === 0 ? (
                        <div className={style['add-footer']}>
                        <img src={addIcon} />
                        <Link to={`/resume/description`}>
                          添加自我描述
                        </Link>
                      </div>
                      ) : null}

                  </Card.Body>
                </Card>
              ) : null}
              {showToogleModal ? (
                toogle ? (
                  <div className={style.toogle} onClick={this.handleToogle}>
                    <div>
                      <img src={upIcon} />
                      收起更多模块
                    </div>
                    <p>更多简历信息请前往最佳东方官网编辑</p>
                  </div>
                ) : (
                  <div className={style.toogle} onClick={this.handleToogle}>
                    <div>
                      <img src={downIcon} />
                      展开更多模块
                    </div>
                    <p>包括语言/技能，自我描述</p>
                  </div>
                )
              ) : null}
            </div>
          </div>
          <div />
        </Flex.Item>
      </Flex>
    )
  }
}

export default Resume
