import React, { Component } from 'react'
import { Carousel } from 'antd-mobile'
import style from '../style.less'

export default class CompanyDuce extends Component {
  constructor(props) {
    super(props)
    this.state = {
      introduced: true, //有企业信息
      open: true, //显示查看全部
      data: [
        'AiyWuByWklrrUDlFignR',
        'TekJlZRVCjLFexlOCuWn',
        'IJOtIlfsYdTyaDTRVrLI',
      ],
      current: 1,
    }
  }

  componentDidMount() {
    if (this.state.introduced) {
      if (this.otext.clientHeight < 50) {
        this.setState({
          open: false,
        })
      }
    }
  }

  handleUnfold() {
    this.setState({
      open: false,
    })
  }

  handleChange(i){
    this.setState({
      current: i + 1,
    })
  }

  render() {
    const { open, introduced,current } = this.state
    return (
      <div className={style.Introduce}>
        {introduced ? (
          <div className={style.companyFerral}>
            <div className={style.title}>企业介绍</div>
            <div
              className={open ? style.particulars : style.unfold}
              ref={e => {
                this.otext = e
              }}
            >
              2008年5月两位胖子兄弟与螃蟹有了第一次亲密接触，仅50元左右，很快便就受到广泛追捧就受仅50元左右，很快便就受到广泛追捧就受仅50元左右，很快便就受到广泛追捧就受仅50元左右，很快便就受到广泛追捧就受仅50元左右，很快便就受到广泛追捧就受
              {open ? (
                <span
                  className={style.lookAll}
                  onClick={this.handleUnfold.bind(this)}
                >
                  <i>...</i>查看全部
                </span>
              ) : null}
            </div>
          </div>
        ) : null}

        <div className={style.contactInfo}>
          <p>联系方式</p>
          <div>联系人：王小姐</div>
          <div>
            手　机：
            <span
              onClick={() => {
                alert(111)
              }}
            >
              登录后查看
            </span>
          </div>
          <div>
            邮　箱：
            <span
              onClick={() => {
                alert(222)
              }}
            >
              登录后查看
            </span>
          </div>
          <div>
            地　址：浙江省杭州市下城区长寿路6号浙江省杭州市下城区长寿路6号浙江省杭州市下城区长寿路6号
          </div>
        </div>

        <div className={style.photoAlbum}>
          <p>企业魅力</p>
          <div className={style.photo}>
            <Carousel
              className="space-carousel"
              frameOverflow="visible"
              cellSpacing={10}
              slideWidth="340px"
              dots={false}
              afterChange={this.handleChange.bind(this)}
            >
              {this.state.data.map((val, index) => (
                <a key={index}  >
                  <img
                    src={`https://zos.alipayobjects.com/rmsportal/${val}.png`}
                    alt=""
                  />
                </a>
              ))}
            </Carousel>
            <div className={style.dots}>{current} / <span>{this.state.data.length}</span></div>
          </div>
        </div>
        
      </div>
    )
  }
}
