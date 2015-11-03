import React, { propTypes } from 'react'
import Avatar from './avatar'
import AuthorName from './name'
import EditProfile from './editprofile'
import AuthorStatistic from './statistic'
import AuthorLink from './link'

const Profile =React.createClass({
  render () {
    const styles=require('./avatar.scss')
    const avatarUrl = require('../Images/yemol.png')
    return (
      <div className={styles['profile-container']}>
        <div className={styles['profile-row-avatar']}>
          <Avatar imgUrl={avatarUrl} authorName="yemol" />
        </div>
        <div className={styles['profile-row-name']}>
          <AuthorName  authorName="yemol"/>
        </div>
        <div className={styles['profile-row-edit']}>
          <EditProfile  userId="1" />
        </div>
        <div className={styles['profile-row-link']}>
          <AuthorLink userId="1" />
        </div>
        <div className={styles['profile-row-statistic']}>
          <AuthorStatistic userId="1" />
        </div>
      </div>
    )
  }
})
export default Profile
