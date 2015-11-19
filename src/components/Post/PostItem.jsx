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
          <Link className="avatar" to={`/user/${this.props.post.auther&&this.props.post.auther._id}`}>
            <img thumbnail="180x180" src="http://upload.jianshu.io/collections/images/47/rdn_4ddb18fddd2e9_%281%29.jpg?imageMogr/thumbnail/180x180" alt="Rdn 4ddb18fddd2e9 %281%29"/>
          </Link>
        </div>
        <div className={styles['post-item-body']}>
          <h5>
            <Link to={`/p/${post._id}`}>{post.title}</Link>
          </h5>
            <p className={styles['post-content']}>{post.abstract}<Link to={`/p/${post._id}`} className={styles.link}>...</Link></p>
            <p className={styles['post-link']}>
              <a className={styles['post-link-a']} href="/collection/bDHhpK">阅读：{post.viewCount}</a>
             · {post.likeCount?post.likeCount:99}人喜欢
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
