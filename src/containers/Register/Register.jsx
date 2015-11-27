import React, { Component, PropTypes as T } from 'react'
import config from '../../config'

// const oAuthRegUri = 'http://120.24.58.42:2001/user/createaccount?redirect_uri=http://10.10.73.16:3000'

const oAuthRegUri = config.oAuthServer + '/user/createaccount?redirect_uri=' + config.oAuthRegRedirectUrl

export default
 class Register extends Component {
   constructor (props, context) {
     super(props, context)
   }
   render () {
     return (
           <iframe ref='reg' style = {{ padding: '15% 0 0 32%', width: '100%', height: '100%', margin: '0', border: '0' }} src= {oAuthRegUri}></iframe>
     )
   }
<<<<<<< HEAD
   success_Onload () {
     let isdiffDomain = false
     try {
       this.refs.reg.contentDocument
     } catch (e) {
       isdiffDomain = true
     }
     if (!isdiffDomain) {
       return
     }
     global.top.location.href=this.refs.reg.src.split('redirect_uri=')[1]
   }
=======
>>>>>>> 1b51afd4d2aba0ebc858235f2a760701be2872e9
 }
