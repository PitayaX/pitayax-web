import React, { propTypes } from 'react'

const AuthorStatistic =React.createClass({
  propTypes: {
    userId: React.PropTypes.string
  },
  render () {
    const styles=require('./Statistic.scss')
    return (
        <div className={styles['statistic-row']}>
          <ul>
            <li><a><b>100</b><span>关注</span></a></li>
            <li><a><b>100</b><span>粉丝</span></a></li>
            <br/>
            <li><a><b>100</b><span>文章</span></a></li>
            <li><a><b>100</b><span>数字</span></a></li>
            <li><a><b>100</b><span>收获喜欢</span></a></li>
          </ul>
        </div>
    )
  }
})
export default AuthorStatistic
