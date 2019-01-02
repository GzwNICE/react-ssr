import React, { Component } from 'react'
import style from '../style.less'

export default class CompanyDuce extends Component {
  constructor(props) {
    super(props)
    this.state = {
      introduced: true, //有企业信息
      open: true, //显示查看全部
      data: [
        'AiyWuByWklrrUDlFignR',
        'TekJlZRVCjLFexlOCuWn',
        'IJOtIlfsYdTyaDTRVrLI',
      ],
      current: 1,
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

  handleUnfold() {
    this.setState({
      open: false,
    })
  }

  handleChange(i) {
    this.setState({
      current: i + 1,
    })
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
              <div
                className={open ? style.particulars : style.unfold}
                ref={e => {
                  this.otext = e
                }}
              >
                {company.description}
                {open ? (
                  <span
                    className={style.lookAll}
                    onClick={this.handleUnfold.bind(this)}
                  >
                    <i>...</i>查看全部
                  </span>
                ) : null}
              </div>
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
                <span>{company.contact_phone}</span>
              </div>
            ) : null}
            {company.contact_email ? (
              <div>
                邮　箱：
                <span>{company.contact_email}</span>
              </div>
            ) : null}
            <div>地　址：{company.address}</div>
          </div>
        </div>
      </div>
    )
  }
}
