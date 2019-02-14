/**
 * Created by gaozhiwen on 2019/1/13.
 */
// 用于list列表的单个元素
import React from 'react'
import PropTypes from 'prop-types'
import AngleRight from '../../static/Rectangle@3x.png'
import style from './style.less'

const ListItem = props => {
  let { img, num, underline, titleleft } = props
  return (
    <div className={style.ListItemWrap}>
      {img ? (
        <div className={style.titleImg}>
          <img src={img} alt="img" />
        </div>
      ) : null}
      <div
        className={`${style.itemContant} ${
          underline === 'true' ? style.Line : null
        }`}
      >
        <div className={style.leftBox}>{titleleft}</div>
        {Number(num) > 0 ? (
          <span className={style.rightIcon}>{num}</span>
        ) : null}
        <div className={style.RightAngle}>
          <img src={AngleRight} alt="img" />
        </div>
      </div>
    </div>
  )
}

ListItem.propTypes = {
  img: PropTypes.string,
  underline: PropTypes.string,
  titleleft: PropTypes.string,
  righttitle: PropTypes.string,
  rightangle: PropTypes.string,
}

export default ListItem
