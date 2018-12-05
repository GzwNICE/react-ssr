import React from 'react'
import style from './style.less'

class TipTel extends React.PureComponent {
  render() {
    return (
      <div className={style.content}>
        <div className={style.top}>你的联系方式</div>
        <div className={style.bottom}>
          <input {...this.props} placeholder="请输入联系方式" />
        </div>
      </div>
    )
  }
}

// const TipTel = (props) => {
//
// }

export default TipTel
