import React, { propTypes } from 'react'
import { Link } from 'react-router'

const PostItem = React.createClass({
  propTypes: {
    post: React.PropTypes.array.isRequired
  },

  render () {
    const styles = require('./Post.scss')
    const { post } = this.props
    const tags = post.tags.map((tag) => {
      return (<span><Link to={`/tags/${tag}`}>{tag}</Link> &nbsp; </span>)
    })
    return (
      <li className={styles['post-item-row']}>
        <div className={styles['post-item-avatar']}>
          <a className="avatar" href="/collection/bDHhpK">
            <img thumbnail="180x180" src="http://upload.jianshu.io/collections/images/47/rdn_4ddb18fddd2e9_%281%29.jpg?imageMogr/thumbnail/180x180" alt="Rdn 4ddb18fddd2e9 %281%29"/>
          </a>
        </div>
        <div className={styles['post-item-body']}>
          <h5>
            <Link to={`/p/${post._id}`}>{post.title}</Link>
          </h5>
            <p className={styles['post-content']}>{post.abstract}...</p>
            <p className={styles['post-link']}>
              <a className={styles['post-link-a']} href="/collection/bDHhpK">13913篇文章</a>
             · 30.0K人关注
              <span className={styles['post-tag']}>
                <i className="fa fa-tags"></i>&nbsp;
                {tags}
              </span>
            </p>
        </div>
      </li>
    )
  }
})
export default PostItem
