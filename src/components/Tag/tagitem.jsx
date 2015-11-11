import React, { propTypes } from 'react'

const TagItem= React.createClass({
  propTypes: {
    tag: React.PropTypes.object.isRequired,
    onClick: React.PropTypes.func,
    className: React.PropTypes.string
  },
  getInitialState () {
    return {
      className: ''
    }
  },
  handleClick () {
    this.props.onClick(this.props.tag)
  },
  render () {
    const styles = require('./tag.scss')
    return (
      <li className={styles['tag-item']}>
        <a className={this.props.className} ref="thisTagItem"  href="javascript:void(null);" onClick={this.handleClick}>
          {this.props.tag.name}
        </a>
      </li>
    )
  }
})
export default TagItem
