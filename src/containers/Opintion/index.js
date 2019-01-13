/**
 * Created by gaozhiwen on 2019/1/13
 * 意见反馈
 */
import React, { PureComponent } from 'react'
// import LisetItem from '../../components/ListItem'
// import { ImagePicker, WingBlank, SegmentedControl } from 'antd-mobile';
import { connect } from 'react-redux'
import { Toast, ImagePicker } from 'antd-mobile'
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
  }
  selItem = type => {
    this.setState({
      type: type,
    })
  }

  onChange = (files, type, index) => {
    console.log(files, type, index)
    this.setState({
      files,
    })
  }

  submitFeedback = () => {
    const content = this.refs.content.value
    const contact = this.refs.contact.value
    const _that = this
    if (!this.state.type) return Toast.info('请选择反馈类型', 2)
    if (!content) return Toast.info('请输入反馈意见', 2)
    if (!contact) return Toast.info('请输入联系方式', 2)
    this.props
      .dispatch(
        feedbackOpinion({
          content,
          contact,
          questiontype: this.state.type,
        })
      )
      .then(() => {
        Toast.success('感谢您的反馈', 2)
        setTimeout(() => {
          _that.props.history.go(-1)
        }, 1200)
      })
  }

  render() {
    const { phone, email } = this.props.auth
    const { files } = this.state
    return (
      <div className={style.OPintionWrap}>
        <NavBack title="意见反馈" />
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
              placeholder="你的意见将帮助我们更快成长。"
            />
            <ImagePicker
              files={files}
              onChange={this.onChange}
              onImageClick={(index, fs) => console.log(index, fs)}
              selectable={files.length < 3}
              multiple
            />
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
        <div className={style.commit} onClick={this.submitFeedback}>
          提交反馈
        </div>
      </div>
    )
  }
}

export default OPintion
