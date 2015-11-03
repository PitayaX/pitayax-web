import React from 'react'

const EditProfile = React.createClass({
  propTypes: {
    userId: React.PropTypes.string
  },

  render () {
    return (
      <div className="edit-row">
        <a href="#" className="edit-row-a">
           <span>编辑个人介绍</span>
        </a>
      </div>
    )
  }
})
export default EditProfile
