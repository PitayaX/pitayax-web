import React from 'react'


const ArticleTitle=React.createClass({
  propTypes: {
    author: React.PropTypes.string,
    words: React.PropTypes.number,
    readers: React.PropTypes.number,
    comments: React.PropTypes.number,
    likes: React.PropTypes.number
  },
  render () {
    const words = this.props.words || 0
    const readers = this.props.readers || 0
    const comments = this.props.comments || 0
    const likes = this.props.likes || 0
    const styles = require('./SingleArticle.scss')
    return(
     <div>
      <div>
        <h1 className={styles.articleTitleHeader}>你瞧不起她是因为你羡慕她</h1>
      </div>
      <div className={styles.articleTitleTags}>
          <ul>
            <li>数字{words}&nbsp;&nbsp;</li>
            <li>阅读{readers}&nbsp;&nbsp;</li>
            <li>评论{comments}&nbsp;&nbsp;</li>
            <li>喜欢{likes}&nbsp;&nbsp;</li>
          </ul>
      </div>
      <div className={styles.articleTitleAuthor}>
        <p>
            文/{this.props.author}
        </p>
      </div>
      </div>
    )
  }
})

export default ArticleTitle
