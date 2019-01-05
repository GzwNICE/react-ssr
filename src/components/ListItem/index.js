/**
 * Created by huangchao on 2017/9/25.
 */
// 用于list列表的单个元素
import React from 'react'
import PropTypes from 'prop-types'
import style from './style.less'
import AngleRight from '../../static/Rectangle@3x.png'

const ListItem = (props) => {
  let {img, num, underline, titleleft, rightNum, rightcontant, rightangle} = props
  return (
    <div className={style.ListItemWrap}>
      {
        img
          ? <div className={style.titleImg}>
            <img src={img} alt="img" />
            
          </div>
          : null
      }
      <div className={`${style.itemContant} ${underline === 'true' ? style.Line : null}`}>
        <div className={style.leftBox}>
          {titleleft}
        </div>
        {Number(num)> 0 ? <span className={style.rightIcon}>{num}</span> : null}
        {/*{rightNum ? (<div className={style.rightIcon}>{ rightNum ? `${rightNum}` : null}</div>):null}*/}
        
        {/*<div className={style.rightBox}>
          <div className={style.rightTitle}>
            { righttitle ? `${righttitle}` : null}
            <span>
              {rightcontant}
            </span>
          </div>
          {rightangle === 'false'
            ? null
            : <div className={style.RightAngle}>
              <img src={AngleRight} alt="img" />
            </div>
          }
        </div>*/}
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
