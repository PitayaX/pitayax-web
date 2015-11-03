import React, { propTypes } from 'react'
import TagItem from './tagitem'

const TagList= React.createClass({
  propTypes: {
    tags: React.PropTypes.array.isRequired,
    selectedTags: React.PropTypes.array.isRequired,
    onClick: React.PropTypes.func.isRequired
  },

  handleClick (tagId, index) {
    this.props.onClick(tagId)
  },
  render () {
    const styles = require('./tag.scss')
    const { tags, selectedTags }=this.props

    const  TagList = tags.map(function (value, index) {
      const  currentTag = selectedTags.find((t) =>  t === value.id )
       // if have no selected yet, it will be added to selected bucket
      const tagItemClass= currentTag === undefined ? '':styles['active']
      return (
          <TagItem tagIndex={index} className={tagItemClass} tagId={value.id} tagName={value.tagName} onClick={this.handleClick} />
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
export default TagList
