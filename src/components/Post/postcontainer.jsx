import React, { propTypes } from 'react'
import Loading from '../Utils/loading'
import PostSort from './postsort'
import PostList from './postList'

const PostContainer = React.createClass({
  propTypes: {
    post: React.PropTypes.object.isRequired,
    onSortPosts: React.PropTypes.func.isRequired
  },

  render () {
    const styles = require('./post.scss')
    const { post, onSortPosts }=this.props
    let loading=null
    if (post.isPostFetching) {
    /* loading= <Loading className="spinner" /> */
      loading =<Loading type="spokes" />
    }
    else {
      loading=  <PostList data={post.posts} />
    }
    return (
      <div className={styles['post-container']}>
        <PostSort  onSortPosts={onSortPosts} sortTypes={post.sortTypes} />
        {loading}
      </div>
    )
  }
})
export default PostContainer
