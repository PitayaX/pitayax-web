import React, { Component, PropTypes } from 'react'
import { IndexLink, Link } from 'react-router'
import { connect } from 'react-redux'
import DocumentMeta from 'react-document-meta'
import { pushState } from 'redux-router'
import LoginModule from '../LoginRebuild/Login'
// import LoginModule from '../Login/LoginModule'
import config from '../../config'

const title = 'PitayaX Web'
const description = ''

const meta = {
  title,
  description,
  meta: {
    charSet: 'utf-8'
  }
}

const NavbarLink = ({ to, className, component, children }) => {
  const Comp = component || Link

  return (
    <Comp to={to} className={className} activeStyle={{
      color: '#33e0ff'
    }}>
      {children}
    </Comp>
  )
}

@connect(
    state => ({ user: state.user }),
    { pushState })

export default class App extends Component {
  static propTypes = {
    children: PropTypes.object.isRequired,
    user: PropTypes.object,
    pushState: PropTypes.func.isRequired
  }

  static contextTypes = {
    store: PropTypes.object.isRequired
  }

  componentWillReceiveProps (nextProps) {
    if (!this.props.user && nextProps.user) {
      // login
      // this.props.pushState(null, '/loginSuccess')
    } else if (this.props.user && !nextProps.user) {
      // logout
      this.props.pushState(null, '/')
    }
  }

  static fetchData (getState, dispatch) {
    const promises = []
    // if (!isInfoLoaded(getState())) {
    //   promises.push(dispatch(loadInfo()))
    // }
    // if (!isAuthLoaded(getState())) {
    //   promises.push(dispatch(loadAuth()))
    // }
    return Promise.all(promises)
  }

  handleLogout (event) {
    event.preventDefault()
  //  this.props.logout()
  }

  render () {
    const { user } = this.props
    const styles = require('./App.scss')
    const newArticle='/newp'
    const home='/'
    return (
      <div className={styles.app}>
        <DocumentMeta {...meta}/>
        <nav className={styles.navbar}>
          <Link to={home} className="active"><i className='fa fa-home'></i></Link>
          <a><i className="fa fa-th"></i></a>
          <Link to={newArticle} className="active"><i className="fa fa-edit"></i></Link>
        </nav>
        <LoginModule />
        <div className={styles.appContent}>
          {this.props.children}
        </div>
      </div>
    )
  }
}
