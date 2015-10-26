import React from 'react'
import classNames from 'classnames'

const ArticleBody = React.createClass({
  propTypes: {
    className: React.PropTypes.string,
    text: React.PropTypes.string
  },
  render () {
    const styles=require('./SingleArticle.scss')
    const articleBody = classNames(styles.articleBody, this.props.className)
    return (
      <div className={articleBody}>
        <pre>
          {this.props.text}
        </pre>
      </div>
    )
  }
})

export default ArticleBody
