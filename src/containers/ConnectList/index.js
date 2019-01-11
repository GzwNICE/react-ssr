import React,{PureComponent} from 'react'
import ConnectCard from '../../components/ConnectCard'
import { pipeline } from '../../helper/fetching'
import {NothingMessageList} from '../../components/NothingTalk'

class ConnectList extends PureComponent {
  state = {
    msgList: [],
  }
  componentDidMount() {
    pipeline(':ve.mobile.interface/user/msgList').then(
      data => {
        if (data.errCode === 2002) {
          // Modal.alert('', '请先登录', [
          //   { text: '稍后', style: 'default' },
          //   { text: '登录', onPress: () => this.props.push('/register?redirect=' + this.props.history.location.pathname, {key: '消息'})},
          // ])
        }
        this.setState({
          msgList: data.data || [],
        })
      }
    ).catch(json => {
      // console.log(json)
    })
  }
  render() {
    let {msgList} = this.state
    return (
      <div>
        {
          msgList.length > 0
            ? msgList.map((elem, index) => <ConnectCard key={index} msgList={elem}/>)
            : <NothingMessageList />
        }
      </div>
    )
  } 
}

export default ConnectList
