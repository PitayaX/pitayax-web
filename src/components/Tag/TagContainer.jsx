import React, { propTypes } from 'react'
import Loading from '../Utils/Loading'
import TagList from './TagList'

const TagContainer= React.createClass({
  propTypes: {
    tag: React.PropTypes.object.isRequired,
    onSelectTag: React.PropTypes.func.isRequired
  },

  render () {
    const styles = require('./Tag.scss')
    const { tag, onSelectTag }=this.props
    let loading=null
    if (tag.isLoading) {
      // loading= <Loading className="spinner" />
      // loading= "loading......"
      loading =<Loading type="spokes" />
    }
    else {
      loading=  <TagList tags={tag.tags} selectedTags={tag.selectedTags} onSelectTag={onSelectTag} />
    }
    return (
      <div className={styles['tag-container']}>
        {loading}
      </div>
    )
  }
})
export default TagContainer
