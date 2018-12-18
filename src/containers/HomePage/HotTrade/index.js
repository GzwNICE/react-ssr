import React, { Component } from 'react'
import { Flex } from 'antd-mobile'
import { connect } from 'react-redux'
import { hotTrade } from '../../../actions/home'
import hotjobs from '../../../static/hotJobs@3x.png'

import style from '../style.less'

@connect(state => ({
  tradeDtata: state.home.tradeDtata,
}))
export default class HotTrade extends Component {
  constructor(props) {
    super(props)
    this.state = {
      TradeData: [
        {
          subtitle: '酒店',
          logosrc: [
            'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=946990677,1683235802&fm=26&gp=0.jpg',
            'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=946990677,1683235802&fm=26&gp=0.jpg',
            'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=946990677,1683235802&fm=26&gp=0.jpg',
          ],
          post: [
            '前厅',
            '客房',
            '大堂',
            '礼宾/前台',
            '工程',
            '保安',
            '市场销售',
            '总经理',
          ],
        },
        {
          subtitle: '餐饮',
          logosrc: [
            'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=946990677,1683235802&fm=26&gp=0.jpg',
            'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=946990677,1683235802&fm=26&gp=0.jpg',
            'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=946990677,1683235802&fm=26&gp=0.jpg',
          ],
          post: [
            '店长',
            '领班',
            '传菜',
            '服务员',
            '洗碗工',
            '厨师',
            '调酒师',
            '打荷',
          ],
        },
        {
          subtitle: '休闲娱乐',
          logosrc: [
            'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=946990677,1683235802&fm=26&gp=0.jpg',
            'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=946990677,1683235802&fm=26&gp=0.jpg',
            'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=946990677,1683235802&fm=26&gp=0.jpg',
          ],
          post: [
            '温泉',
            '高尔夫',
            '酒吧',
            '咖啡厅',
            'KTV',
            '会所',
            '美容/SPA',
            '健身中心',
          ],
        },
        {
          subtitle: '康养',
          logosrc: [
            'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=946990677,1683235802&fm=26&gp=0.jpg',
            'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=946990677,1683235802&fm=26&gp=0.jpg',
            'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=946990677,1683235802&fm=26&gp=0.jpg',
          ],
          post: [
            '医生',
            '护士',
            '保健医师',
            '理疗师',
            '营养师',
            '健康顾问',
            '家政',
            '院长',
          ],
        },
        {
          subtitle: '房地产',
          logosrc: [
            'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=946990677,1683235802&fm=26&gp=0.jpg',
            'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=946990677,1683235802&fm=26&gp=0.jpg',
            'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=946990677,1683235802&fm=26&gp=0.jpg',
          ],
          post: [
            '物业',
            '工程师',
            '设计师',
            '水电工',
            '机修工',
            '装潢工',
            '采购',
            '项目专员',
          ],
        },
      ],
      jobs: [
        '总经理',
        '总工程师',
        '行政管家',
        '餐饮部长',
        '西厨厨师长',
        '前厅经理',
        '前厅员工',
        '餐饮员工',
      ],
    }
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
    const { TradeData, jobs } = this.state
    const imgData = this.props.tradeDtata
    return (
      <div className={style.Hottrade}>
        {this.getImgData(imgData)}
        {TradeData
          ? TradeData.map((item, index) => {
              return (
                <div className={style.tradeModule} key={index}>
                  <h1 className={style.subtitle}>{item.subtitle}</h1>
                  <div className={style.tradeLogo}>
                    <Flex>
                      {item.logosrc
                        ? item.logosrc.map((item, index) => {
                            return (
                              <Flex.Item key={index}>
                                <img src={item.company_logo} alt="img" />
                              </Flex.Item>
                            )
                          })
                        : null}
                    </Flex>
                  </div>
                  <div className={style.tradePost}>
                    {item.post.map((item, index) => {
                      return <span key={index}>{item}</span>
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
              {jobs
                ? jobs.map((item, index) => {
                    return <span key={index}>{item}</span>
                  })
                : null}
            </div>
          </div>
        </div>
      </div>
    )
  }
}
