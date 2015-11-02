import React, { Component, PropTypes as T } from 'react'
import { Modal } from 'common'
export default class HeadBar extends Component {
  constructor (props) {
    super(props)
    this.state = {
      loginModalShow: false
    }
  }

  render () {
    const styles = require('./Header.scss')
    return (
            <div ref='div1' className={styles.headBar}>
              <div className={styles.headLeft}><span className={styles.headTitle}>列表</span></div>
              <div className={styles.headRight}>
                <input type="text" placeholder="搜索"/>
                <span onClick={::this.login_Onclick} className={styles.headButton}><i className="fa fa-sign-in"></i>登录</span>
                <span className={styles.headButton}><i className="fa fa-user-plus"></i>注册</span>
              </div>
              <div style={{ clear: "both" }}></div>
              <Modal isShowed={this.state.loginModalShow} dimmerClassName='modal-dimmer' modalClassName='modal-dialog'>
                <div className="modal-content">
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
      global.alert("恭喜您，登录成功！！！")
      this.setState({ loginModalShow: false })
    }
  }

  login_Onclick () {
    this.setState({ loginModalShow: true })
  }

}
