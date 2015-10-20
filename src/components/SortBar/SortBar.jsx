import React, { PropTypes as T } from 'react'

const SortBar = React.createClass({
  propTypes: {
    data: T.array.isRequired,
    onClick: T.func // example: onActiveChange(e, sortData)
  },

  getInitialState () {
    return {
      activedId: null
    }
  },

  render () {
    const styles = require('./SortBar.scss')
    const  { data, onClick, ...others } = this.props
    const sorts = data.map( sort => <span
      className={styles.item +" "+ (this.state.activedId === sort._id? styles.actived:styles.unactived)} /* value={sort.value} */
      onClick={this.clickEvent( sort, onClick )}>{sort.name}</span> )

    return (<div className={styles.sort} {...others}>{sorts}</div>)
  },

  clickEvent ( sortData, handler ) {
    return (e) => {
      this.setState({ activedId: sortData._id })
      handler && handler(sortData, e)
    }
  }
})

export default SortBar
