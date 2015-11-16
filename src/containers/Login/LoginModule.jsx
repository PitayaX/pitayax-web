import React, { Component, PropTypes as T } from 'react'
import { Modal } from 'common'
import { json as request } from 'lgutil/common/ajax'
import config from '../../config'
import { Link } from 'react-router'

const oAuthLoginUri = config.oAuthServer + '/auth?response_type=code&client_id=pitayax-web&state=xyz%20&redirect_uri=' + config.oAuthRedirectUrl

export default
class LoginModule extends Component {
  constructor (props, context) {
    super(props, context)
    this.state = {
      loginModalShow: false,
      nickName: "",
      userID: ""

    }
  }
  render () {
    const styles = require('./LoginModule.scss')
    let loginShow = (
      <div className={styles.loginContent}>
        <span onClick={::this.login_Onclick} ><i className="fa fa-sign-in"></i>登录</span>
        <span><i className="fa fa-user-plus"></i>注册</span>
      </div>
    )
    if (this.state.nickName !== "" && this.state.userID !== "") {
      const userRoute='/user/' + this.state.userID
      loginShow = (
        <div className={styles.loginContent}>
          <span><Link to={userRoute}><i className="fa fa-user"></i>{this.state.nickName}</Link></span>
          <span onClick={::this.logout_Onclick}><i className="fa fa-sign-out"></i>登出</span>
        </div>
      )
    }
    return (
      <div style= {{ float: 'right', margin: '1em 2em 0 0' }}>
        {loginShow}
        <Modal isShowed={this.state.loginModalShow} dimmerClassName='modal-dimmer' modalClassName='modal-dialog'>
          <div style={{ height: '13em' }} className='modal-content'>
            <div onClick={::this.loginClose_Onclick} style={{ color: 'white', position: 'relative', top: '-0.7em', right: '1.3em', float: 'right', height: '0', width: '0' }}>
              <div style={{ backgroundColor: 'black', width: '1em', height: '1em', position: 'absolute', top: '0.5em', left: '0.35em' }}>
              </div>
              <div style={{ position: 'absolute' }}>
              <i className = "fa fa-times-circle fa-2x"></i>
              </div>
            </div>
            <div style = {{ width: '100%', height: '100%' }}>
              <iframe style = {{ borderRadius: '0.5em', width: '100%', height: '100%', margin: '0', padding: '0', border: '0' }} onLoad={::this.loginModal_Onload}  ref='oAuth' src={oAuthLoginUri}></iframe>
            </div>
          </div>
       </Modal>
      </div>
    )

  }

  componentDidMount () {
    this.setState({ ...this.state, nickName: localStorage.getItem("nickName") || "", userID: localStorage.getItem("userID") })
  }

  loginModal_Onload () {
    let isdiffDomain = false
    try {
      this.refs.oAuth.contentDocument
    } catch (e) {
      isdiffDomain = true
    }
    if (!this.refs.oAuth||isdiffDomain) {
      return
    }
    const oAuth = this.refs.oAuth.contentDocument
    const oAuthUrl = oAuth.URL || oAuth.baseURI || oAuth.documentURI
    if (oAuthUrl && oAuthUrl.indexOf('code') >= 0 && oAuthUrl.indexOf('state') >= 0) {
      const userName = this.getUrlValueByKey(oAuthUrl, 'nickname')
      const userID = this.getUrlValueByKey(oAuthUrl, 'userid')
      this.setState({ loginModalShow: false, nickName: userName, userID })
      localStorage.setItem("nickName", userName)
      localStorage.setItem("userID", userID)
      process.nextTick(() => global.alert("欢迎您， " +userName ))

    }
  }



  logout_Onclick () {
    localStorage.setItem("nickName", "")
    localStorage.setItem("nickName", "")
    this.setState({ loginModalShow: false, nickName: "", userID: "" })
    global.refreshToken = arg => {}

  }

  login_Onclick () {
    this.setState({ loginModalShow: true, nickName: "", userID: "" })
    global.refreshToken = function (_interval) {
      setTimeout(
        function () {
          request.post("/cb/refresh", {}, {}, {
            timeout: 20000
          })
          .then(function (data) {
            eval(data.body)
          })
          .catch(function (e) {
            console.log(e)
          })
        }, _interval)
    }
  }

  loginClose_Onclick () {
    this.setState({ loginModalShow: false, nickName: "", userID: "" })
  }

  getUrlValueByKey (url, key) {
    const keyIndex=url.indexOf(key)
    if (keyIndex < 0) {
      return null
    }
    const qeualInde=url.indexOf('=', keyIndex)
    let nextAnd=url.indexOf('&', keyIndex)
    if ( nextAnd < 0) {
      nextAnd=url.length
    }
    const startPosition=qeualInde+1
    const valueLength=nextAnd-startPosition
    return url.substr(startPosition, valueLength)
  }
}




global.refreshToken = function (_interval) {
  setTimeout(
    function () {
      request.post("/cb/refresh", {}, {}, {
        timeout: 20000
      })
      .then(function (data) {
        eval(data.body)
      })
      .catch(function (e) {
        console.log(e)
      })
    }, _interval)
}
