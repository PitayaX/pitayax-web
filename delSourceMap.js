const fs = require('fs')
const path = require('path')
const prodConfig = require('./webpack/prod.config')

;(function delSourceMap () {
  if (prodConfig.sourceMap) {
    return
  }
  const distPath = './static/dist/'
  const files = fs.readdirSync(distPath)
  files.map(function (val, index, array) {
    const pattern =/\.map$/
    if (pattern.test(val)) {
      fs.unlinkSync(distPath.concat(val))
    }
  })
})()
