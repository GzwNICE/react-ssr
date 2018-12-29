import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { blocList, blocCategory } from '../../../actions/company'
import companyLogo from '../../../static/detailLogo.png'
import style from '../style.less'

@connect(state => {
  return {
    list: state.company.list,
    pager: state.company.pager,
  }
})
class CompanyList extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }

  componentDidMount() {
    const c_userid = this.props.match.params.c_userid
    this.props
      .dispatch(
        blocList({
          c_userid: c_userid,
        })
      )
      .then(data => {
        console.log(data)
      })
  }

  render() {
    const list = this.props.list || []
    console.log(list)
    return (
      <div className={style.companyList}>
        {list.map((i, n) => {
          return (
            <div className={style.ContentModule} key={n}>
              <img src={i.company_logo ? i.company_logo :companyLogo} alt="img" />
              <div className={style.inviteInfo}>
                <h1>{i.company_name}</h1>
                <div className={style.scale}>
                  <span>{i.current_location}</span>
                  <span>{i.company_type}</span>
                  <span>{i.employees_number}</span>
                </div>
                <div className={style.inRecruit}>
                  <span>{i.jobNum}</span>个在招职位
                </div>
              </div>
            </div>
          )
        })}
      </div>
    )
  }
}
export default withRouter(CompanyList)
