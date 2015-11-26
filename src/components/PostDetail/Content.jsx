import React, { Component, PropTypes as T } from 'react'
import Marked from 'marked'

export  default class Content extends Component {

  constructor (props, context) {
    super(props, context)
  }

  static propTypes = {
    post: T.object.isRequired
  }

  rawMarkup () {
    // Marked.setOptions({
    //   gfm: true,
    //   tables: true,
    //   breaks: false,
    //   pedantic: false,
    //   sanitize: true,
    //   smartLists: true,
    //   smartypants: true
    // })
    const content = this.props.post.content?this.props.post.content:""
    const rawMarkup = Marked(content, { sanitize: true })
    return { __html: rawMarkup }
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
               文/{post.author.nick}
           </p>
         </div>
        </div>
        <div className={styles.articleBody}>
            <div dangerouslySetInnerHTML={this.rawMarkup()}></div>
        </div>
      </div>
    )
  }
}
