import React, { Component } from 'react'
import style from './style.less'

export default class FamousCompany extends Component {
  state = {
    companyLogo:
      'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=946990677,1683235802&fm=26&gp=0.jpg',
    invite: '6945',
  }

  render() {
    const { companyLogo, invite } = this.state
    return (
      <div className={style.Company}>
        <h1 className={style.subtitle}>名企专区</h1>
        
        <div className={style.CompanyCard}>
          <div className={style.CompanyCent}>
            <div className={style.top}>
              <img src={companyLogo} alt="" />
            </div>
            <div className={style.bot}>
              <h4 className={style.Companyname}>杭州万豪大酒店</h4>
              <span>{invite}个在招职位</span>
              <div className={style.welfare}>
                <span>五险一金</span>
                <span>美女多</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
