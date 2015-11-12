import React, { propTypes } from 'react'
import PitayaLoading from '../Utils/Loading'
import TagList from './TagList'

const TagContainer= React.createClass({
  propTypes: {
    tag: React.PropTypes.object.isRequired,
    onSelectTag: React.PropTypes.func.isRequired
  },

  render () {
    const styles = require('./Tag.scss')
    const { tag, onSelectTag }=this.props
    return (
      <div className={styles['tag-container']}>
        <TagList tags={tag.tags} selectedTags={tag.selectedTags} onSelectTag={onSelectTag} />
        {tag.isLoading && <PitayaLoading type="spokes" />}
      </div>
    )
  }
})
export default TagContainer
