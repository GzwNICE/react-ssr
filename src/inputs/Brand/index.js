import React from 'react'
import { List } from 'antd-mobile'
import { connect } from 'react-redux'
import ComplexSelView, {
  style as viewStyle,
} from '../../components/Complex/ComplexSelView'

@connect(state => {
  return {
    options: state.bloc.brand,
    optIndex: state.bloc.brand_index,
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
