import React, { Component, PropTypes as T } from 'react'

export default
class GoToTop extends Component {
  constructor (props, context) {
    super(props, context)
  }
  render () {
    const styles = require('./SingleArticle.scss')
    return (
      <div className={styles.fixedBtn}>
        <a className={styles.goTop} href="#"> <i className="fa fa-angle-up"></i></a>
        <a className={styles.goTop} href="#"><i className="fa fa-qrcode"></i></a>
        <a className={styles.writer} href="#"><i className="fa fa-pencil"></i></a>
      </div>
    )
  }
}
