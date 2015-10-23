import React from 'react'
import classNames from 'classnames'

const Bottom=React.createClass({
  propTypes: {
    className: React.PropTypes.string
  },
  render () {
    const styles = require('./SingleArticle.scss')
    const bottom = classNames(styles.bottom, this.props.className)
    return(
      <div className={bottom}>
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
    )
  }
})
export default Bottom
