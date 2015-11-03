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
    return (
        <div className="name-row">
           <span>{this.props.authorName}</span>
        </div>
    )
  }
})
export default AuthorName
