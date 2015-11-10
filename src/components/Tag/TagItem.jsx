import React, { propTypes } from 'react'

const TagItem= React.createClass({
  propTypes: {
    tag: React.PropTypes.object.isRequired,
    onSelect: React.PropTypes.func,
    className: React.PropTypes.string
  },
  getInitialState () {
    return {
      className: ''
    }
  },

  handleSelect () {
    this.props.onSelect(this.props.tag.name)
  },
  render () {
    const styles = require('./Tag.scss')
    return (
      <li className={styles['tag-item']}>
        <a className={this.props.className} ref="thisTagItem"  href="javascript:void(null);" onClick={this.handleSelect}>
          {this.props.tag.name}
        </a>
      </li>
    )
  }
})
export default TagItem
