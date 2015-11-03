import React, { propTypes } from 'react'
import Profile from '../Profile/Profile'

const LayoutMiddle= React.createClass({
  propTypes: {
    children: React.PropTypes.instanceOf(Profile)
  },
  render () {
    return (
      <div>
          {this.props.children}
      </div>
    )
  }
})
export default LayoutMiddle
