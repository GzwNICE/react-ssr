import React, { PureComponent, Component } from 'react'
import { Carousel } from 'antd-mobile'
import PropTypes from 'prop-types'
import style from './style.less'
import { connect } from 'react-redux'
import { getBanner } from '../../actions/banner'
const triggerFrames = "帧"

@connect(state => {
  return {
    banner: state.banner,
  }
})
class Carousels extends (PureComponent || Component) {
  static propTypes = {
    banner: PropTypes.object,
  }
  state = {
    initialHeight: 176,
  }
  goPosition = (val, key) => {
    const banner = key + 1
    window.zhuge.track('banner', {
      [`${triggerFrames}`]: banner,
    })
    if (val.action === '2') {
      return this.props.history.push(`/${val.c_userid}`)
    }
    if (val.action === '3') {
      return this.props.history.push(`/${val.c_userid}/${val.job_id}`)
    }
    if (val.action === '1' || val.action === '4' || val.action === '5') {
      return (window.location.href = val.uri)
    }
  }
  componentDidMount() {
    const { ad = [] } = this.props.banner
    if (ad.length === 0) {
      this.props.dispatch(getBanner())
    }
  }
  render() {
    let { ad = [] } = this.props.banner
    return (
      <div className={style.CarouselsWrap}>
        <Carousel
          className={style.carousel}
          infinite
          autoplay
          selectedIndex={0}
          swipeSpeed={50}
          dotStyle={DOT.dotStyle}
          dotActiveStyle={DOT.dotActiveStyle}
        >
          {ad.map((val, i) => {
            return (
              <div
                key={i}
                style={{ height: this.state.initialHeight }}
                className={style.aLink}
              >
                <img
                  onClick={() => {
                    this.goPosition(val, i)
                  }}
                  src={val.image}
                  alt="img"
                  onLoad={() => {
                    window.dispatchEvent(new Event('resize'))
                    this.setState({
                      initialHeight: 'auto',
                    })
                  }}
                />
              </div>
            )
          })}
        </Carousel>
      </div>
    )
  }
}
const DOT = {
  dotStyle: {
    width: 0.06 + 'rem',
    height: 0.06 + 'rem',
    backgroundColor: '#fff',
    opacity: 0.5,
  },
  dotActiveStyle: {
    width: 0.24 + 'rem',
    height: 0.06 + 'rem',
    borderRadius: 0.08 + 'rem',
    backgroundColor: '#fff',
  },
}
// autoplay

export default Carousels

// {ad.map((val, i) => (
//   <div
//     key={i}
//     style={{background: `url(${val.image}) top/ contain no-repeat`}}
//     className={style.aLink}
//     onClick={() => {this.goPosition(val)}}
//   />
// ))}
