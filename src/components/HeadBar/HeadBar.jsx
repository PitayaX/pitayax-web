import React, { Component, PropTypes as T } from 'react'
import { Modal } from 'common'

export default class HeadBar extends Component {
  // getInitialState () {
  //   return { loginModal: false }
  // }

  constructor (props) {
    super(props)

    this.state = {
      loginModal: false
    }
  }

  loginHandler () {
    this.setState({ loginModal: true })
  }

  componentDidMount () {
    this.myLoadHandler()
  }

  render () {
    const styles = require('./Header.scss')
    console.log(this.state.loginModal)
    // return <h3>headBar</h3>
    return ( <div ref='div1' className={styles.headBar} onLoad={this.myLoadHandler}>
              <div className={styles.headLeft}><span className={styles.headTitle}>列表</span></div>
              <div className={styles.headRight}>
                <input type="text" placeholder="搜索"/>
                <span onClick={::this.loginHandler} className={styles.headButton}><i className="fa fa-sign-in"></i>登录</span>
                <span className={styles.headButton}><i className="fa fa-user-plus"></i>注册</span>
              </div>
              <div style={{ clear: "both" }}></div>
              <Modal ref='lm' isShowed={this.state.loginModal} dimmerClassName='modal-dimmer' modalClassName='modal-dialog'>
                <div className="modal-content">

                <iframe ref='oAuth' src="http://10.10.73.28:8001/auth?response_type=code&client_id=Blog&state=xyz%20&redirect_uri=http://localhost:3000"></iframe>
                </div>
             </Modal>
            </div> )

  }

  getUrlValueByKey (oAuthUrl, key) {
    const keyIndex = oAuthUrl.indexOf(key)
    const qeualInde = oAuthUrl.indexOf('=', keyIndex)
    let nextAnd = oAuthUrl.indexOf('&', keyIndex)

    if (nextAnd<0) {
      nextAnd= oAuthUrl.length
    }
    const startPosition = qeualInde+1
    const valueLength=nextAnd-startPosition
    return oAuthUrl.substr(startPosition, valueLength)
  }

  myLoadHandler () {
    // const acode = this.props.params.code
    const div1 = this.refs.div1.getDOMNode()
    const oAuthUrl= this.refs.lm.refs.oAuth.getDOMNode().baseURI
    const code = this.getUrlValueByKey(oAuthUrl, 'code')
    const $ = require('http://cdn.bootcss.com/jquery/2.1.4/jquery.js')


    if (oAuthUrl && oAuthUrl.indexOf('code') >= 0 && oAuthUrl.indexOf('state') >= 0) {
      $.ajax({
        contentType: "application/x-www-form-urlencoded",
        url: "http://10.10.73.28:8001/token",
        type: 'POST',
        dataType: "json",
        data: {
          code,
          grant_type: "authorization_code",
          client_id: "Blog",
          redirect_uri: "http://10.10.73.45:8124"
        },
        success (data) {
          debugger
          const i=0
        }
      })
    }
  }
}
