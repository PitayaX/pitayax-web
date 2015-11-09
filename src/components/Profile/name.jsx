import React, { propTypes } from 'react'

const AuthorName =React.createClass({
  getDefaultProps () {
    return {
      "authorName": "none"
    }
  },
  propTypes: {
    authorName: React.PropTypes.string
  },
  render () {
    const styles=require('./Avatar.scss')
    return (
        <div className={styles['name-row']}>
           <span>{this.props.authorName}</span>
        </div>
    )
  }
})
export default AuthorName
