import React, { propTypes } from 'react'

const AuthorLink =React.createClass({
  propTypes: {
    userId: React.PropTypes.string
  },
  render () {
    const LinkImage = require('../Images/weixin.png')
    return (
        <div className="link-row">
          <img src={LinkImage} alt="weixin" />
        </div>
    )
  }
})
export default AuthorLink
