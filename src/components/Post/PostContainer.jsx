import React, { propTypes } from 'react'
import PitayaLoading from '../Utils/Loading'
import PostList from './PostList'
import PostSort from './PostSort'

const PostContainer = React.createClass({
  propTypes: {
    post: React.PropTypes.object.isRequired,
    onSortPost: React.PropTypes.func.isRequired
  },

  render () {
    const styles = require('./Post.scss')
    const { post, onSortPost }=this.props
    return (
      <div className={styles['post-container']}>
        <PostSort  onSort={onSortPost} sortTypes={post.sortTypes} selectedSort={post.sortBy} />
        <PostList posts={post.posts} />
        {post.isLoading && <PitayaLoading type="spokes" />}
      </div>
    )
  }
})
export default PostContainer
