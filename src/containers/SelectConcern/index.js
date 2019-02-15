
import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import queryString from 'query-string'
import { Tabs, Badge } from 'antd-mobile'
import NavBack from '../../components/Back'
import SelectPost from '../SelectPost'
import SelectCompany from '../SelectCompany'
import style from './style.less'
import F from '../../helper/tool'

@connect(state => ({}))
class SelectConcern extends PureComponent {
  state={
    key: 0,
  }
  handleTabClick = index => {
    this.props.history.replace(`/person/concern?key=${index.title.key}`)
  }

  componentWillMount(){
    const parsed = queryString.parse(window.location.search)
    this.setState({
      key: parsed.key-1 || 0,
    })
  }

  componentDidMount(){
    const is_login = F.getUserInfo().is_login
    if(is_login !== 1){
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
            swipeable={false}
            initialPage={this.state.key}
            onTabClick={this.handleTabClick}
          >
            <SelectCompany {...this.props} />
            <SelectPost {...this.props} />
          </Tabs>
        </div>
      </div>
    )
  }
}

export default SelectConcern
