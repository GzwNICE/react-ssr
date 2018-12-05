/**
 * Created by huangchao on 2018/5/2.
 */
import React,{Component} from 'react'
import {saveScrollTop} from '../../actions/PageScroll'

const PageScroll = WrappedComponent =>  {
  return class extends Component {

    state = {
      pathname: this.props.location.pathname,
    }

    onScroll = (page) => {
      if(!this.canRun) return
      this.canRun = false
      setTimeout(() => {
        console.log(page.scrollTop)
        this.scrollTop = page.scrollTop
        this.canRun = true
      }, 200)
    }

    handleSavePageScroll = (key) => {
      this.props.dispatch(saveScrollTop(this.state.pathname, this.scrollTop, key))
    }

    componentDidMount() {
      this.canRun = true
    }

    componentWillReceiveProps(nestprops) {
      let nowpathname = nestprops.location.pathname
      let lastpathname = this.props.location.pathname
      if (nowpathname !== lastpathname) {
        this.setState({
          pathname: nowpathname,
        })
      }
    }

    componentWillUnmount() {
      // this.props.dispatch(saveScrollTop(this.state.pathname, this.scrollTop, this.key))
    }

    render() {
      const props = {
        ...this.props,
        onScroll: this.onScroll,
        handleSavePageScroll: this.handleSavePageScroll,
      }
      return (
        <WrappedComponent
          {...props}
        />
      )
    }
  }
}

export default PageScroll
