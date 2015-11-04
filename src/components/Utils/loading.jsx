import React, { propTypes } from 'react'
import ReactLoading from 'react-loading'

const Loading= React.createClass({
  propTypes: {
    className: React.PropTypes.string,
    type: React.PropTypes.string
  },
  getDefaultProps () {
    return {
      type: "spokes"
    }
  },
  render () {
    const styles = require('./loading.scss')
    return (
      <div className={styles['loading-container']}>
         <ReactLoading type={this.props.type} color="#e3e3e3"/>
      </div>
    )
  }
})
export default Loading
