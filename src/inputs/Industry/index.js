import { connect } from 'react-redux'
import ComplexSelView from '../../components/Complex/ComplexSelView'

@connect(state => {
  // console.log(
  //   state.option.opts_company_industry,
  //   state.option.opts_industry_index
  // )
  return {
    options: state.option.opts_company_industry,
    optIndex: state.option.opts_company_industry_index,
  }
})
class Industry extends ComplexSelView {}

export default Industry
