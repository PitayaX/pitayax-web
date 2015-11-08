import React, { Component, PropTypes as T } from 'react'
import DuoShuo from './Duoshuo.jsx'
import Author from './Author.jsx'
import Content from './Content.jsx'
import Bottom from './Bottom.jsx'
import GoToTop from './GoToTop.jsx'
import classNames from 'classnames'


export default class PostDetail extends Component {

  constructor (props, context) {
    super(props, context)

    // this.state 初始化state
  }

  static propTypes ={
    post: T.object.isRequired,
    loadPost: T.func.isRequired
  }

  componentDidMount () {
    this.props.loadPost(this.props.params.id)
  }

  render () {

    const styles = require('./PostDetail.scss')
    const containerPost=classNames(styles.container, styles.post)
    const mySpinner=classNames("fa", "fa-spinner", styles.myFaSpin)
    const { post } = this.props

    // debugger
    let myArticle=(
      <div className={styles.mySpinnerParent}>
        <div className={styles.mySpinner}>
          <i className={mySpinner}></i>
        </div>
      </div>
    )
    if (post.isLoaded) {
      const { author, article } = post.post
      myArticle = (
      <div>
        <div className={containerPost}>
          <Author author={author} />
          <Content post={article} />
          <DuoShuo {...article.comments} />
        </div>
        <Bottom />
        <GoToTop />
      </div>
      )
    }
    return myArticle
  }
}
