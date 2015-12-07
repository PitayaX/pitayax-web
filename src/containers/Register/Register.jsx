import React, { Component, PropTypes as T } from 'react'
import config from '../../config'


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
 }
