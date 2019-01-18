import React, {PureComponent} from 'react'
import style from './style.less'
class ComInfor extends PureComponent {
  render(){

    return (
      <div className={style.line} style={this.props.style}></div>
    )
  }
}

export default ComInfor
