import React, { propTypes } from 'react'

const PostSort = React.createClass({
  propTypes: {
    onSortPosts: React.PropTypes.func.isRequired,
    sortTypes: React.PropTypes.object.isRequired
  },
  handleSortPosts (by) {
    this.props.onSortPosts(by)
  },

  render () {
    const styles = require('./post.scss')
    const { sortTypes } =this.props
    return (
      <div className={styles['post-sort-container']}>
        <div className={styles['post-sort-row']}>
          <ul>
            <li>
              <a href="javascript:void(null);" onClick={() => this.handleSortPosts(sortTypes.NEW)} >
                <span>最新更新</span>
              </a>
            </li>
            <li>
              <a href="javascript:void(null);" onClick={() => this.handleSortPosts(sortTypes.HOT)}>
                <span>热门排序</span>
              </a>
            </li>
            <li>
              <a href="javascript:void(null);" onClick={() => this.handleSortPosts(sortTypes.WATCH)}>
                <span>关注度排序</span>
              </a>
            </li>
          </ul>
       </div>
      </div>
    )
  }
})
export default PostSort
