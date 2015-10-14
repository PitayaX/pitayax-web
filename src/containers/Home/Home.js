import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { CounterButton, GithubButton, LeftPanel, Content } from 'components'
import { sortData } from 'data'
import { isLoaded, load as loadTag } from 'redux/modules/tag'
import * as tagActions from 'redux/modules/tag'
import * as articaleAction from 'redux/modules/articales'
import { isArticalesLoaded, list as queryArticales } from 'redux/modules/articales'


@connect(state => ({
  tags: state.tags.data,
  tagError: state.tags.error,
  tagLoading: state.tags.loading,
  articales: state.articales.data,
  articaleError: state.articales.error,
  articaleLoading: state.articales.loading
}),
dispatch => ({
  ...bindActionCreators({
    ...tagActions, ...articaleAction
  }, dispatch)
}))
export default class Home extends Component {
  static propTypes = {
    tags: PropTypes.array,
    tagError: PropTypes.string,
    tagLoading: PropTypes.bool,
    load: PropTypes.func.isRequired,
    articales: PropTypes.array,
    articaleError: PropTypes.string
  }

  static fetchData (store) {
    if (!isLoaded(store.getState())) {
      return store.dispatch(loadTag())
    }

    if (!isArticalesLoaded(store.getState())) {
      return store.dispatch(queryArticales())
    }
  }

  render () {
    const styles = require('./Home.scss')
    const { tags, articales, articaleError, ...others } = this.props
    // require the logo image both from client and server
    // const logoImage = require('./logo.png')
    return (
      <div className={styles.home}>
        <LeftPanel><h3>Left Panel</h3></LeftPanel>
        <Content tagsData={tags} sortsData={sortData} articalesData={articales}/>
        {articaleError && <div> Sorry, occur error when load articales. Error: {articaleError} </div>}
      </div>
    )
  }
}
