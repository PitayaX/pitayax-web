import React, { propTypes } from 'react'

const PostSort = React.createClass({
  propTypes: {
    onSort: React.PropTypes.func.isRequired,
    sortTypes: React.PropTypes.object.isRequired
  },

  handleSort (by) {
    this.props.onSort(by)
  },

  render () {
    const styles = require('./Post.scss')
    const { sortTypes } =this.props
    return (
      <div className={styles['post-sort-container']}>
        <div className={styles['post-sort-row']}>
          <ul>
            <li>
              <a href="javascript:void(null);" onClick={() => this.handleSort(sortTypes.NEW)} >
                <span>最新更新</span>
              </a>
            </li>
            <li>
              <a href="javascript:void(null);" onClick={() => this.handleSort(sortTypes.HOT)}>
                <span>热门排序</span>
              </a>
            </li>
            <li>
              <a href="javascript:void(null);" onClick={() => this.handleSort(sortTypes.WATCH)}>
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
