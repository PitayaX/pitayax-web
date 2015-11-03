import React, { propTypes } from 'react'
import PostItem from './postitem'

const PostList = React.createClass({
  propTypes: {
    data: React.PropTypes.array
  },

  render () {
    const styles = require('./post.scss')

    const dataList=this.props.data
    const  postList = dataList.map(function (post, index) {
      return (
        <PostItem title={post.title} brief={post.brief} id={post.id} />
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
