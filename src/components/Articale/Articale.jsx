import React, { PropTypes as T } from 'react'

const Artical = React.createClass({
  propTypes: {
    title: T.string, // 文章标题
    uri: T.string,
    imgSrc: T.string, // 图片地址
    abstract: T.string, // 文章内容摘要
    footers: T.array,
    footHandler: T.func
  },

  render () {
    const { title, uri, imgSrc, abstract, footers, footHandler, ...others } = this.props
    const foot = footers && footHandler && footers.map(item => footHandler(item))
    const styles = require('./Articale.scss')
    return (
      <div className={styles.articale} {...others}>
        <div className={styles.left}>
          <a href={uri} className={styles.author} title={title}>
            <image className={styles.photo + " " + styles.photo} src={imgSrc} />
          </a>
        </div>
        <div className={styles.right}>
          <h3><a title="title" className={styles.title} href={uri}>{title}</a></h3>
          <a title="abstract" className={styles.abstract} href={uri}>{abstract}</a>
          <div className={styles.footer}>{foot}</div>
       </div>
       <div className="clear"></div>
      </div>
    )
  }
})

export default Artical
