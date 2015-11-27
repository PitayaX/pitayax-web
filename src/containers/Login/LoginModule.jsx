import React, { Component, PropTypes as T } from 'react'
import { Modal } from 'common'
import { json as request } from 'lgutil/common/ajax'
import config from '../../config'
import { Link } from 'react-router'
import cNames from 'classnames'

const oAuthLoginUri = config.oAuthServer + '/auth?response_type=code&client_id=pitayax-web&state=xyz%20&redirect_uri=' + config.oAuthRedirectUrl

const logo = require('./logo.png')

export default
class LoginModule extends Component {
  constructor (props, context) {
    super(props, context)
    this.state = {
      loginModalShow: false,
      nickName: "",
      userId: ""

    }
  }
  render () {
    const styles = require('./LoginModule.scss')
    let loginShow = (
      <div className={styles.loginContent}>
        <span onClick={::this.showLoginModal} ><i className="fa fa-sign-in"></i>登录</span>
        <span><Link to='/reg'><i className="fa fa-user-plus"></i>注册</Link></span>
      </div>
    )
    if (this.state.nickName) {
      const userRoute='/user/' + this.state.userId
      loginShow = (
        <div className={styles.loginContent}>
          <span><Link to={userRoute}><i className="fa fa-user"></i>{this.state.nickName}</Link></span>
          <span onClick={::this.logout_Onclick}><i className="fa fa-sign-out"></i>登出</span>
        </div>
      )
    }
    return (
      <div className={styles.loginContainer}>
        {loginShow}
        <Modal isShowed={this.state.loginModalShow} dimmerClassName='modal-dimmer' modalClassName='modal-dialog'>
          <div className='loginModal'>
            <div className={styles.loginModalCloseColor}></div>
            <div className={styles.loginModalCloseBackgroundColor} onClick={::this.loginClose_Onclick}>
              <i className = "fa fa-times-circle fa-2x"></i>
            </div>
            <div style={{ position: 'absolute' }}>

              <div>
                  <img className={styles.loginModalLogo} src={logo}/>
                  <hr/>
              </div>

              <div className={cNames('form-group', styles.loginModalFormGroup)}>
                <div className="input-group">
                  <div className='input-group-addon'><i className="fa fa-user"></i></div>
                  <input ref='loginEmail' className={cNames('form-control', styles.loginModalInputItem)} type="text" id="loginEmail" placeholder=" 邮 箱" />
                </div>
              </div>

              <div className={cNames('form-group', styles.loginModalFormGroup)}>
                <div className="input-group">
                  <div className='input-group-addon'><i className="fa fa-asterisk"></i></div>
                  <input ref='loginpwd' onKeyPress={::this.login_OnKeyDown} className={cNames('form-control', styles.loginModalInputItem)} type="password" id="loginpwd" placeholder=" 密 码" />
                </div>
              </div>

              <div className={styles.loginModalSubmitContainer}>
                <button onClick={::this.login_Onclick} className={cNames('btn', 'btn-primary', styles.loginModalSubmit)} type="submit"> 登 录 </button>
              </div>

              <div className={styles.loginModalErrorMsgContainer}>
                <label ref='errorMsg' className='sr-only'>用户名密码错误</label>
              </div>

              <div className={styles.loginModalOthers}>
                <p><span>忘记密码?</span> <span style={{ float: 'right' }}>注 册</span></p>
              </div>

            </div>
          </div>
       </Modal>
      </div>
    )

  }

  login_OnKeyDown (e) {
    if (e.charCode===13) {
      this.login_Onclick(e)
    }
  }

  componentDidMount () {
    if (sessionStorage.getItem("nickName") && sessionStorage.getItem("userId") && sessionStorage.getItem("nickName") !== 'undefined' && sessionStorage.getItem("userId") !== 'undefined') {
      this.setState({ ...this.state, nickName: sessionStorage.getItem("nickName"), userId: sessionStorage.getItem("userId") })
    }
<<<<<<< HEAD
    // request.post("/api/script/post/list", {}, {}, {
    //   timeout: 20000
    // })
    // .then(function (data) {
    //   console.log("api:")
    //   console.log(data)
    // })
    // .catch(function (e) {
    //   console.log("api:")
    //   console.log(e)
    // })

=======
>>>>>>> 1b51afd4d2aba0ebc858235f2a760701be2872e9
  }



  logout_Onclick () {
    sessionStorage.setItem("nickName", "")
    sessionStorage.setItem("userId", "")
    this.setState({ loginModalShow: false, nickName: "", userId: "" })
    global.refreshTokenProxy = arg => {}

    request.post("/cb/logout", {}, {}, {
      timeout: 20000
    })
    .then(function (data) {
      console.log(data)
    })
    .catch(function (e) {
      console.log(e)
    })

  }

  login_Onclick () {

    this.refs.errorMsg.innerText =''
    this.refs.errorMsg.setAttribute('class', 'sr-only')

    const userInfo={
      userName: this.refs.loginEmail.value,
      password: this.refs.loginpwd.value
    }

    request.post("/cb/login", userInfo, {}, {
      timeout: 20000
    })
    .then(function (data) {
      console.log(data)
      const body = data.body
      if (body.error) {
        this.refs.loginpwd.value=''
        this.refs.errorMsg.setAttribute('class', '')
        this.refs.errorMsg.innerText = body.error
      } else {
        // success
        this.setState({ loginModalShow: false, nickName: body.nickName, userId: body.userId })
        sessionStorage.setItem("nickName", body.nickName)
        sessionStorage.setItem("userId", body.userId)
        process.nextTick(() => global.alert("欢迎您， " +body.nickName ))
        global.refreshTokenProxy(Number(body.refreshTokenInterval))
      }
    }.bind(this))
    .catch(function (e) {
      console.log(e)
    })
  }

  showLoginModal () {
    this.setState({ loginModalShow: true, nickName: "", userId: "" })
    global.refreshTokenProxy = function (_interval) {
      setTimeout(global.refreshToken, _interval)
    }
  }

  loginClose_Onclick () {
    this.setState({ loginModalShow: false, nickName: "", userId: "" })
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

global.refreshToken = function () {
  request.post("/cb/refresh", {}, {}, {
    timeout: 20000
  })
  .then(function (data) {
    global.refreshTokenProxy(Number(data.body.refreshTokenInterval))
  })
  .catch(function (e) {
    console.log(e)
  })
}


global.refreshTokenProxy = function (_interval) {
  setTimeout(_refreshToken, _interval)
}
