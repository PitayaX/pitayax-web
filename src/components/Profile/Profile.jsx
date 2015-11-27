import React, { propTypes } from 'react'
import Avatar from './Avatar'
import AuthorName from './Name'
import EditProfile from './EditProfile'
import AuthorStatistic from './Statistic'
import AuthorLink from './Link'

const Profile =React.createClass({
  propTypes: {
    Logged: React.PropTypes.bool,
    author: React.PropTypes.object,
    userId: React.PropTypes.string,
    userAvatarUrl: React.PropTypes.string,
    userName: React.PropTypes.string
  },
  getDefaultProps () {
    return {
      Logged: false,
      author: {},
      userId: "20151124184210138",
      userName: "yemol"
    }
  },

  render () {
    const styles=require('./Avatar.scss')
    const { Logged, userId, userName, userAvatarUrl } = this.props
    const avatarUrl= userAvatarUrl ?userAvatarUrl: require('../Images/yemol.png')

    return (
      <div className={styles['profile-container']}>
        <div className={styles['profile-row-avatar']}>
          <Avatar imgUrl={avatarUrl} authorName={userName} />
        </div>
        <div className={styles['profile-row-name']}>
          <AuthorName  authorName={userName} />
        </div>
        {Logged} &&
        <div className={styles['profile-row-edit']}>
          <EditProfile  userId={userId} />
        </div>
        <div className={styles['profile-row-link']}>
          <AuthorLink userId={userId} />
        </div>
        <div className={styles['profile-row-statistic']}>
          <AuthorStatistic userId={userId} />
        </div>
      </div>
    )
  }
})
export default Profile
