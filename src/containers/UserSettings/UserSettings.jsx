import React, { Component, PropTypes } from 'react'

export default class UserSettings extends Component {
  render () {
    const styles = require('./UserSettings.scss')
    return (
      <div className={styles['settings-main']}>
        <div className={styles['settings-title']}>
           <h2><i className="fa fa-cogs"></i>设置</h2>
        </div>
        <div className={styles['settings-body']}>
          <p><i className="icon-cogs icon-large"></i></p>
        </div>
      </div>
    )
  }
}
