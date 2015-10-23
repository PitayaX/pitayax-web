import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { CounterButton, GithubButton, LeftPanel, Content } from 'components'
import { isLoaded, load as loadTag } from 'redux/modules/tag'
import * as tagActions from 'redux/modules/tag'
import { load as loadSorts } from 'redux/modules/sorts'
import { list, listByTag } from 'redux/modules/articales'
import { isArticalesLoaded, list as queryArticales } from 'redux/modules/articales'

@connect(state => ({
  sorts: state.sorts.data,
  tags: state.tags.data,
  tagError: state.tags.error,
  tagLoading: state.tags.loading,
  articales: state.articales.data,
  articaleError: state.articales.error,
  articaleLoading: state.articales.loading,
  currentTag: state.articales.tag,
  currentSort: state.articales.sort
}),
dispatch => {
  return ({
    ...bindActionCreators({
      ...tagActions
    }, dispatch)
  , dispatch })})

export default class Home extends Component {
  static propTypes = {
    tags: PropTypes.array,
    sorts: PropTypes.array,
    tagError: PropTypes.string,
    tagLoading: PropTypes.bool,
    load: PropTypes.func.isRequired,
    articales: PropTypes.array,
    articaleError: PropTypes.string,
    dispatch: PropTypes.func,
    currentTag: PropTypes.object,
    currentSort: PropTypes.object
  }

  static fetchDataDeferred (getState, dispatch) {
    if (!isLoaded(getState())) {
      return dispatch(loadTag())
    }

    if (!isArticalesLoaded(getState())) {
      return dispatch(queryArticales())
    }

    return dispatch(loadSorts())
  }

  render () {

    const styles = require('./Home.scss')
    const { tags, sorts, articales, articaleError, dispatch, currentTag, currentSort, ...others } = this.props
    // require the logo image both from client and server
    // const logoImage = require('./logo.png')
    return (
      <div className={styles.home}>
        <LeftPanel><h3>Left Panel</h3></LeftPanel>
        {console.log(dispatch)}
        <Content tagsData={tags} sortsData={sorts} articalesData={articales} tagHandler={tag => {
          return dispatch(listByTag(tag, currentSort))
        }} sortHanlder={(sort, e) => {
          debugger
          return dispatch(listByTag(currentTag, sort))
        }} />
        {articaleError && <div> Sorry, occur error when load articales. Error: {articaleError} </div>}
      </div>
    )
  }

  tagHandler (tag) {
    return () => console.log(tag)
  }
}
