import React, { Component, PropTypes as T } from 'react'
import { Link } from 'react-router'

export default
 class LoginBar extends Component {

   constructor (props, context) {

     super(props, context)

   }
   render () {

     const { isLogined, nickName, userId, openLoginModal, logoutClick } = this.props
     const styles = require('./LoginModule.scss')



     let loginShow = (
       <div className={styles.loginContent}>
         <span onClick={(e) => openLoginModal(e)} ><i className="fa fa-sign-in"></i>登录</span>
         <span><Link to='/reg'><i className="fa fa-user-plus"></i>注册</Link></span>
       </div>
     )

     if (isLogined) {
       const userRoute='/user/' + userId
       loginShow = (
         <div className={styles.loginContent}>
           <span><Link to={userRoute}><i className="fa fa-user"></i>{nickName}</Link></span>
           <span onClick={(e) => logoutClick(e)}><i className="fa fa-sign-out"></i>登出</span>
         </div>
       )
     }

     return loginShow
   }
 }


LoginBar.propTypes = {
  isLogined: T.bool.isRequired,
  nickName: T.string.isRequired,
  userId: T.string.isRequired,
  openLoginModal: T.func.isRequired,
  logoutClick: T.func.isRequired
}
