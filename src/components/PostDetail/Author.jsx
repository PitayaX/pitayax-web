import React, { Component, PropTypes as T } from 'react'


export default class Author extends Component {

  constructor (props, context) {
    super(props, context)
  }

  static propTypes = {
    author: T.object.isRequired
  }

  render () {

    const styles = require('./PostDetail.scss')
    const author = this.props.author
    const avatar = require('./avatar.png')

    return (
      <div className={styles.articleAuthorBox}>
        <img className={styles.avatar} src={avatar} alt="Avatar" />
        <div className={styles.authorInfo}>
          <p>
            <span className={styles.articleAuthorKey}>作者</span>
            &nbsp;&nbsp;&nbsp;
            <span className={styles.articAuthorValue}>{author.nick}</span>
            &nbsp;&nbsp;&nbsp;
            <span>{author.publishDate}</span>
          </p>
          <p className={styles.articAuthorNumber}>
            写了{author.words}字，被{author.follows}人关注，获得了{author.likes}个喜欢
          </p>
        </div>
        <div className={styles.clear}>
          <hr/>
        </div>
    </div>
    )

  }

}
