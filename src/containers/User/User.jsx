import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { UserLeft, Profile, Right } from 'components'
import { loadTags, isLoaded as isTagsLoaded, selectTag }  from 'redux/modules/tag'
import { loadPosts, isLoaded as isPostsLoaded, sortPost }  from 'redux/modules/post'

const User = React.createClass({
  propTypes: {
    tag: React.PropTypes.object,
    post: React.PropTypes.object,
    selectTag: React.PropTypes.func.isRequired,
    sortPost: React.PropTypes.func.isRequired,
    loadTags: React.PropTypes.func.isRequired,
    loadPosts: React.PropTypes.func.isRequired,
    isTagsLoaded: React.PropTypes.func.isRequired,
    isPostsLoaded: React.PropTypes.func.isRequired
  },

  getDefaultProps () {
    return {
      tag: {},
      post: {}
    }
  },

  componentDidMount () {
    // get data from server
    if (!this.props.isTagsLoaded(this.props.tag)) {
      this.props.loadTags()
    }
    if (!this.props.isPostsLoaded(this.props.post)) {
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

  handleSelectTag (tagName) {

    this.props.selectTag(tagName)
  },

  handleSortPost (sortBy) {
    this.props.sortPost(sortBy)
  },

  render () {

    const styles = require('./User.scss')
    const { tag, post } = this.props
    // require the logo image both from client and server
    // const logoImage = require('./logo.png')
    return (
      <div className={styles.main} id="container">
        <div className={styles.middle} id="colmiddle">
           <UserLeft>
             <Profile />
           </UserLeft>
        </div>
        <div className={styles.right} id="colright">
          <Right tag={tag} post={post} onSelectTag={this.handleSelectTag} onSortPost={this.handleSortPost} />
        </div>
      </div>
    )
  }
})

function mapStateToProps (state) {
  return {
    tag: state.tag,
    post: state.post
  }
}
function mapDispatchToProps (dispatch) {

  return bindActionCreators ({ loadTags, loadPosts, isTagsLoaded, isPostsLoaded, selectTag, sortPost }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(User)
