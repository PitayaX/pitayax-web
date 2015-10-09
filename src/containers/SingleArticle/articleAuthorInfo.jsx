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
    this.props.words = this.props.words || 0
    this.props.follows = this.props.follows || 0
    this.props.likes = this.props.likes || 0
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
            写了{this.props.words}字，被{this.props.follows}人关注，获得了{this.props.likes}个喜欢
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
