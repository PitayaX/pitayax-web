import React, { Component, PropTypes as T } from 'react'
import { Modal } from 'common'
import cNames from 'classnames'

const logo = require('./logo.png')

export default
class LoginModal extends Component {

  constructor (props, context) {
    super(props, context)
  }

  login_click (e) {

    if (this.props.isLogining) {
      return
    }

    this.refs.errorMsg.innerText =''
    this.refs.errorMsg.setAttribute('class', 'sr-only')

    const userInfo={
      userName: this.refs.loginEmail.value,
      password: this.refs.loginpwd.value
    }

    this.props.loginClick(userInfo, this.props.refreshToken)
    // process.nextTick(() => this.refs.loginpwd.value='')
  }

  password_keyPress (e) {
    if (e.charCode===13) {
      this.login_click(e)
    }
  }

  render () {

    const { closeLoginModal, showModal, showError, error } = this.props
    const styles = require('./LoginModule.scss')

    const errorMsgClass = showError ? '' : 'sr-only'
    const errorMsg = error ? error : '用户名密码错误'

    return (
      <Modal isShowed={showModal} dimmerClassName='modal-dimmer' modalClassName='modal-dialog'>
        <div className='loginModal'>
          <div className={styles.loginModalCloseColor}></div>
          <div className={styles.loginModalCloseBackgroundColor} onClick={(e) => closeLoginModal(e)}>
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
                <input
                  ref='loginpwd'
                  onKeyPress={::this.password_keyPress}
                  className={cNames('form-control', styles.loginModalInputItem)}
                  type="password"
                  id="loginpwd"
                  placeholder=" 密 码" />
              </div>
            </div>

            <div className={styles.loginModalSubmitContainer}>
              <button onClick={::this.login_click} className={cNames('btn', 'btn-primary', styles.loginModalSubmit)} type="submit"> 登 录 </button>
            </div>

            <div className={styles.loginModalErrorMsgContainer}>
              <label ref='errorMsg' className={errorMsgClass}>{errorMsg}</label>
            </div>

            <div className={styles.loginModalOthers}>
              <p><span>忘记密码?</span> <span style={{ float: 'right' }}>注 册</span></p>
            </div>

          </div>
        </div>
     </Modal>
    )
  }
}

LoginModal.propTypes = {
  refreshToken: T.func.isRequired,
  closeLoginModal: T.func.isRequired,
  loginClick: T.func.isRequired,
  showModal: T.bool.isRequired,
  showError: T.bool.isRequired,
  error: T.string.isRequired,
  isLogining: T.bool.isRequired
}
