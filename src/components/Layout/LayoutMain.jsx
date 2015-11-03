import React from 'react'
import LayoutMiddle from './LayoutMiddle'
import LayoutRight from './LayoutRight'
import Profile from '../Profile/Profile'

const LayoutMain = React.createClass({
  propTypes: {
    tag: React.PropTypes.object,
    post: React.PropTypes.object,
    selectTag: React.PropTypes.func.isRequired,
    postSort: React.PropTypes.func.isRequired,
    loadTags: React.PropTypes.func.isRequired,
    loadPosts: React.PropTypes.func.isRequired,
    isTagLoaded: React.PropTypes.func.isRequired,
    isPostLoaded: React.PropTypes.func.isRequired
  },

  getDefaultProps () {
    return {
      tag: {},
      post: {}
    }
  },

  componentDidMount () {
    // get data from server

    if (!this.props.isTagLoaded(this.props.tag)) {
      this.props.loadTags()
    }
    if (!this.props.isPostLoaded(this.props.post)) {
      this.props.loadPosts()
    }
  },

  componentWillReceiveProps (nextProps) {
    const { tag, post } = nextProps
    if (tag.selectedTags &&  tag.selectedTags.length !== this.props.tag.selectedTags.length) {
      this.props.loadPosts()
    }
    if (post.sortBy !== this.props.post.sortBy) {
      this.props.post
    }
  },

  handleSelectTag (selectId) {
    this.props.selectTag(selectId)
  },

  handlePostSort (sortby) {
    this.props.postSort(sortby)
  },

  render () {
    const styles = require('./layout.scss')
    const { tag, post } =this.props
    return (
      <div className={styles.main} id="container">
        <div className={styles.middle} id="colmiddle">
          <LayoutMiddle>
            <Profile />
          </LayoutMiddle>
        </div>
        <div className={styles.right} id="colright">
          <LayoutRight tag={tag} post={post} onClick={this.handleSelectTag} onSortPosts={this.handlePostSort} />
        </div>
      </div>
    )
  }
})
export default LayoutMain
