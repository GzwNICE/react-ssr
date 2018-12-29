import React, { Component } from 'react'
import { famCompany } from '../../../actions/home'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import style from '../style.less'

@connect(state => ({
  photoData: state.home.photoData,
}))
class FamousCompany extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  componentDidMount() {
    this.props.dispatch(famCompany({}))
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
                    <div
                      className={style.CompanyCard}
                      key={item.id}
                      onClick={() => {
                        this.props.history.push(
                          `/bloc/${item.c_userid}`
                        )
                      }}
                    >
                      <div className={style.CompanyCent}>
                        <div className={style.top}>
                          <img src={item.company_logo} alt="Img" />
                        </div>
                        <div className={style.bot}>
                          <h4 className={style.Companyname}>
                            {item.company_name}
                          </h4>
                          <span>{item.jobNum}个在招职位</span>
                          <div className={style.welfare}>
                            <span>{item.company_welfare1}</span>
                            <span>{item.company_welfare2}</span>
                          </div>
                        </div>
                      </div>
                    </div>
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
