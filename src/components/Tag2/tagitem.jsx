import React, { propTypes } from 'react'

const TagItem= React.createClass({
  propTypes: {
    tagName: React.PropTypes.string.isRequired,
    tagId: React.PropTypes.number,
    tagIndex: React.PropTypes.number.isRequired,
    onClick: React.PropTypes.func,
    className: React.PropTypes.string
  },
  getInitialState () {
    return {
      className: ''
    }
  },
  handleClick () {
    this.props.onClick(this.props.tagId, this.props.tagIndex)
  },
  render () {
    const styles = require('./tag.scss')
    return (
      <li className={styles['tag-item']}>
        <a className={this.props.className} ref="thisTagItem"  href="javascript:void(null);" onClick={this.handleClick}>
          {this.props.tagName}
        </a>
      </li>
    )
  }
})
export default TagItem
