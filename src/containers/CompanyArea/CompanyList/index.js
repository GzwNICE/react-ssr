import React, { Component } from 'react'
import style from '../style.less'

export default class CompanyList extends Component {
  state = {
    companyLogo:
      'https://p3-v.veimg.cn/sysimg/20180628/55465e8e4fc72ac2f821ad0cfac439af.jpg',
      
  }

  

  render() {
    const { companyLogo } = this.state
    return (
      <div className={style.companyList}>
        <div className={style.ContentModule}>
          <img src={companyLogo} alt="" />
          <div className={style.inviteInfo}>
              <h1>杭州洲际酒酒店际酒店际酒店酒店</h1>
              <div className={style.scale}>
                <span>杭州</span>
                <span>国际高端酒店/5星级</span>
                <span>500-999人</span>
              </div>
              <div className={style.inRecruit}>
                <span>145</span>个在招职位
              </div>
          </div>
        </div>
        <div className={style.ContentModule}>
          <img src={companyLogo} alt="" />
          <div className={style.inviteInfo}>
              <h1>杭州洲际酒酒店际酒店际酒店酒店</h1>
              <div className={style.scale}>
                <span>杭州</span>
                <span>国际高端酒店/5星级</span>
                <span>500-999人</span>
              </div>
              <div className={style.inRecruit}>
                <span>145</span>个在招职位
              </div>
          </div>
        </div>
        <div className={style.ContentModule}>
          <img src={companyLogo} alt="" />
          <div className={style.inviteInfo}>
              <h1>杭州洲际酒酒店际酒店际酒店酒店</h1>
              <div className={style.scale}>
                <span>杭州</span>
                <span>国际高端酒店/5星级</span>
                <span>500-999人</span>
              </div>
              <div className={style.inRecruit}>
                <span>145</span>个在招职位
              </div>
          </div>
        </div>
        <div className={style.ContentModule}>
          <img src={companyLogo} alt="" />
          <div className={style.inviteInfo}>
              <h1>杭州洲际酒酒店际酒店际酒店酒店</h1>
              <div className={style.scale}>
                <span>杭州</span>
                <span>国际高端酒店/5星级</span>
                <span>500-999人</span>
              </div>
              <div className={style.inRecruit}>
                <span>145</span>个在招职位
              </div>
          </div>
        </div>
        <div className={style.ContentModule}>
          <img src={companyLogo} alt="" />
          <div className={style.inviteInfo}>
              <h1>杭州洲际酒酒店际酒店际酒店酒店</h1>
              <div className={style.scale}>
                <span>杭州</span>
                <span>国际高端酒店/5星级</span>
                <span>500-999人</span>
              </div>
              <div className={style.inRecruit}>
                <span>145</span>个在招职位
              </div>
          </div>
        </div>
        <div className={style.ContentModule}>
          <img src={companyLogo} alt="" />
          <div className={style.inviteInfo}>
              <h1>杭州洲际酒酒店际酒店际酒店酒店</h1>
              <div className={style.scale}>
                <span>杭州</span>
                <span>国际高端酒店/5星级</span>
                <span>500-999人</span>
              </div>
              <div className={style.inRecruit}>
                <span>145</span>个在招职位
              </div>
          </div>
        </div>
        <div className={style.ContentModule}>
          <img src={companyLogo} alt="" />
          <div className={style.inviteInfo}>
              <h1>杭州洲际酒酒店际酒店际酒店酒店</h1>
              <div className={style.scale}>
                <span>杭州</span>
                <span>国际高端酒店/5星级</span>
                <span>500-999人</span>
              </div>
              <div className={style.inRecruit}>
                <span>145</span>个在招职位
              </div>
          </div>
        </div>
        <div className={style.ContentModule}>
          <img src={companyLogo} alt="" />
          <div className={style.inviteInfo}>
              <h1>杭州洲际酒酒店际酒店际酒店酒店</h1>
              <div className={style.scale}>
                <span>杭州</span>
                <span>国际高端酒店/5星级</span>
                <span>500-999人</span>
              </div>
              <div className={style.inRecruit}>
                <span>145</span>个在招职位
              </div>
          </div>
        </div>
        
      </div>
    )
  }
}
