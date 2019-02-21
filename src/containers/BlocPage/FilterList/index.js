/**
 * Created by huangchao on 2017/11/4.
 */
import React,{PureComponent, Component} from 'react'
import style from '../style.less'
import { createForm } from 'rc-form'
import Area from '../../../inputs/Area2'
import Brand from '../../../inputs/Brand'
import SimpleItem from '../../../inputs/SimpleItem'
import Down from '../../../static/angleDownGray@3x.png'
import { connect } from 'react-redux'

const querys ={
  area:[],
  brand:0,
}
@createForm({
  onValuesChange(props, values) {
   if(values.areas){
     querys.area=values.areas
   }
   if(values.brand){
      querys.brand=values.brand
   }
   props.filterList(querys)
  },
})
@connect(state => ({
  // supers: state.supers,
}))
class FilterList extends (PureComponent || Component) {

  formatBrand(value) {
    if (this.props.options.length > 0) {
      return this.props.options.filter(x=>x.code.toString() === value[0])[0] ? this.props.options.filter(x=>x.code.toString() === value[0])[0]['value'] : '品牌'
    } else {
      return null
    }
  }

  render() {
    const { form } = this.props
    const { getFieldProps } = form
    return (
      <div className={style.selectInfo}>
            <div className={style.selCity}>
              <div className={style.city}>
              <Area
                  extra="城市"
                  {...getFieldProps('areas', {
                    // initialValue: supers.location.address.code,
                    initialValue: [],
                  })} // 触发form，调用onChangeCity
                  maxLength={1}
                >
                  <SimpleItem arrow="horizontal" />
                </Area>
              </div>
              <img src={Down} alt="down" />
            </div>
            <span className={style.selRule} />
            <div className={style.selBrand}>
              <div className={style.Brand}>    
                <Brand
                  {...getFieldProps('brand', {
                    initialValue: [
                      '9999',
                    ],
                  })} // 触发form，调用onChangeCity
                  format={this.formatBrand}
                  title="选择品牌"
                >
                  <SimpleItem arrow="horizontal" />
                </Brand>
              </div>
              <img src={Down} alt="down" />
            </div>
          </div>
    )
  }
}

export default FilterList
