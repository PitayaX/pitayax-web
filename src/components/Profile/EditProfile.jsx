import React from 'react'
import { Link } from 'react-router'

const EditProfile = React.createClass({
  propTypes: {
    userId: React.PropTypes.string
  },

  render () {
    const styles=require('./Avatar.scss')
    const  { userId } = this.props
    return (
      <div className={styles['edit-row']}>
        <Link to="/user/{userId}/settings"  className={styles['edit-row-a']}>
           <span>编辑个人介绍</span>
        </Link>
      </div>
    )
  }
})
export default EditProfile
