import React from 'react'
import $ from 'jquery'

const Backtop= React.createClass({

  componentDidMount () {
    const gotop=$("#backtop a.back-top")
    if ( $(window).scrollTop() < 20) {
      gotop.hide()
    }
    $(window).scroll(function () {
      if ($(this).scrollTop() < 20) {
        gotop.fadeOut('slow')
      }
      else {
        gotop.fadeIn('slow')
      }
    })
    gotop.click(function () {
      $('html,body').animate({ scrollTop: 0 }, 'slow')
      return false
    })
  },

  render () {
    const styles = require('./backtop.scss')
    return (
      <div ref="backtotop" id="backtop">
        <a rel="nofollow" href="javascript:;" title="返回顶部" className={styles['back-top']}></a>
      </div>
    )
  }
})
export default Backtop
