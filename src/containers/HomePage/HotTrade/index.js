import React, { Component } from 'react'
import { Flex } from 'antd-mobile'
import { connect } from 'react-redux'
import { hotTrade } from '../../../actions/home'
import { withRouter } from 'react-router-dom'
import hotjobs from '../../../static/hotJobs@3x.png'

import style from '../style.less'

@connect(state => ({
  tradeDtata: state.home.tradeDtata,
}))
class HotTrade extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  componentDidMount() {
    this.props.dispatch(hotTrade({}))
  }

  getImgData(data) {
    const { TradeData } = this.state
    let Trade = [
      {
        logosrc: [],
      },
      {
        logosrc: [],
      },
      {
        logosrc: [],
      },
      {
        logosrc: [],
      },
      {
        logosrc: [],
      },
    ]
    Trade[0].logosrc = data[0]
    Trade[1].logosrc = data[1]
    Trade[2].logosrc = data[2]
    Trade[3].logosrc = data[3]
    Trade[4].logosrc = data[4]
    let arr = []
    TradeData.map((item, index) => {
      return arr.push(Object.assign(item, Trade[index]))
    })
  }

  render() {
    const imgData = this.props.tradeDtata
    return (
      <div className={style.Hottrade}>
        {imgData.list
          ? imgData.list.map((item, index) => {
              return (
                <div className={style.tradeModule} key={index}>
                  <h1 className={style.subtitle} >{item.keyArray.industry}</h1>
                  <div className={style.tradeLogo}>
                    <Flex>
                      {item.logoArray
                        ? item.logoArray.map((item, index) => {
                            return (
                              <Flex.Item
                                key={index}
                                onClick={() => {
                                  this.props.history.push(`/${item.c_userid}`)
                                }}
                              >
                                <img src={item.company_logo} alt="img" />
                              </Flex.Item>
                            )
                          })
                        : null}
                    </Flex>
                  </div>
                  <div className={style.tradePost}>
                    {item.keyArray.key.map((item, index) => {
                      return (
                        <span
                          key={index}
                          onClick={() => {
                            this.props.history.push(
                              `/search/${item}?keyword=${item}`
                            )
                          }}
                        >
                          {item}
                        </span>
                      )
                    })}
                  </div>
                  <i />
                </div>
              )
            })
          : null}
        <div className={style.hotjobs}>
          <i />
          <div className={style.jobList}>
            <img src={hotjobs} alt="img" />
            <div className={style.jobs}>
              {imgData.jobKey
                ? imgData.jobKey.map((item, index) => {
                    return (
                      <span
                        key={index}
                        onClick={() => {
                          this.props.history.push(
                            `/search/${item}?keyword=${item}`
                          )
                        }}
                      >
                        {item}
                      </span>
                    )
                  })
                : null}
            </div>
          </div>
        </div>
      </div>
    )
  }
}
export default withRouter(HotTrade)
