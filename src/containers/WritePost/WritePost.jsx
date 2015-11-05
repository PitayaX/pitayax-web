import React, { Component, PropTypes } from 'react'
import { json as request } from 'lgutil/common/ajax'
import { Editor } from 'pitaya-components'

class WritePost extends Component {
  static propTypes = {
    header: PropTypes.string
  }
  _props: {
    article: {}
  }
  render () {
    const styles = require('./WritePost.scss')
    return (
      <div className={styles.writePost + ' container'}>
        <div className={styles.title}>
          <h3>编辑文字</h3>
        </div>
        <div className={styles.editorTitle}>
          <input ref='title' className={styles.input} name='title' type='text' placeholder='标题' />
          <div className={styles.strip}></div>
        </div>
        <div className={styles.editorTag}>
          <input ref='tags' className={styles.input} name='tags' type='text' placeholder='标签...' />
          <div className={styles.strip}></div>
        </div>
        <Editor ref='content' />
        <button className={styles.editorButton} onClick={::this._clickToPostArticle}>递交</button>
      </div>
    )
  }

  _clickToPostArticle () {
    const article = {}
    article['title'] = this.refs.title.value
    article['tags'] = this.refs.tags.value
    article['content'] = this.refs.content.value
    for (const field in article) {
      if (article.hasOwnProperty(field)) {
        if ( this._isEmptyString(article[field]) ) {
          console.log(field)
          this._remindRequiredField(field)
          return
        }
      }
    }
    this._sendArticle(article)
  }

  _sendArticle (article) {
    const url = 'http://10.10.73.207:8088/api/post/create'
    const ajaxSender = request.post(url, article)
    console.log(article)
    ajaxSender.then((res) => {
      console.log(res)
    }).catch((err) => {
      console.log(err)
    })
  }

  _isEmptyString (field) {
    return field.replace(/(^\s*)|(\s*$)/g, '').length == 0
  }

  _remindRequiredField (fieldName) {
    console.log(this.refs[fieldName])
  }
}

export default WritePost
