import React from 'react'
import { Link } from 'react-router'

const EditProfile = React.createClass({
  propTypes: {
    userId: React.PropTypes.string
  },

  render () {
    return (
      <div className="edit-row">
        <Link to="/user/settings"  className="edit-row-a">
           <span>编辑个人介绍</span>
        </Link>
      </div>
    )
  }
})
export default EditProfile
