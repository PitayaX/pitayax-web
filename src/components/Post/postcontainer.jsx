import React, { propTypes } from 'react'
import Loading from '../Utils/loading'
import PostList from './PostList'
import PostSort from './PostSort'

const PostContainer = React.createClass({
  propTypes: {
    post: React.PropTypes.object.isRequired,
    onSortPost: React.PropTypes.func.isRequired
  },

  render () {
    const styles = require('./post.scss')
    const { post, onSortPost }=this.props
    let loading=null
    if (post.isLoading) {
    /* loading= <Loading className="spinner" /> */
      loading =<Loading type="spokes" />
    }
    else {
      loading=  <PostList posts={post.posts} />
    }
    return (
      <div className={styles['post-container']}>
        <PostSort  onSort={onSortPost} sortTypes={post.sortTypes} />
        {loading}
      </div>
    )
  }
})
export default PostContainer
