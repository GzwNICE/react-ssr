
import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { Tabs, Badge } from 'antd-mobile'
import NavBack from '../../components/Back'
// import queryString from 'query-string'
import SelectPost from '../SelectPost'
import SelectCompany from '../SelectCompany'
import style from './style.less'


@connect(state => ({}))
class SelectConcern extends PureComponent {

  componentDidMount(){
    if(!sessionStorage.getItem('is_login')){
      this.props.history.push(`/user/register`)
    }
  }

  render() {
    const tabs = [
      { title: <Badge key="1">关注的企业</Badge> },
      { title: <Badge key="2">收藏的职位</Badge> },
    ]
    return (
      <div className={style.concernPage}>
        <NavBack title="关注/收藏"/>
        <div className={style.loginTab}>
          <Tabs
            tabs={tabs}
            initialPage={0}
            swipeable={false}
          >
            <SelectCompany />
            <SelectPost />
          </Tabs>
        </div>
      </div>
    )
  }
}

export default SelectConcern
