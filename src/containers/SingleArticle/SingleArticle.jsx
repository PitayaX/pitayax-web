import React, { Component, PropTypes } from 'react'
import Bottom from './Bottom.jsx'
import Article from './Article.jsx'

import { bindActionCreators } from 'redux'
import DocumentMeta from 'react-document-meta'
import { connect } from 'react-redux'
import * as singleArticleActions from 'redux/modules/singleArticle'
import { isLoaded, load as loadArticle } from 'redux/modules/singleArticle'

@connect(
  state => ({
    data: state.singleArticle.data,
    error: state.singleArticle.error,
    loading: state.singleArticle.loading
  }),
  dispatch => ({
    ...bindActionCreators({
      ...singleArticleActions
    }, dispatch)
  })
)

export default
class SingleArticle extends Component {
  // static needWaitting = false
  static propTypes={
    data: PropTypes.object,
    error: PropTypes.string,
    loading: PropTypes.bool,
    load: PropTypes.func.isRequired
  }
  componentDidMount () {
    this.props.load(this.props.params.id)
  }
  render () {
    const styles = require('./SingleArticle.scss')
    // debugger
    let myArticle=(
      <div >
        <div>
          <i className="fa fa-spinner fa-spin"></i>
        </div>
      </div>
    )
    if (!this.props.loading) {
      myArticle = (
      <div>
        <Article model={this.props.data} />
        <hr className={styles.bottomHr}/>
        <Bottom />
        <div className={styles.fixedBtn}>
          <a className={styles.goTop} href="#"> <i className="fa fa-angle-up"></i></a>
          <a className={styles.goTop} href="#"><i className="fa fa-qrcode"></i></a>
          <a className={styles.writer} href="#"><i className="fa fa-pencil"></i></a>
        </div>
      </div>
      )
    }
    return myArticle
  }
}
