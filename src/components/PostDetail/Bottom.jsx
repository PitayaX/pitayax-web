import React, { Component, PropTypes as T } from 'react'

export default
class Bottom extends Component {
  constructor (props, context) {
    super(props, context)
  }

  render () {

    const styles = require('./PostDetail.scss')

    return (
      <div>
        <hr className={styles.bottomHr}/>
        <div className={styles.bottom}>
            <p>
              Design & Supported by PitayaX Open Source Team
            </p>
            <p>
              Email:admin@pitayaX.net
            </p>
            <p>
              GitHub: github.com/organizations/PitayaX
            </p>
        </div>
      </div>
    )
  }
}
