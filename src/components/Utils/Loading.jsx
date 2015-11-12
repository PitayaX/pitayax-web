import React, { propTypes } from 'react'
/* import Loading  from 'react-loading' */
const PitayaLoading= React.createClass({
  propTypes: {
    imgUrl: React.PropTypes.string,
    className: React.PropTypes.string,
    type: React.PropTypes.string
  },
  getDefaultProps () {
    const imgPath = require('./loading-spokes.svg')
    return {
      type: "spokes",
      imgUrl: imgPath
    }
  },
  render () {
    const styles = require('./Loading.scss')
    return (
      <div className={styles['loading-container']}>
        <div>
          <img src={this.props.imgUrl} style={{ height: 50, width: 50 }} />
        </div>
      </div>
    )
  }
})
export default PitayaLoading
