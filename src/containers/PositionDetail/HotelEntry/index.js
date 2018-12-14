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
        <div className={style.hotelName}>{company.company_name}</div>
        <div className={style.hotelSize}>
          {company.company_nature} {company.company_size ? " | " : null}
          {company.company_size} {company.industry ? " | " : null}
          {company.industry}
        </div>
      </div>
      <div className={style.right}>
        <img src={Rectangle} />
      </div>
    </div>
  )
}

export default HotelEntry
