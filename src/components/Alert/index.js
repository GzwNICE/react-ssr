/**
 * Created by gaozhiwen on 2018/12/28  投递简历弹框
 * 
 * 调用方法：
 * 
 * <Alert                                        引入组件
 *  icon=""                                      弹框需要的img、logo、icon   空=> 不显示
    title=""                                     弹框标题
    height={176}                                 弹框主题内容高度    空=>  默认130px
    closable={1}                                 弹框显示关闭按钮   closable=1 为显示，closable=0为隐藏
    visible={this.state.toPerfect}               弹框显示与隐藏   父组件中state控制显示与隐藏
    onClose={this.onClose('toPerfect')}          弹框关闭方法      
    message={`你的简历完整度<40%，通过率极低`}     弹框内容
    actions={[                                   弹框按钮组    至少为 1个，可多个
      {
        text: '去完善',                           按钮文字
        onPress: this.onClose('toPerfect'),       按钮注册事件
        type: 'ok',                               type类型为按钮的基本样式   close=>关闭，  ok=>确认   空=>单个按钮
      },
    ]}
  />
 */
import React from 'react'
import { Modal } from 'antd-mobile'
import style from './style.less'

const Alert = props => {
  const { title, message, visible, actions, closable, onClose, icon, height } = props
  return (
    <Modal
      visible={visible}
      closable={closable === 1 ? true : false}
      transparent
      maskClosable={false}
      onClose={onClose}
    >
      <div style={height ? { height: height } : { height: 130 }}>
        {icon ? <img src={icon} alt="img" className={style.deliver} /> : null}
        <span className={style.title}>{title}</span>
        <p className={style.message}>{message}</p>
        {actions.map((item, index) => {
          return (
            <div
              className={
                item.type ? (item.type === 'ok'? style.go: (item.type === 'know' ? style.know : style.wontGo )): style.app
              }
              style={item.width ? { width: item.width } : {}}
              onClick={item.onPress}
              key={index}
            >
              {item.text}
            </div>
          )
        })}
      </div>
    </Modal>
  )
}

export default Alert
