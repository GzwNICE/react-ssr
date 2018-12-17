import React, { PureComponent } from 'react'
import { withRouter, Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { getAllInfo } from '../../actions/resume'
import { remove as educationalsRemove } from '../../actions/educationals'
import { NavBar, Flex, List, SwipeAction, Icon } from 'antd-mobile'
import style from '../ResumeInfo/style.less'
import style2 from './style.less'

@connect(state => {
  return {
    option: state.option,
    educationals: state.educationals.list,
  }
})
@withRouter
class ResumeEducation extends PureComponent {
  componentDidMount() {
    this.props.dispatch(getAllInfo({
      appchannel: 'web',
    }))
  }

  goTo(id) {
    this.props.history.push(`/resume/education/${id}`)
  }

  removeItem(item) {
    this.props.dispatch(educationalsRemove({
      edu_exp_id: item.id,
    }))
  }

  render() {
    const {
      educationals=[],
    } = this.props

    return (
      <Flex direction="column" align="stretch" className={style.root}>
        <NavBar
          mode="light"
          className={style.nav}
          icon={<Icon type="left" />}
          onLeftClick={() => this.props.history.goBack()}>
          教育经历
        </NavBar>
        <div className={style2.wraper}>
          <List>
            {educationals.map(item => (
              <SwipeAction
                key={item.id}
                autoClose
                right={[
                  {
                    text: '删除',
                    onPress: () => this.removeItem(item),
                    style: { backgroundColor: '#F4333C', color: 'white' },
                  },
                ]}
              >
                <List.Item arrow="horizontal" onClick={() => this.goTo(item.id)}>
                  <div>{item.school_cn || '学校名称'}</div>
                  <div className={style2.etime}>
                    {`${item.begin_year}-${item.begin_month}`}-
                    {item.end_year !== '0' ? `${item.end_year}-${item.end_month}` : '至今'}
                  </div>
                </List.Item>
              </SwipeAction>
            ))}
          </List>
        </div>
        <Flex className={style2.add} justify="center">
          <Link to="/resume/education/add">
            + 添加教育经历
          </Link>
        </Flex>
      </Flex>
    )
  }
}

export default ResumeEducation
