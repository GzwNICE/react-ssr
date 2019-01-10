/**
 * Created by huangchao on 2017/11/2.
 */
import React from 'react'
import style from './style.less'
import { Link } from 'react-router-dom'
import nothingImg from '../../static/missing.png'

const Nothing = props => {
  const { font, botton, link } = props
  return (
    <div
      className={style.nothing}
      style={{
        overflow: 'auto',
        height: 'calc(100vh - 0.95rem)',
      }}
    >
      <img src={nothingImg} alt="" />
      <span>{font || '什么都没有'}</span>
      {botton ? <Link to={link}>{botton || `去看看`}</Link> : null}
    </div>
  )
}

export default Nothing
