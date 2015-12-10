import Express from 'express'
import React from 'react'
import ReactDOM from 'react-dom/server'
import config from './config'
import favicon from 'serve-favicon'
import compression from 'compression'
import httpProxy from 'http-proxy'
import path from 'path'
import createStore from './redux/create'
import ApiClient from './helpers/ApiClient'
import Html from './helpers/Html'
import PrettyError from 'pretty-error'
import http from 'http'
import SocketIo from 'socket.io'

import { ReduxRouter } from 'redux-router'
import createHistory from 'history/lib/createMemoryHistory'
import { reduxReactRouter, match } from 'redux-router/server'
import { Provider } from 'react-redux'
import qs from 'query-string'
import getRoutes from './routes'
import getStatusFromRoutes from './helpers/getStatusFromRoutes'
import callback from './callbacks'
import cookie from 'cookie'



const pretty = new PrettyError()
const app = new Express()
const server = new http.Server(app)
const apiProxy = httpProxy.createProxyServer({
  target: config.apiProxy,
  // target: 'http://localhost:' + config.apiPort,
  ws: true
})

const fileProxy = httpProxy.createProxyServer({
  target: config.fileProxy,
  // target: 'http://localhost:' + config.apiPort,
  ws: true
})

apiProxy.on('error',proxyErr)

fileProxy.on('error',proxyErr)

function proxyErr(error) {
  console.log('Proxy Error:')
  console.log(error)
}

// proxy.on('proxyReq', function (proxyReq, req, res, options) {
//   const cookies = cookie.parse(req.headers.cookie)
//   proxyReq.setHeader('access_token', cookies.access_token)
//   console.log('proxyReq after:')
//   console.log(proxyReq.headers)
// })

app.use(compression())
app.use(favicon(path.join(__dirname, '..', 'static', 'favicon.ico')))

app.use(require('serve-static')(path.join(__dirname, '..', 'static')))

// Proxy to API server
app.use('/api', (req, res) => {
  apiProxy.web(req, res)
})
app.use('/fs', (req, res) => {
  fileProxy.web(req, res)
})

app.use('/cb', require('body-parser').json(), (req, res, next) => {
  callback(req, res, next)
})

// added the error handling to avoid https://github.com/nodejitsu/node-http-proxy/issues/527
apiProxy.on('error', (error, req, res) => {
  let json
  if (error.code !== 'ECONNRESET') {
    console.error('proxy error', error)
  }
  if (!res.headersSent) {
    res.writeHead(500, { 'content-type': 'application/json' })
  }

  json = { error: 'proxy_error', reason: error.message }
  res.end(JSON.stringify(json))
})

app.use((req, res) => {

  if (__DEVELOPMENT__) {
    // Do not cache webpack stats: the script file would change since
    // hot module replacement is enabled in the development env
    webpackIsomorphicTools.refresh()
  }

  const client = ApiClient(req)
  const store = createStore(reduxReactRouter, getRoutes, createHistory, client)

  function hydrateOnClient () {
    res.send('<!doctype html>\n' +
      ReactDOM.renderToString(<Html assets={webpackIsomorphicTools.assets()} store={store}/>))
  }

  if (__DISABLE_SSR__) {
    hydrateOnClient()
    return
  }

  store.dispatch(match(req.originalUrl, (error, redirectLocation, routerState) => {
    if (redirectLocation) {
      res.redirect(redirectLocation.pathname + redirectLocation.search)
    } else if (error) {
      console.error('ROUTER ERROR:', pretty.render(error))
      res.status(500)
      hydrateOnClient()
    } else if (!routerState) {
      res.status(500)
      hydrateOnClient()
    } else {
      // Workaround redux-router query string issue:
      // https://github.com/rackt/redux-router/issues/106
      if (routerState.location.search && !routerState.location.query) {
        routerState.location.query = qs.parse(routerState.location.search)
      }

      store.getState().router.then(() => {
        const component = (
          <Provider store={store} key="provider">
            <ReduxRouter/>
          </Provider>
        )

        const status = getStatusFromRoutes(routerState.routes)
        if (status) {
          res.status(status)
        }
        res.send('<!doctype html>\n' +
          ReactDOM.renderToString(<Html assets={webpackIsomorphicTools.assets()} component={component} store={store}/>))
      }).catch((err) => {
        console.error('DATA FETCHING ERROR:', pretty.render(err))
        res.status(500)
        hydrateOnClient()
      })
    }
  }))
})

if (config.port) {
  // if (config.isProduction) {
  //   const io = new SocketIo(server)
  //   io.path('/api/ws')
  // }

  server.listen(config.port, (err) => {
    if (err) {
      console.error(err)
    }
    console.info('----\n==> ✅  %s is running, talking to API server on %s.', config.app.name, config.apiPort)
    console.info('==> 💻  Open http://localhost:%s in a browser to view the app.', config.port)
  })
} else {
  console.error('==>     ERROR: No PORT environment variable has been specified')
}

process.on('uncaughtException', function (err) {
  console.log('Caught exception: ');
  console.log(err);
})
