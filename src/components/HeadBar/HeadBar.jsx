import React, { Component, PropTypes as T } from 'react'

export default class HeadBar extends Component {
  render () {
    const styles = require('./Header.scss')

    // return <h3>headBar</h3>
    return ( <div className={styles.headBar}>
              <div className={styles.headLeft}><span className={styles.headTitle}>列表</span></div>
              <div className={styles.headRight}>
                <input type="text" placeholder="搜索"/>
                <span className={styles.headButton}><i className="fa fa-sign-in"></i>登录</span>
                <span className={styles.headButton}><i className="fa fa-user-plus"></i>注册</span>
              </div>
              <div style={{ clear: "both" }}></div>
            </div> )

  }
}
