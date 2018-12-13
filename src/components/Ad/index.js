/**
 * Created by huangchao on 30/03/2018.
 */
import React from 'react'
import style from './style.less'
import abc from '../../static/bac.png'
import close from '../../static/close.png'
import logo from '../../static/downloadlogo.png'
import downbg from '../../static/downbg.png'

const AdWindow  =  (props) => {
  return (
    <div className={`${style.advertising} ${!props.show ? '' : style.hidden}`}>
      <div onClick={() => props.onCloseAd()} className={style.close}>
        <img src={close} alt=""/>
      </div>
      <div className={style.adbody}>
        <img src={abc} alt="img"/>
      </div>
      <div onClick={() => props.downLoadAd()} className={style.downloadBtn}>
        下载最佳东方APP
      </div>
    </div>
  )
}

const AdTop = (props) => {
  return(
    <div className={`${style.AdTopWrap} ${props.show ? '' : style.hidden}`}>
      <div className={style.keyword}>
        <div className={style.logo}>
          <img src={logo} alt="img"/>
        </div>
        <div>
          <p>旅游服务业的招聘求职平台</p>
          <p>酒店、餐饮、休闲娱乐、康养</p>
        </div>
      </div>
      <div
        onClick={() => props.downLoadAd()}
        className={style.btn}
        style={{background: `url(${downbg}) center/ cover no-repeat`}}>
        下载app
      </div>
    </div>
  )
}

export {AdWindow, AdTop}
