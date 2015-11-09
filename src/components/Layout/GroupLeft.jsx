import React, { Component, PropTypes as T } from 'react'

export default class GroupLeft extends Component {
  static propTypes = {
    children: T.node
  }

  render () {
    const styles = require('./GroupLeft.scss')
    return (
      <div className={styles.leftPanel}>
        {this.props.children}
      </div>
    )
  }
}
