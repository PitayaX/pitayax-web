import express from 'express'
import config from '../config'
import routers from '../routers'

const app = express()

// view engine config
app.set('view engine', 'hbs')
app.set('views', path.resolve(__dirname, './views'))

app.use(routers)

// 404
app.use((req, res, next) => {
  res.render('404')
})

// error handler
app.use((e, req, res, next) => {
  res.render('500', {
    error: e
  })
})

app.listen(port, () => {
  console.log(`Server listening on port ${port}`)
})
