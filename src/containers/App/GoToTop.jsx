import React, { Component, PropTypes as T } from 'react'

export default
class GoToTop extends Component {
  constructor (props, context) {
    super(props, context)
  }
  render () {
    const styles = require('./GoToTop.scss')
    return (
      <div className={styles.fixedBtn}>
        <a onClick = {::this.goToTop} className={styles.goTop} href="#"> <i className="fa fa-angle-up"></i></a>
        <a className={styles.goTop} href="#"><i className="fa fa-qrcode"></i></a>
        <a className={styles.writer} href="#"><i className="fa fa-pencil"></i></a>
      </div>
    )
  }
  goToTop () {
    console.log("scrollTop: " + global.document.body.scrollTop)
    console.log("global: "+global)
    global.top.scrollTo(0, 0)
  }
}
