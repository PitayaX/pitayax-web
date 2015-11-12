import React, { PropTypes } from 'react'
import TagItem  from './TagItem'

const TagList= React.createClass({
  propTypes: {
    tags: React.PropTypes.array.isRequired,
    selectedTags: React.PropTypes.array.isRequired,
    onSelectTag: React.PropTypes.func.isRequired
  },

  render () {
    const styles = require('./Tag.scss')
    const { tags, selectedTags, onSelectTag }=this.props

    const  TagList = tags.map(function (tag, index) {
      const  currentTag = selectedTags.find((t) =>  t=== tag.name )
       // if have no selected yet, it will be added to selected bucket
      const tagItemClass= currentTag === undefined ? '':styles['active']
      return (
        <TagItem className={tagItemClass} onSelect={onSelectTag} tag={tag} />
      )},
      this)

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
