import React, { Component } from 'react'
import { Carousel } from 'antd-mobile'

import style from '../style.less'

export default class Album extends Component {
  constructor(props) {
    super(props)
    this.state = {
      show: true,
      data: [
        'AiyWuByWklrrUDlFignR',
        'TekJlZRVCjLFexlOCuWn',
        'IJOtIlfsYdTyaDTRVrLI',
      ],
      current: 1,
    }
  }

  handleChange(i) {
    this.setState({
      current: i + 1,
    })
  }

  render() {
    const { current } = this.state
    return (
      <div className={style.Album}>
        <div className={style.photoAlbum}>
          <p>企业魅力</p>
          <div className={style.photo}>
            <Carousel
              cellSpacing={10}
              slideWidth="340px"
              dots={false}
              afterChange={this.handleChange.bind(this)}
            >
              {this.state.data.map((val, index) => (
                <a key={index}>
                  <img
                    src={`https://zos.alipayobjects.com/rmsportal/${val}.png`}
                    alt=""
                  />
                </a>
              ))}
            </Carousel>
            <div className={style.dots}>
              {current} / <span>{this.state.data.length}</span>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
