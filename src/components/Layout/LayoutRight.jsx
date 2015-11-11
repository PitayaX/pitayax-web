import React, { propTypes } from 'react'
import TagContainer from '../Tag2/tagcontainer'
import PostContainer from '../Post/postcontainer'

const LayoutRight= React.createClass({
  propTypes: {
    tag: React.PropTypes.object,
    post: React.PropTypes.object,
    onClick: React.PropTypes.func.isRequired,
    onSortPosts: React.PropTypes.func.isRequired
  },
  
  render () {
    const { tag, post, onClick, onSortPosts }=this.props
    return (
    <div>
       <TagContainer tag={tag}  onClick={onClick} />
       <PostContainer post={post} onSortPosts={onSortPosts}  ref="postContainer"/>
    </div>
    )
  }
})
export default LayoutRight
