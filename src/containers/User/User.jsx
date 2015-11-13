import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { ScrollPanel } from 'pitaya-components'
import { UserLeft, Profile, Right } from 'components'
import { loadTags, isLoaded as isTagsLoaded, selectTag, dispose as disposeTag }  from 'redux/modules/tag'
import { loadPosts, isLoaded as isPostsLoaded, isLoading as isPostsLoading, sortPost, dispose as disposePost }  from 'redux/modules/post'

const User = React.createClass({
  propTypes: {
    tag: React.PropTypes.object,
    post: React.PropTypes.object,
    selectTag: React.PropTypes.func.isRequired,
    sortPost: React.PropTypes.func.isRequired,
    loadTags: React.PropTypes.func.isRequired,
    loadPosts: React.PropTypes.func.isRequired,
    isTagsLoaded: React.PropTypes.func.isRequired,
    isPostsLoaded: React.PropTypes.func.isRequired,
    isPostsLoading: React.PropTypes.func.isRequired,
    disposePost: React.PropTypes.func.isRequired,
    disposeTag: React.PropTypes.func.isRequired,
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
      this.props.loadPosts(this.props.tag.selectedTags, this.props.post.sortBy)
    }
  },

  componentWillReceiveProps (nextProps) {
    const { tag, post } = nextProps
    if (tag.selectedTags &&  tag.selectedTags.length !== this.props.tag.selectedTags.length) {
      this.props.loadPosts(tag.selectedTags, post.sortBy)
    }
    if (post.sortBy !== this.props.post.sortBy) {
      this.props.post
    }
  },
  componentWillUnmount () {

    this.props.disposePost()
    this.props.disposeTag()
  },

  handleSelectTag (tagName) {

    this.props.selectTag(tagName)
  },

  handleSortPost (sortBy) {
    this.props.sortPost(sortBy)
    this.props.loadPosts(this.props.tag.selectedTags, sortBy)
  },

  handleScrollBottom () {
    /* quary pattern*/

    /* if post is loding data from api when scroll to bottom, it will stop to send data request again*/
    if (!this.props.isPostsLoading(this.props.post)) {
      this.props.loadPosts(this.props.tag.selectedTags, this.props.post.sortBy)
    }
  },

  handleScrollTop () {
    console.log("scroll top")

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
          <ScrollPanel className={styles.scrollpanel} scrollTopAfterUpdate={false} onScrollBottom={this.handleScrollBottom} onScrollTop={this.handleScrollTop}>
            <Right tag={tag} post={post} onSelectTag={this.handleSelectTag} onSortPost={this.handleSortPost} />
          </ScrollPanel>
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

  return bindActionCreators ({ loadTags, loadPosts, isTagsLoaded, isPostsLoaded, isPostsLoading, selectTag, sortPost, disposePost, disposeTag }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(User)
