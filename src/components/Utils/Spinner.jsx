import React, { propTypes } from 'react'
import { Dimmer } from 'pitaya-components'

const PitayaSpinner= React.createClass({
  propTypes: {
    className: React.PropTypes.string
  },

  render () {
    const styles = require('./Spinner.scss')
    return (
      <div className={styles['loading-container']}>
         <Dimmer>
           <div className={styles['spinner']}><div></div></div>
         </Dimmer>
      </div>
    )
  }
})
export default PitayaSpinner
