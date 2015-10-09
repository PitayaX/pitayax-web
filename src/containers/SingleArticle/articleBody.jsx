import React from 'react'

const ArticleBody = React.createClass({
  propTypes: {
    className: React.PropTypes.string,
    text: React.PropTypes.string
  },
  render () {
    const styles=require('./SingleArticle.scss')
    this.props.className = this.props.className || styles.articleBody
    return (
      <div className={this.props.className}>
        <pre>
          {this.props.text}
        </pre>
      </div>
    )
  }
})

export default ArticleBody
