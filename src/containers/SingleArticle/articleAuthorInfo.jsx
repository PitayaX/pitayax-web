import React from 'react'
const ArticleAuthorInfo=React.createClass({
  propTypes: {
    publishDate: React.PropTypes.string,
    author: React.PropTypes.string,
    words: React.PropTypes.number,
    follows: React.PropTypes.number,
    likes: React.PropTypes.number
  },
  render () {
    const words = this.props.words || 0
    const follows = this.props.follows || 0
    const likes = this.props.likes || 0
    const styles = require('./SingleArticle.scss')
    const avatar = require('./avatar.png')
    return(
      <div className={styles.articleAuthorBox}>
        <img className={styles.avatar} src={avatar} alt="Avatar" />
        <div className={styles.authorInfo}>
          <p>
            <span className={styles.articleAuthorKey}>作者</span>
            &nbsp;&nbsp;&nbsp;
            <span className={styles.articAuthorValue}>{this.props.author}</span>
            &nbsp;&nbsp;&nbsp;
            <span>{this.props.publishDate}</span>
          </p>
          <p className={styles.articAuthorNumber}>
            写了{words}字，被{follows}人关注，获得了{likes}个喜欢
          </p>
        </div>
        <div className={styles.clear}>
          <hr/>
        </div>
      </div>
    )
  }
})
export default ArticleAuthorInfo
