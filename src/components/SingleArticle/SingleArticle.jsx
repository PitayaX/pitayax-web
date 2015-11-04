import React, { Component, PropTypes as T } from 'react'
import DuoShuo from './Duoshuo.jsx'
import Author from './Author.jsx'
import Article from './Article.jsx'
import Bottom from './Bottom.jsx'
import GoToTop from './GoToTop.jsx'
import classNames from 'classnames'


export default
class SingleArticle extends Component {

  constructor (props, context) {
    super(props, context)

    // this.state 初始化state
  }

  static propTypes ={
    states: T.object.isRequired,
    actions: T.object.isRequired
  }

  componentDidMount () {
    this.props.actions.load(this.props.params.id)
  }

  render () {

    const styles = require('./SingleArticle.scss')
    const containerPost=classNames(styles.container, styles.post)
    const mySpinner=classNames("fa", "fa-spinner", styles.myFaSpin)
    const { states } = this.props
    const { author, article } = states.data

    // debugger
    let myArticle=(
      <div className={styles.mySpinnerParent}>
        <div className={styles.mySpinner}>
          <i className={mySpinner}></i>
        </div>
      </div>
    )
    if (!states.loading) {
      myArticle = (
      <div>
        <div className={containerPost}>
          <Author author={author} />
          <Article article={article} />
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
