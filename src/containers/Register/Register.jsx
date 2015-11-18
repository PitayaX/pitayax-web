import React, { Component, PropTypes as T } from 'react'

const oAuthRegUri = 'http://120.24.58.42:2001/user/createaccount?redirect_uri=http://10.10.73.4:3000'
export default
 class Register extends Component {
   constructor (props, context) {
     super(props, context)
   }
   render () {
     return (
           <iframe  style = {{ padding: '15% 0 0 32%', width: '100%', height: '100%', margin: '0', border: '0' }} src= {oAuthRegUri}></iframe>
     )
   }
 }
