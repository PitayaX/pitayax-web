import React, { Component, PropTypes as T } from 'react'
import DuoShuo from './Duoshuo.jsx'
import Author from './Author.jsx'
import Content from './Content.jsx'
import Bottom from './Bottom.jsx'
import classNames from 'classnames'


export default class PostDetail extends Component {

  constructor (props, context) {
    super(props, context)

    // this.state 初始化state
  }

  static propTypes ={
    post: T.object.isRequired,
    loadPost: T.func.isRequired,
    disposePost: T.func.isRequired,
    params: T.string 
  }

  componentDidMount () {
    this.props.loadPost(this.props.params.id)
    global.document.body.style.overflow='auto'
  }

  componentWillUnmount () {

    this.props.disposePost()

  }

  render () {

    const styles = require('./PostDetail.scss')
    const containerPost=classNames(styles.container, styles.post)
    const mySpinner=classNames("fa", "fa-spinner", styles.myFaSpin)
    const post = this.props.post

    // debugger
    let myArticle=(
      <div className={styles.mySpinnerParent}>
        <div className={styles.mySpinner}>
          <i className={mySpinner}></i>
        </div>
      </div>
    )
    if (post.isLoaded) {
      const currentPost = post.post
      myArticle = (
      <div>
        <div className={containerPost}>
          {/* currentPost.author&&<Author author={currentPost.author} /> */}
          <Content post={currentPost} />
          {currentPost.comments&&<DuoShuo {...currentPost.comments} />}
        </div>
        <Bottom />
      </div>
      )
    }
    return myArticle
  }
}
