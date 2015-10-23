import React from 'react'
import ArticleTitle from './articleTitle.jsx'
import ArticleBody from './articleBody.jsx'
import ArticleAuthorInfo from './articleAuthorInfo.jsx'
import DuoShuo from './duoshuo.jsx'
import classNames from 'classNames'
const Article = React.createClass({
  propTypes: {
    model: React.PropTypes.shape({
      author: React.PropTypes.string,
      publishDate: React.PropTypes.string,
      authorWords: React.PropTypes.number,
      authorFollows: React.PropTypes.number,
      authorLikes: React.PropTypes.number,
      articleWords: React.PropTypes.number,
      articleReaders: React.PropTypes.number,
      articleComments: React.PropTypes.number,
      articleLikes: React.PropTypes.number,
      articleContent: React.PropTypes.string
    }).isRequired
  },
  render () {
    const styles=require('./SingleArticle.scss')
    const containerPost=classNames(styles.container, styles.post)
    return(
      <div className={containerPost}>
        <ArticleAuthorInfo author={this.props.model.author} publishDate={this.props.model.publishDate} words={this.props.model.authorWords} follows={this.props.model.authorFollows} likes={this.props.model.authorLikes} />
        <div className={styles.myArticle}>
          <ArticleTitle author={this.props.model.author} words={this.props.model.articleWords} readers={this.props.model.articleReaders} comments={this.props.model.articleComments} likes={this.props.model.articleLikes} />
          <ArticleBody text={this.props.model.articleContent} />
        </div>
        <DuoShuo shortName='localtest998' thread='201508270001' title='2015年8月27日日记' url='http://localhost:8080' />
      </div>

    )
  }
})




export default Article
