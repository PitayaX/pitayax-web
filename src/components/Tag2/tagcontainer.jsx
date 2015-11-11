import React, { propTypes } from 'react'
import Loading from '../Utils/loading'
import TagList from './taglist'

const TagContainer= React.createClass({
  propTypes: {
    tag: React.PropTypes.object.isRequired,
    onClick: React.PropTypes.func.isRequired
  },

  handleClick (tagId) {
    this.props.onClick(tagId)
  },

  render () {
    const styles = require('./tag.scss')
    const { tag, onClick }=this.props
    let loading=null
    if (tag.isLoading) {
      // loading= <Loading className="spinner" />
      // loading= "loading......"
      loading =<Loading type="spokes" />
    }
    else {
      loading=  <TagList tags={tag.tags} selectedTags={tag.selectedTags} onClick={onClick} />
    }
    return (
      <div className={styles['tag-container']}>
        {loading}
      </div>
    )
  }
})
export default TagContainer
