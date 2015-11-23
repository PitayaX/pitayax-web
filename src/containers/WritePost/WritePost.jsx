import React, { Component, PropTypes as T } from 'react'
import { reduxForm } from 'redux-form'
import { json as request } from 'lgutil/common/ajax'
import { Editor } from 'pitaya-components'
import LeanInput from '../../components/LeanInput/LeanInput'
import TagInput from '../../components/TagInput/TagInput'
import { noop, prop } from '../../utils/writePost'

// @reduxForm({
//   form: 'editPost',
//   fields: [ 'title', 'tags', 'content' ],
//   validate: (values) => {
//     const errors = {}
//
//     if (!values.title) errors.title = 'It is required.'
//     if (!values.content) errors.content = 'It is required.'
//
//     return errors
//   },
//   touchOnBlur: false
// })
class WritePost extends Component {

  static propTypes = {
    fields: T.object,
    errors: T.object,
    invalid: T.bool,
    dirty: T.bool,
    isRequesting: T.bool,
    handleSubmit: T.func.isRequired,
    onLoad: T.func,
    onError: T.func
  }

  static defaultProps = {
    isRequesting: false,
    onSubmit: noop,
    onLoad: noop,
    onError: noop
  }

  // TODO: Issue with HOC, can't resolve this property
  isDirty () {
    const { dirty } = this.props // only by this dirty property for now
    return dirty
  }

  constructor (props, context) {
    super(props, context)
  }

  render () {
    const styles = require('./WritePost.scss')
    // const invalidKeys = invalid ? Object.keys(errors).map(key => fields[key]).filter(isInvalid).map(prop('name')) : []
    // const invalidKeyString = invalidKeys.join(', ')
    return (
      <div className={styles.writePost + ' container'}>
        <div className={styles.title}>
          <h3>编辑文字</h3>
        </div>
        <div className="form-group">
          <LeanInput className="title" placeholder="标题" autoFocus />
        </div>
        <div className="form-group">
          <TagInput placeholder="标签请用逗号分隔" />
        </div>
        <Editor ref='content' />
        <button className='btn btn-default' onClick={::this._clickToPostArticle}>递交</button>
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
    ajaxSender.then((res) => {
    }).catch((err) => {

    })
  }

  _isEmptyString (field) {
    return field.replace(/(^\s*)|(\s*$)/g, '').length === 0
  }

  _remindRequiredField (fieldName) {
  }

}

export default WritePost
