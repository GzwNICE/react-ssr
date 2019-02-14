/**
 * Created by huangchao on 2018/4/8.
 */
import React from 'react'
import style from './style.less'
import nothingImg from '../../static/messagelist@3x.png'
import nothingloke from '../../static/lokemelist@3x.png'

const NothingMessageList = (props) => {
  return (
    <div className={style.nothing}>
      <img className={style.imgmessage} src={nothingImg} alt="" />
      <div className={style.noproplem}>暂无消息</div>
      <div className={style.gocontact}>主动去联系HR吧</div>
    </div>
  )
}

const NothingLokeMeList = (props) => {
  return (
    <div className={style.nothing}>
      <img className={style.lokeme} src={nothingloke} alt="" />
      <div className={style.noproplem}>暂无记录</div>
      <div className={style.gocontact}>快去完善简历增加机会吧</div>
    </div>
  )
}


export {
  NothingMessageList,
  NothingLokeMeList,
}
