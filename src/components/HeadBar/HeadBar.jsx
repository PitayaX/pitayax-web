import React, { Component, PropTypes as T } from 'react'
import { Modal } from 'common'
export default class HeadBar extends Component {
  constructor (props) {
    super(props)
    this.state = {
      loginModalShow: false,
      loginedUser: ""

    }
  }

  render () {
    const styles = require('./Header.scss')
    let loginShow = (
      <div className={styles.headRight}>
        <input type="text" placeholder="搜索"/>
        <span onClick={::this.login_Onclick} className={styles.headButton}><i className="fa fa-sign-in"></i>登录</span>
        <span className={styles.headButton}><i className="fa fa-user-plus"></i>注册</span>
      </div>)

    if (this.state.loginedUser !== "") {
      loginShow = (
        <div className={styles.headRight}>
          <input type="text" placeholder="搜索"/>
          <span className={styles.headButton}><i className="fa fa-user"></i>{this.state.loginedUser}</span>
        </div>)
    }
    return (
            <div ref='div1' className={styles.headBar}>
              <div className={styles.headLeft}><span className={styles.headTitle}>列表</span></div>
              {loginShow}
              <div style={{ clear: "both" }}></div>
              <Modal isShowed={this.state.loginModalShow} dimmerClassName='modal-dimmer' modalClassName='modal-dialog'>
                <div className="modal-content">
                  <div onClick={::this.loginClose_Onclick} style={{ float: 'right' }}><i className = "fa fa-times fa-2x"></i></div>
                  <iframe onLoad={::this.loginModal_Onload} style={{ width: '100%' }} ref='oAuth' src="http://10.10.73.28:8001/auth?response_type=code&client_id=Blog&state=xyz%20&redirect_uri=http://localhost:3000/cb/login"></iframe>
                </div>
             </Modal>
            </div> )

  }

  loginModal_Onload () {
    if (!this.refs.oAuth) {
      return
    }

    const oAuth = this.refs.oAuth.getDOMNode().contentDocument
    const oAuthUrl = oAuth.URL || oAuth.baseURI || oAuth.documentURI
    if (oAuthUrl && oAuthUrl.indexOf('code') >= 0 && oAuthUrl.indexOf('state') >= 0) {
      const userName = this.getUrlValueByKey(oAuthUrl, 'user')
      this.setState({ loginModalShow: false, loginedUser: userName })
      process.nextTick(() => global.alert("欢迎您， " +userName ))

    }
  }

  login_Onclick () {
    this.setState({ loginModalShow: true, loginedUser: "" })
  }
  loginClose_Onclick () {
    this.setState({ loginModalShow: false, loginedUser: "" })
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
