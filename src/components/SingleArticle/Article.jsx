import React, { Component, PropTypes as T } from 'react'

export  default
class Article extends Component {

  constructor (props, context) {
    super(props, context)
  }

  static propTypes = {
    article: T.object.isRequired
  }

  render () {

    const styles = require('./SingleArticle.scss')
    const article = this.props.article

    return (
      <div className={styles.myArticle}>
        <div>
         <div>
           <h1 className={styles.articleTitleHeader} >{article.title}</h1>
         </div>
         <div className={styles.articleTitleTags}>
             <ul>
               <li>数字{article.words}&nbsp;&nbsp;</li>
               <li>阅读{article.readers}&nbsp;&nbsp;</li>
               <li>喜欢{article.likes}&nbsp;&nbsp;</li>
             </ul>
         </div>
         <div className={styles.articleTitleAuthor}>
           <p>
               文/{article.author}
           </p>
         </div>
        </div>
        <div className={styles.articleBody}>
          <pre>
            {article.content}
          </pre>
        </div>
      </div>
    )

  }
}
