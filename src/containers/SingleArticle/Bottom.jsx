import React from 'react'

const Bottom=React.createClass({
  propTypes: {
    className: React.PropTypes.string
  },
  render () {
    const styles = require('./SingleArticle.scss')
    this.props.className= this.props.className || styles.bottom
    return(
      <div className={this.props.className}>
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
