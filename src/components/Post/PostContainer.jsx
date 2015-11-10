import React, { propTypes } from 'react'
import Loading from '../Utils/Loading'
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
    // let newPostSection=null
    // let oldPostSection=null
    // if (post && post.posts.length>0) {
    //   oldPostSection=<PostList posts={post.posts} ref="oldPostSection" />
    // }
    // if (post.isLoading) {
    // /* loading= <Loading className="spinner" /> */
    //   newPostSection =<Loading type="spokes" />
    // }
    // else {
    //   newPostSection=  <PostList posts={post.posts} ref="newPostSection"  />
    // }
    return (
      <div className={styles['post-container']}>
        <PostSort  onSort={onSortPost} sortTypes={post.sortTypes} selectedSort={post.sortBy} />
        <PostList posts={post.posts} />
        {post.isLoading && <Loading type="spokes" />}
      </div>
    )
  }
})
export default PostContainer
