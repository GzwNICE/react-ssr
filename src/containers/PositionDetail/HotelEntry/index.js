import React from 'react'
import style from '../style.less'
import Rectangle from '../../../static/Rectangle@3x.png'
import share from '../../../static/share@3x.png'

const HotelEntry = (props) => {
  const company = (props.position && props.position.company_detail )? props.position.company_detail : {}
  return (
    <div className={style.hotelEntry}>
      <div
        className={style.left}
        style={{background: `url(${company.company_logo ? company.company_logo : share}) center/ cover no-repeat`}}
      />
      <div className={style.center}>
        <h1 className={style.hotelName}>{company.company_name}</h1>
        <div className={style.hotelSize}>
          {company.industry_star} {company.company_size ? <span className={style.rule}>|</span> : null}
          {company.company_size} {company.company_nature ? <span className={style.rule}>|</span> : null}
          {company.company_nature}
        </div>
      </div>
      <div className={style.right}>
        <img src={Rectangle} />
      </div>
    </div>
  )
}

export default HotelEntry
