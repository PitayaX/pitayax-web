import React, { Component } from 'react'
import TagContainer from '../Tag/TagContainer'
import PostContainer from '../Post/PostContainer'
import HeadBar from '../HeadBar/HeadBar'

const  Right = React.createClass({
  propTypes: {
    tag: React.PropTypes.object.isRequired,
    post: React.PropTypes.object.isRequired,
    onSelectTag: React.PropTypes.func.isRequired,
    onSortPost: React.PropTypes.func.isRequired
  },
  render () {
    const { tag, post, onSelectTag, onSortPost } = this.props
    return (
      <div>
        <HeadBar/>
        <TagContainer tag={tag}  onSelectTag={onSelectTag} />
        <PostContainer post={post} onSortPost={onSortPost} />
      </div>
    )
  }
})
export default Right
