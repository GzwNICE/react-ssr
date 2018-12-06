import React, { Component } from 'react'
import { Flex } from 'antd-mobile'
import hotjobs from '@static/hotJobs@3x.png'
import style from './style.less'

export default class HotTrade extends Component {
  state = {
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
          'KTV',
          '会所',
          '美容/SPA',
          '桑拿/足浴',
          '健身中心',
          '咖啡厅',
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
  render() {
    const { TradeData, jobs } = this.state
    return (
      <div className={style.Hottrade}> 
        {TradeData
          ? TradeData.map(item => {
              return (
                <div className={style.tradeModule}>
                  <h1 className={style.subtitle}>{item.subtitle}</h1>
                  <div className={style.tradeLogo}>
                    <Flex>
                      {item.logosrc.map(item => {
                        return (
                          <Flex.Item>
                            <img src={item} alt="img" />
                          </Flex.Item>
                        )
                      })}
                    </Flex>
                  </div>
                  <div className={style.tradePost}>
                    {item.post.map(item => {
                      return <span>{item}</span>
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
                ? jobs.map(item => {
                    return <span>{item}</span>
                  })
                : null}
            </div>
          </div>
        </div>
      </div>
    )
  }
}
