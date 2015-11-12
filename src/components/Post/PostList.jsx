import React, { propTypes } from 'react'
import PostItem from './PostItem'

const PostList = React.createClass({
  propTypes: {
    posts: React.PropTypes.array.isRequired
  },

  render () {
    const styles = require('./Post.scss')

    const dataList=this.props.posts
    const  postList = dataList.map(function (p, i) {
      return (
        <PostItem post={p} />
      )
    })
    return (
      <div className={styles['post-list-container']}>
        <ul>
          {postList}
        </ul>
      </div>
    )
  }
})
export default PostList