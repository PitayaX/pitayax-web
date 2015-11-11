import React, { Component, PropTypes as T } from 'react'

export  default class Content extends Component {

  constructor (props, context) {
    super(props, context)
  }

  static propTypes = {
    post: T.object.isRequired
  }

  render () {

    const styles = require('./PostDetail.scss')
    const post = this.props.post

    return (
      <div className={styles.myArticle}>
        <div>
         <div>
           <h1 className={styles.articleTitleHeader} >{post.title}</h1>
         </div>
         <div className={styles.articleTitleTags}>
             <ul>
               {post.words&&<li>数字{post.words}&nbsp;&nbsp;</li>}
               <li>阅读{post.viewCount}&nbsp;&nbsp;</li>
               <li>喜欢{post.likeCount}&nbsp;&nbsp;</li>
             </ul>
         </div>
         <div className={styles.articleTitleAuthor}>
           <p>
               文/{post.author}
           </p>
         </div>
        </div>
        <div className={styles.articleBody}>
          <pre>
            {post.content}
          </pre>
        </div>
      </div>
    )
  }
}
