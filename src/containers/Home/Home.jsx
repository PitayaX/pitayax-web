import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { GroupLeft, Right } from 'components'
import { loadTags, isLoaded as isTagsLoaded, selectTag }  from 'redux/modules/tag'
import { loadPosts, isLoaded as isPostsLoaded, sortPost }  from 'redux/modules/post'

const Home = React.createClass({
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

  handleSelectTag (tag) {
    this.props.selectTag(tag)
  },

  handleSortPost (sortBy) {
    this.props.sortPost(sortBy)
  },

  render () {
    const styles = require('./Home.scss')
    const { tag, post } = this.props
    // require the logo image both from client and server
    // const logoImage = require('./logo.png')
    return (
      <div className={styles.main} id="container">
        <div className={styles.middle} id="colmiddle">
           <GroupLeft>
             <img src="http://upload.jianshu.io/daily_images/images/JF4BVe82TTNqzRvsZeuF.jpg" alt="Left" />
           </GroupLeft>
        </div>
        <div className={styles.right} id="colright">
          <Right tag={tag} post={post}  onSelectTag={this.handleSelectTag} onSortPost={this.handleSortPost} />
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

export default connect(mapStateToProps, mapDispatchToProps)(Home)
