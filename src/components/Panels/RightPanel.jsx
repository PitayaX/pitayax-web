import React, { Component, PropTypes as T } from 'react'

export default class RightPanel extends Component {
  static propTypes = {
    children: T.node
  }

  render () {
    const styles = require('./RightPanel.scss')
    return (
      <div className={styles.rightPanel}>
        {this.props.children}
      </div>
    )
  }
}
