import React, { Component } from 'react'
import { famCompany } from '../../../actions/home'
import { connect } from 'react-redux'
import { withRouter, Link } from 'react-router-dom'
import companyLogo from '../../../static/detailLogo.png'
import style from '../style.less'
const tiggerCompany = '企业'

@connect(state => ({
  photoData: state.home.photoData,
}))
class FamousCompany extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  goBloc = key => {
    window.zhuge.track('名企专区', { [`${tiggerCompany}`]: key })
  }

  componentDidMount() {
    const { photoData } = this.props
    if (photoData.length === 0) {
      this.props.dispatch(famCompany({}))
    }
  }
  render() {
    const CompanyData = this.props.photoData
    return (
      <div className={style.Company}>
        <h1 className={style.subtitle}>名企专区</h1>
        <div className={style.CompanyBox}>
          <div className={style.Boxscroll}>
            {CompanyData
              ? CompanyData.map(item => {
                  return (
                    <Link
                      rel="stylesheet"
                      to={`/bloc/${item.c_userid}?redirect=${
                        this.props.location.pathname
                      }`}
                      key={item.id}
                      onClick={() => this.goBloc(item.company_name)}
                    >
                      <div className={style.CompanyCent}>
                        <div className={style.top}>
                          <div className={style.topLeft}>
                            <h4 className={style.Companyname}>
                              {item.company_name}
                            </h4>
                            <span>{item.jobNum}个在招职位</span>
                          </div>
                          <img
                            src={
                              item.company_logo
                                ? item.company_logo
                                : companyLogo
                            }
                            alt="Img"
                          />
                        </div>
                        <div className={style.welfare}>
                          <span>{item.company_welfare1}</span>
                          <span>{item.company_welfare2}</span>
                          <span>{item.company_welfare3}</span>
                        </div>
                      </div>
                    </Link>
                  )
                })
              : null}
          </div>
        </div>
      </div>
    )
  }
}
export default withRouter(FamousCompany)
