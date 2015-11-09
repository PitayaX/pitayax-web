import React, { propTypes } from 'react'
import { Dimmer } from 'pitaya-components'

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
    const styles = require('./Loading.scss')
    return (
      <div className={styles['loading-container']}>
         <Dimmer>
           <p>Loading......</p>
         </Dimmer>
      </div>
    )
  }
})
export default Loading
