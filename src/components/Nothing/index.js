/**
 * Created by Gaozhiwen on 2019/1/11 
 */
import React from 'react'
import style from './style.less'
import { Link } from 'react-router-dom'
import nothingImg from '../../static/missing.png'

const Nothing = props => {
  const { font, botton, link ,title, height} = props
  return (
    <div
      className={style.nothing}
      style={{
        overflow: 'auto',
        height: height ? `calc(100vh - ${height})` : `calc(100vh - 1.4rem)`,
      }}
    >
      <img src={nothingImg} alt="" />
      {title ? (<p>{title}</p>) : null}
      <span>{font || '什么都没有'}</span>
      {botton ? <Link to={link}>{botton || `去看看`}</Link> : null}
    </div>
  )
}

export default Nothing
