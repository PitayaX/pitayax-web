import React, { PropTypes as T } from 'react'

const Tags = React.createClass({
  propTypes: {
    data: T.array.isRequired,
    onClick: T.func
  },
  getInitialState () {
    return { activeId: null }
  },
  render () {
    const { data, onClick, ...others } = this.props
    const styles = require('./tag.scss')
    const tags = data&&data.map( (item) => {
      return (
        ( <span><a className={styles.tag +" "+ (this.state.activeId === item._id? styles.active : "")}
        onClick={this.onClickHandler(item, onClick)}>{item.text}</a></span> )
      )
    })
    return ( <div>{tags}</div> )
  },

  onClickHandler (tagData, eventHandler) {
    return (e) => {
      this.setState({ activeId: tagData._id })

      eventHandler && eventHandler(tagData, e)
    }
  }
})

export default Tags
