import React from 'react'
import style from './style.less'
// class VisityCard extends React.Component {
//   constructor(props) {
//     super(props)
//     this.displayName = 'VisityCard'
//   }
//   render() {
//
//   }
// }

const VisityCard = (props) => {
  return (
    <div className={style.content}>
      <div className={style.left}>
        <img src={props.data.company_logo}/>
      </div>
      <div className={style.right}>
        <div className={style.line01}>{props.data.viewed_user_name}</div>
        <div className={style.line02}>{props.data.company_name}</div>
        <div className={style.line03}>浏览时间：{props.data.viewed_date.substring(0,10)}</div>
      </div>
    </div>
  )
}

export default VisityCard
