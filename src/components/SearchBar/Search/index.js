import React, { Component } from 'react'
import { SearchBar } from 'antd-mobile'
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'
import personal from '../../../static/personal.png'
import back from '../../../static/back.png'
// import { loggingStatus } from '../../../actions/userStatus'
import style from './style.less'
// import { ConversationMemberRole } from 'leancloud-realtime'

@connect(state => ({
  // is_login: state.userStatus.is_login,
  // photo: state.userStatus.photo,
}))
class Search extends Component {
  constructor(props) {
    super(props)
    this.state = {
      is_login: false,
      photo: '',
    }
  }

  handleSearch() {}

  componentDidMount() {
    // this.props.dispatch(loggingStatus({})).then(() => {
    //   this.setState({
    //     is_login: this.props.is_login,
    //     photo: this.props.photo,
    //   })
    // })
    // this.autoFocusInst.focus()
  }

  render() {
    // const { photo, is_login } = this.state
    const is_login = sessionStorage.getItem('is_login')
    const photo = sessionStorage.getItem('photo')
    return (
      <div className={style.Search}>
        <div className={style.goBack} onClick={this.props.goBack}>
          <img src={back} alt="bank" />
        </div>
        <SearchBar
          placeholder="搜索职位/品牌"
          onSubmit={this.props.Search}
          onCancel={this.props.Cancel}
          onChange={this.props.Change}
        />
        <Link
          rel="stylesheet"
          to={
            is_login
              ? `/tabs/user?redirect=${this.props.location.pathname}`
              : `/user/register?redirect=${this.props.location.pathname}`
          }
        >
          <img
            src={is_login ? photo : personal}
            alt="img"
            className={style.personal}
          />
        </Link>
      </div>
    )
  }
}

export default withRouter(Search)
