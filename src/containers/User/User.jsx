import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import LayoutMain  from '../../components/Layout/LayoutMain'
import { load as loadTags, isLoaded as isTagLoaded, selectTag }  from 'redux/modules/tag2'
import { load as loadPosts, isLoaded as isPostLoaded, postSort }  from 'redux/modules/post'

function mapStateToProps (state) {
  return {
    tag: state.tag,
    post: state.post
  }
}
function mapDispatchToProps (dispatch) {

  return bindActionCreators ({ loadTags, loadPosts, isTagLoaded, isPostLoaded, selectTag, postSort }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(LayoutMain)
