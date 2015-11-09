import React from 'react'
import { Link } from 'react-router'

const EditProfile = React.createClass({
  propTypes: {
    userId: React.PropTypes.string
  },

  render () {
    const styles=require('./Avatar.scss')
    return (
      <div className={styles['edit-row']}>
        <Link to="/user/settings"  className={styles['edit-row-a']}>
           <span>编辑个人介绍</span>
        </Link>
      </div>
    )
  }
})
export default EditProfile
