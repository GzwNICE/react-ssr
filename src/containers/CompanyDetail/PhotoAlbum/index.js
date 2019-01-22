import React, { Component } from 'react'
import { Carousel } from 'antd-mobile'

import style from '../style.less'

export default class Album extends Component {
  constructor(props) {
    super(props)
    this.state = {
      show: true,
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
    const album = this.props.album || []
    return (
      <div className={style.Album}>
        <div className={style.photoAlbum}>
          <p>企业魅力</p>
          <div className={style.photo}>
            <Carousel
              cellSpacing={10}
              slideWidth={0.9}
              dots={false}
              afterChange={this.handleChange.bind(this)}
            >
              {album.map((val, index) => (
                <a key={index}>
                  <img
                    src={val.thumb_url}
                    alt="albumimg"
                    onLoad={()=>{
                      window.dispatchEvent(new Event('resize'))
                    }}
                  />
                </a>
              ))}
            </Carousel>
            <div className={style.dots}>
              {current} / <span>{album.length}</span>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
