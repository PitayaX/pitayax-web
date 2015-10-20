import React, { Component, PropTypes as T } from 'react'

export default class LeftPanel extends Component {
  static propTypes = {
    children: T.node
  }

  render () {
    const styles = require('./LeftPanel.scss')
    return (
      <div className={styles.leftPanel}>
        {this.props.children}
      </div>
    )
  }
}
