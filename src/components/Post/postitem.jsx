import React, { propTypes } from 'react'
import { Link } from 'react-router'


const PostItem = React.createClass({
  propTypes: {
    title: React.PropTypes.string,
    brief: React.PropTypes.string,
    id: React.PropTypes.number
  },
  render () {
    const styles = require('./post.scss')
    return (
      <li className={styles['post-item-row']}>
        <div className={styles['post-item-avatar']}>
          <a className="avatar" href="/collection/bDHhpK">
            <img thumbnail="180x180" src="http://upload.jianshu.io/collections/images/47/rdn_4ddb18fddd2e9_%281%29.jpg?imageMogr/thumbnail/180x180" alt="Rdn 4ddb18fddd2e9 %281%29"/>
          </a>
        </div>
        <div className={styles['post-item-body']}>
          <h5>
            <Link to={`/p/${this.props.id}`}>{this.props.title}</Link>
          </h5>
            <p className={styles['post-content']}>{this.props.brief}...</p>
            <p className={styles['post-link']}>
              <a className={styles['post-link-a']} href="/collection/bDHhpK">13913篇文章</a>
             · 30.0K人关注
              <span className={styles['post-tag']}>
                <i className="fa fa-tags"></i>&nbsp;
                  <a className="" href="/tags/1951/collections">连载</a>、
                  <a className="" href="/tags/17/collections">故事</a>
              </span>
            </p>
        </div>
      </li>
    )
  }
})
export default PostItem
