import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { CounterButton, GithubButton, LeftPanel, Content } from 'components'
import { isLoaded, load as loadTag } from 'redux/modules/tag'
import * as tagActions from 'redux/modules/tag'
import { isArticalesLoaded, list as queryArticales } from 'redux/modules/articales'
import { loadTags, isLoaded as isTagsLoaded, selectTags }  from 'redux/modules/tag2'
import { loadPosts, isLoaded as isPostsLoaded, postSort }  from 'redux/modules/post'

// TODO: Change to post reducer
// @connect(state => ({
//   sorts: state.sorts.data,
//   tags: state.tags.data,
//   tagError: state.tags.error,
//   articales: state.articales.data,
//   articaleError: state.articales.error,
//   articaleLoading: state.articales.loading,
//   currentTag: state.articales.tag,
//   currentSort: state.articales.sort
// }),
// dispatch => {
//   return ({
//     ...bindActionCreators({
//       ...tagActions
//     }, dispatch)
//   , dispatch })})



export  class Home extends Component {
  static propTypes = {
    tag: React.PropTypes.object,
    post: React.PropTypes.object,
    selectTags: React.PropTypes.func.isRequired,
    postSort: React.PropTypes.func.isRequired,
    loadTags: React.PropTypes.func.isRequired,
    loadPosts: React.PropTypes.func.isRequired,
    isTagsLoaded: React.PropTypes.func.isRequired,
    isPostsLoaded: React.PropTypes.func.isRequired
  }
  // TODO: Move logic to componentDidMount
  //
  // static fetchDataDeferred (getState, dispatch) {
  //   if (!isLoaded(getState())) {
  //     return dispatch(loadTag())
  //   }
  //
  //   if (!isArticalesLoaded(getState())) {
  //     return dispatch(queryArticales())
  //   }
  //
  //   return dispatch(loadSorts())
  // }

componentDidMount () {
  // get data from server
  if (!this.props.isTagsLoaded(this.props.tag)) {
    this.props.loadTags()
  }
  if (!this.props.isPostsLoaded(this.props.post)) {
    this.props.loadPosts()
  }
}

  render () {

    const styles = require('./Home.scss')
    const { tag, post, ...others } = this.props

    const sorts = [
      { name: "最近更新", _id: 0, code: "NEW" },
      { name: "热门排名", _id: 1, code: "HOT" },
      { name: "关注度排名", _id: 2, code: "LIKE" }
    ]
    // require the logo image both from client and server
    // const logoImage = require('./logo.png')
    return (
      <div className={styles.home}>
        <LeftPanel><h3>Left Panel</h3></LeftPanel>

        <Content tagsData={tag.tags}
          selectedTags={tag.selectedTags}
          sortsData={sorts}
          articalesData={post.posts}
          tagHandler={this.props.selectTags}
          sortHanlder={this.props.postSort} />
    </div>
    )
  }
}

function mapStateToProps (state) {
  return {
    tag: state.tag,
    post: state.post
  }
}
function mapDispatchToProps (dispatch) {

  return bindActionCreators ({ loadTags, loadPosts, isTagsLoaded, isPostsLoaded, selectTags, postSort }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)
