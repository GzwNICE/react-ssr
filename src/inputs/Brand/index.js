import React from 'react'
import { List } from 'antd-mobile'
import { connect } from 'react-redux'
import ComplexSelView, {
  style as viewStyle,
} from '../../components/Complex/ComplexSelView'
import style from './style.less'
import okIcon from '../../static/ok@3x.png'
import unsetIcon from '../../static/unset@3x.png'

@connect(state => {
  return {
    options: state.company.brand,
    optIndex: state.company.brand_index,
  }
})
class Brand extends ComplexSelView {
  allView(sublist) {
    return (
      <div className={viewStyle.allView}>
        <List>
          {this.listView(sublist)}
        </List>
      </div>
    )
  }
}
export default Brand
