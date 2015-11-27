import React, { Component, PropTypes as T } from 'react'

const oAuthRegUri = 'http://120.24.58.42:2001/user/createaccount?redirect_uri=http://10.10.73.16:3000'
export default
 class Register extends Component {
   constructor (props, context) {
     super(props, context)
   }
   render () {
     return (
           <iframe ref='reg' onLoad={::this.success_Onload}  style = {{ padding: '15% 0 0 32%', width: '100%', height: '100%', margin: '0', border: '0' }} src= {oAuthRegUri}></iframe>
     )
   }
   success_Onload () {
     let isdiffDomain = false
     try {
       this.refs.reg.contentDocument
     } catch (e) {
       isdiffDomain = true
     }
     if (!this.refs.reg||isdiffDomain) {
       return
     }
     global.top.location.href=this.refs.reg.src.split('redirect_uri=')[1]
   }
 }
