import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { PostDetail } from 'components'
import { loadPost, isLoaded as isPostLoaded }  from 'redux/modules/post'

function mapStateToProps (state) {
  return {
    post: state.post
  }
}

function mapDispatchToProps (dispatch) {

  return bindActionCreators({ loadPost, isPostLoaded }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(PostDetail)
