/**
 * Created by gaozhiwen on 2019/1/13
 * 意见反馈
 */
import React, { PureComponent } from 'react'
// import LisetItem from '../../components/ListItem'
// import { ImagePicker, WingBlank, SegmentedControl } from 'antd-mobile';
import { connect } from 'react-redux'
import { Toast, ImagePicker } from 'antd-mobile'
import Alert from '../../components/Alert'
import NavBack from '../../components/Back'
import style from './style.less'
import { feedbackOpinion } from '../../actions/moreSeeting'

const type = [
  {
    type: 1,
    val: '性能问题',
  },
  {
    type: 2,
    val: '产品建议',
  },
  {
    type: 3,
    val: '吐槽',
  },
  {
    type: 4,
    val: '其他',
  },
]

@connect(state => {
  return {
    auth: state.auth,
  }
})
class OPintion extends PureComponent {
  state = {
    type: '',
    files: [],
    feedSuccess: false,
    errorImage1: '',
    errorImage2: '',
    errorImage3: '',
  }
  selItem = type => {
    this.setState({
      type: type,
    })
  }

  onChange = (files, type, index) => {
    this.setState({
      files,
    })
    if (files.length === 1) {
      this.setState({
        errorImage1: files[0].url,
        errorImage2: '',
        errorImage3: '',
      })
    }
    if (files.length === 2) {
      this.setState({
        errorImage1: files[0].url,
        errorImage2: files[1].url,
        errorImage3: '',
      })
    }
    if (files.length === 3) {
      this.setState({
        errorImage1: files[0].url,
        errorImage2: files[1].url,
        errorImage3: files[2].url,
      })
    }
  }

  showModal = key => e => {
    if (e) e.preventDefault() // 修复 Android 上点击穿透
    this.setState({
      [key]: true,
    })
  }

  onClose = key => () => {
    this.setState({
      [key]: false,
    })
    this.props.history.go(-1)
  }

  onAddImageClick = e => {
    e.preventDefault()
    this.setState({
      files: this.state.files.concat({
        url: 'https://zos.alipayobjects.com/rmsportal/hqQWgTXdrlmVVYi.jpeg',
        id: '3',
      }),
    })
  }

  submitFeedback = () => {
    const content = this.refs.content.value
    const contact = this.refs.contact.value

    if (!this.state.type) return Toast.info('请选择反馈类型', 2)
    if (!content) return Toast.info('请输入反馈意见', 2)
    const feedSuccess = this.showModal('feedSuccess')
    this.props
      .dispatch(
        feedbackOpinion({
          content,
          contact,
          questiontype: this.state.type,
          appchannel: 'web',
          errorImage1: this.state.errorImage1,
          errorImage2: this.state.errorImage2,
          errorImage3: this.state.errorImage3,
        })
      )
      .then(data => {
        if (data.status === 1) {
          feedSuccess()
        }
        if (data.status === 0) {
          Toast.info('图片格式错误', 2)
        }
      })
  }

  render() {
    const { phone, email } = this.props.auth
    const { files } = this.state
    return (
      <div className={style.opintionWrap}>
        <NavBack title="意见反馈" />
        <div className={style.opintionCent}>
          <div className={style.feedtype}>
            <div className={style.feedtitle}>
              <span>*</span> 反馈类型
            </div>
            <div className={style.feedItem}>
              <div className={style.itemBox}>
                {type.map((d, i) => (
                  <div
                    onClick={() => this.selItem(d.type)}
                    key={d.type}
                    className={`${style.item} ${
                      this.state.type === d.type ? style.selet : null
                    }`}
                  >
                    {d.val}
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className={style.connent}>
            <div className={style.feedtitle}>
              <span>*</span> 反馈内容
            </div>
            <div className={style.feedBox}>
              <textarea
                ref="content"
                className={style.feedcontent}
                placeholder="反馈性能问题时，请描述具体操作步骤及问题！"
              />
              <ImagePicker
                length="5" //仅仅为了样式调整为5张
                files={files}
                onChange={this.onChange}
                selectable={files.length < 3} //length 为索引
              />
              <span>最多3张</span>
            </div>
          </div>
          <div className={style.number}>
            <div className={style.feedtitle}>联系方式</div>
            <input
              className={style.phone}
              ref="contact"
              defaultValue={phone || email || ''}
              type="number"
              placeholder="如需得到反馈，请输入你的联系方式"
            />
          </div>
        </div>
        <div className={style.commit} onClick={this.submitFeedback}>
          提交反馈
        </div>
        <Alert
          title={`反馈成功`}
          height={145}
          closable={0}
          visible={this.state.feedSuccess}
          onClose={this.onClose('feedSuccess')}
          message={`您的意见已经提交给产品设计人员，如有紧急需求可联系0571-88866108。`}
          actions={[
            {
              text: '知道了',
              onPress: this.onClose('feedSuccess'),
              type: 'know',
            },
          ]}
        />
      </div>
    )
  }
}

export default OPintion
