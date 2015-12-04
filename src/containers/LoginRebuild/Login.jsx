import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'


import React, { Component, PropTypes as T } from 'react'



import { LoginBar, LoginModal } from 'components'
import { loginInit, openLoginModal, closeLoginModal, loginClick, logoutClick, refreshToken }  from 'redux/modules/login'


export default
class LoginModule extends Component {
  constructor (props, context) {
    super(props, context)
  }

  componentDidMount () {
    if (sessionStorage.getItem("nickName") && sessionStorage.getItem("userId") && sessionStorage.getItem("nickName") !== 'undefined' && sessionStorage.getItem("userId") !== 'undefined') {
      this.props.loginInit()
    }
  }

  render () {

    const { loginStates, loginModalStates, openLoginModal, closeLoginModal, loginClick, logoutClick, refreshToken } = this.props

    const LoginBarProps = Object.assign({}, loginStates, { openLoginModal, logoutClick })


    const LoginModalProps = Object.assign({}, loginModalStates, { closeLoginModal, loginClick, refreshToken })

    const styles = require('./LoginModule.scss')
    return (
      <div className={styles.loginContainer}>
        <LoginBar {...LoginBarProps}/>
        <LoginModal {...LoginModalProps}/>
      </div>
    )

  }
}

LoginModule.propTypes ={
  loginStates: T.object.isRequired,
  loginModalStates: T.object.isRequired,
  openLoginModal: T.func,
  closeLoginModal: T.func,
  loginClick: T.func,
  logoutClick: T.func,
  refreshToken: T.func,
  loginInit: T.func
}



function mapStateToProps (state) {
  return {
    loginStates: state.loginInfo,
    loginModalStates: state.loginModalInfo
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({ openLoginModal, closeLoginModal, loginClick, logoutClick, refreshToken, loginInit }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginModule)
