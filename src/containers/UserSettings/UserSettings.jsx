import React, { Component, PropTypes } from 'react'

export default class UserSettings extends Component {
  render () {
    return (
      <div className="settings-main">
        <div className="settings-title">
           <p><i className="fa fa-cogs fa-3x"></i>设置</p>
        </div>
        <div className="settings-body">
          <p><i className="icon-cogs icon-large"></i> <h1>设置</h1></p>
        </div>
      </div>
    )
  }
}
