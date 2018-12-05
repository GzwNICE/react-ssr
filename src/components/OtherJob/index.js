import React,{PureComponent} from 'react'
import style from './style.less'
import JobCard from '../JobCard'
class OtherJob extends PureComponent {
  constructor(props) {
    super(props)
    this.displayName = 'OtherJob'
  }
  render() {
    return (
      <div className={style.content}>
        <div className={style.title}>该企业其他职位</div>
        <JobCard />
        <JobCard />
      </div>
    )
  }
}

export default OtherJob
