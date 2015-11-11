import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import LayoutMain  from '../../components/Layout/LayoutMain'
import { loadTags, isLoaded as isTagsLoaded, selectTags }  from 'redux/modules/tag2'
import { loadPosts, isLoaded as isPostsLoaded, postSort }  from 'redux/modules/post'

function mapStateToProps (state) {
  return {
    tag: state.tag,
    post: state.post
  }
}
function mapDispatchToProps (dispatch) {

  return bindActionCreators ({ loadTags, loadPosts, isTagsLoaded, isPostsLoaded, selectTags, postSort }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(LayoutMain)
