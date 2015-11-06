import React, { propTypes } from 'react'
import TagItem from './tagitem'

const Tags= React.createClass({
  propTypes: {
    tags: React.PropTypes.array.isRequired,
    selectedTags: React.PropTypes.array.isRequired,
    onClick: React.PropTypes.func.isRequired
  },

  handleClick (tag) {
    this.props.onClick(tag)
  },
  render () {
    const styles = require('./tag.scss')
    const { tags, selectedTags }=this.props

    const  TagList = tags.map(function (value) {
      const  currentTag = selectedTags.find((t) =>  t.name === value.name )
       // if have no selected yet, it will be added to selected bucket
      const tagItemClass= currentTag === undefined ? '':styles['active']
      return (
          <TagItem className={tagItemClass} tag={value} onClick={this.handleClick} />
        )
    }, this)

    return (
      <div className={styles['tag-list']}>
        <ul>
          {TagList}
        </ul>
      </div>
    )
  }
})
export default Tags
