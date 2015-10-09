import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import DocumentMeta from 'react-document-meta'
import { isLoaded as isInfoLoaded, load as loadInfo } from 'redux/modules/info'
import { isLoaded as isAuthLoaded, load as loadAuth, logout } from 'redux/modules/auth'
import { InfoBar } from 'components'
import { createTransitionHook } from 'helpers/universalRouter'

const title = 'PitayaX Web'
const description = ''

const meta = {
  title,
  description,
  meta: {
    charSet: 'utf-8'
  }
}

@connect(
    state => ({ user: state.auth.user }),
    dispatch => bindActionCreators({ logout }, dispatch))
export default class App extends Component {
  static propTypes = {
    children: PropTypes.object.isRequired,
    user: PropTypes.object,
    logout: PropTypes.func.isRequired
  }

  static contextTypes = {
    router: PropTypes.object.isRequired,
    store: PropTypes.object.isRequired
  }

  componentWillMount () {
    const { router, store } = this.context
    this.transitionHook = createTransitionHook(store)
    router.addTransitionHook(this.transitionHook)
  }

  componentWillReceiveProps (nextProps) {
    if (!this.props.user && nextProps.user) {
      // login
      this.context.router.transitionTo('/loginSuccess')
    } else if (this.props.user && !nextProps.user) {
      // logout
      this.context.router.transitionTo('/')
    }
  }

  componentWillUnmount () {
    const { router } = this.context
    router.removeTransitionHook(this.transitionHook)
  }

  static fetchData (store) {
    const promises = []
    if (!isInfoLoaded(store.getState())) {
      promises.push(store.dispatch(loadInfo()))
    }
    if (!isAuthLoaded(store.getState())) {
      promises.push(store.dispatch(loadAuth()))
    }
    return Promise.all(promises)
  }

  handleLogout (event) {
    event.preventDefault()
    this.props.logout()
  }

  render () {
    const { user } = this.props
    const styles = require('./App.scss')
    const newArticle='/p/'+Math.random().toString().substr(2)
    return (
      <div className={styles.app}>
        <DocumentMeta {...meta}/>
        <nav className={styles.navbar}>
          <a><i className='fa fa-home'></i></a>
          <a><i className="fa fa-th"></i></a>
          <Link to={newArticle}><i className="fa fa-edit"></i></Link>
        </nav>
        <div className={styles.appContent}>
          {this.props.children}
        </div>
      </div>
    )
  }
}
