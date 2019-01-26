import React, { Component } from 'react'
import style from '../style.less'
const triggerFrom = '触发来源'

export default class CompanyDuce extends Component {
  constructor(props) {
    super(props)
    this.state = {
      introduced: true, //有企业信息
      open: true, //显示查看全部
      current: 1,
    }
  }

  componentDidMount() {
    if (this.otext.clientHeight < 50 && this.otext.clientHeight > 0) {
      this.setState({
        open: false,
      })
    }
  }

  componentDidUpdate(prevProps) {
    if (
      this.props.company.description !== prevProps.company.description &&
      (this.otext.clientHeight < 50 && this.otext.clientHeight > 0)
    ) {
      this.setState({
        open: false,
      })
    }
  }

  goLogin = () => {
    window.zhuge.track('注册页面打开', {
      [`${triggerFrom}`]: '企业联系方式获取',
    })
    const pathname = this.props.history.location.pathname
    const url = `/register?redirect=${pathname}`
    this.props.history.replace(url, { key: '获取联系方式' })
  }

  handleUnfold() {
    this.setState({
      open: false,
    })
    window.zhuge.track('公司介绍展开')
  }

  handleChange(i) {
    this.setState({
      current: i + 1,
    })
  }

  replacleHtml = (d = '') => {
    return d.replace(/style/g, 'styles')
  }

  filterHTMLTag = msg => {
    if (msg) {
      let res = msg.replace(/<\/?[^>]*>/g, '') //去除HTML Tag
      res = res.replace(/[|]*\n/, '') //去除行尾空格
      res = res.replace(/&npsp;/gi, '') //去掉npsp
      return res
    }
  }

  render() {
    const { open, introduced } = this.state
    const { company = {} } = this.props
    return (
      <div className={style.Introduce}>
        {introduced ? (
          <div className={style.companyFerral}>
            <div className={style.companycent}>
              <div className={style.title}>企业介绍</div>
              {open ? (
                <div
                  className={open ? style.particulars : style.unfold}
                  ref={e => {
                    this.otext = e
                  }}
                >
                  {this.filterHTMLTag(company.description)}
                  {open ? (
                    <span
                      className={style.lookAll}
                      onClick={this.handleUnfold.bind(this)}
                    >
                      <i>...</i>查看全部
                    </span>
                  ) : null}
                </div>
              ) : (
                <div
                  className={open ? style.particulars : style.unfold}
                  ref={e => {
                    this.otext = e
                  }}
                  dangerouslySetInnerHTML={{
                    __html: this.replacleHtml(company.description),
                  }}
                />
              )}
            </div>
          </div>
        ) : null}

        <div className={style.contactInfo}>
          <div className={style.contactInfocent}>
            <p>联系方式</p>
            <div>联系人：{company.contact_name}</div>
            {company.contact_phone ? (
              <div>
                手　机：
                {this.props.is_login ? (
                  <span>{company.contact_phone}</span>
                ) : (
                  <span onClick={this.goLogin}>登陆后查看</span>
                )}
              </div>
            ) : null}
            {company.contact_email ? (
              <div>
                邮　箱：
                {this.props.is_login ? (
                  <span>{company.contact_email}</span>
                ) : (
                  <span onClick={this.goLogin}>登陆后查看</span>
                )}
              </div>
            ) : null}
            {company.address ? <div>地　址：{company.address}</div> : null} 
          </div>
        </div>
      </div>
    )
  }
}
