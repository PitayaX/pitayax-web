import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import SingleArticle from '../../components/SingleArticle/SingleArticle'
import * as singleArticleActions from 'redux/modules/singleArticle'
function mapStateToProps (state) {
  return {
    states: state.singleArticle
  }
}

function mapDispatchToProps (dispatch) {
  return {
    actions: bindActionCreators({ ...singleArticleActions }, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SingleArticle)
