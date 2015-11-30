import React, { propTypes } from 'react'
import EditProfile from './EditProfile'
import AuthorStatistic from './Statistic'

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
    const styles=require('./Profile.scss')
    const LinkImage = require('../Images/weixin.png')
    const { Logged, userId } = this.props
    const { nick, avatarFileUrl } = this.props.author
    const avatarUrl= avatarFileUrl ?avatarFileUrl: require('../Images/yemol.png')

    return (
      <div className={styles['profile-container']}>
        <div className={styles['profile-row-avatar']}>
          <div className={styles['avatar-row']}>
            <a className={styles['avatar-row-a']}>
              <img src={avatarUrl} title={nick} />
            </a>
          </div>
        </div>
        <div className={styles['profile-row-name']}>
          <div className={styles['name-row']}>
             <span>{nick}</span>
          </div>
        </div>
        {Logged &&
        <div className={styles['profile-row-edit']}>
          <EditProfile  userId={userId} />
        </div>}
        <div className={styles['profile-row-link']}>
          <div className={styles['ink-row']}>
            <img src={LinkImage} alt="weixin" />
          </div>
        </div>
        <div className={styles['profile-row-statistic']}>
          <AuthorStatistic userId={userId} />
        </div>
      </div>
    )
  }
})
export default Profile
