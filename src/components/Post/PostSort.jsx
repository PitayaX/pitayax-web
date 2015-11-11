import React, { propTypes } from 'react'

const PostSort = React.createClass({
  propTypes: {
    onSort: React.PropTypes.func.isRequired,
    sortTypes: React.PropTypes.array.isRequired,
    selectedSort: React.PropTypes.string
  },

  handleSort (by) {
    this.props.onSort(by)
  },

  render () {
    const styles = require('./Post.scss')
    const { sortTypes } =this.props
    const sorts = sortTypes.map((sort) => {
      return (
        <li>
          <a href="javascript:void(null);" className={this.props.selectedSort===sort.type? styles['post-sort-selected']:""} onClick={() => this.handleSort(sort.type)} >
            <span>{sort.name}</span>
          </a>
        </li>
      )
    })

    return (
      <div className={styles['post-sort-container']}>
        <div className={styles['post-sort-row']}>
          <ul>
            {sorts}
          </ul>
       </div>
      </div>
    )
  }
})
export default PostSort
