import React, { propTypes } from 'react'

const AuthorLink =React.createClass({
  propTypes: {
    userId: React.PropTypes.string
  },
  render () {
    const styles=require('./Avatar.scss')
    const LinkImage = require('../Images/weixin.png')
    return (
        <div className={styles['ink-row']}>
          <img src={LinkImage} alt="weixin" />
        </div>
    )
  }
})
export default AuthorLink
