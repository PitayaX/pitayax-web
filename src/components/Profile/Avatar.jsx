import React, { propTypes } from 'react'

const Avatar =React.createClass({
  propTypes: {
    imgUrl: React.PropTypes.string,
    authorName: React.PropTypes.string
  },
  getDefaultProps () {
    const nobody = require('../Images/none.png')
    return {
      "imgUrl": nobody,
      "authorName": "none"
    }
  },
  render () {
    const styles=require('./Avatar.scss')
    return (
      <div className={styles['avatar-row']}>
        <a className={styles['avatar-row-a']}>
            <img src={this.props.imgUrl} title={this.props.authorName} />
        </a>
      </div>
    )
  }
})
export default Avatar
