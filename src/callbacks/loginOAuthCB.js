import http from 'http'
import qs from 'querystring'
import { aq as aq } from 'pitayax-service-core'
import cookie from 'cookie'

let COOKIES = []
const COOKIE_KEY = 'Set-Cookie'


export default function loginOAuthSuccess (req, res) {


  COOKIES = req.headers[COOKIE_KEY] || []

  // ... send http post to get oAuth token

  getOAuthToken(req.query.code, (tokenInfo) => {
    const expires =  new Date()
    const expiresMSeconds = (Number(tokenInfo.expires_in) || 0) * 1000
    expires.setTime(expires.getTime() + expiresMSeconds)

    // ... notice client login success to close the modal

    setCookie('access_token', tokenInfo.access_token, { httpOnly: true, path: '/', expires })

    writeCookie(res)
    res.writeHead(200, { 'Content-Type': 'text/html' })
    res.end("<script>window.top.refreshToken(10000)</script>")
    // res.end("<script>window.top.refreshToken(" +expiresMSeconds+ ")</script>")
  })
}

function getOAuthToken (code, SUCC_callback) {
  const post_data = JSON.stringify({
    code,
    grant_type: "authorization_code",
    client_id: "pitayax-web",
    redirect_uri: "http://10.10.71.43:3000/cb/login"
  })
  const post_options = {
    protocol: 'http:',
    host: '120.24.58.42',
    port: '2001',
    path: '/token',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    }
  }
  const post_req =  http.request(post_options, function (post_res) {
    post_res.setEncoding('utf8')
    let body = ''
    post_res.on('data', function (chunk) {
      body += chunk
    })
    post_res.on('end', function () {
      body = JSON.parse(body)
      SUCC_callback(body)
    })

    post_res.on('error', function (e) {
      console.log("problem to get token: " + e.message)
    })
  })
  post_req.write(post_data)
  post_req.end()
}

function writeCookie (res) {
  res.setHeader(COOKIE_KEY, COOKIES)
}

function setCookie ( name, value, options ) {
  const cookies = COOKIES
  const cookie = [ name, "=", value, ";" ]

  options = options || {}

  if ( options.expires ) {
    cookie.push( " expires=", options.expires.toUTCString(), ";" )
  }

  if ( options.path ) {
    cookie.push( " path=", options.path, ";" )
  }

  if ( options.domain ) {
    cookie.push( " domain=", options.domain, ";" )
  }

  if ( options.secure ) {
    cookie.push( " secure", ";" )
  }

  if ( options.httpOnly ) {

    cookie.push( " httponly" )
  }
  cookies.push(cookie.join(""))
}

export function refreshToken (req, res) {



  const cookies = cookie.parse(req.headers.cookie)

  console.log("refresh before: " + cookies.access_token)

  refreshOAuthToken({
    refresh_token: cookies.access_token,
    grant_type: 'refresh_token'
  }, tokenInfo => {

    const expires =  new Date()
    const expiresMSeconds = (Number(tokenInfo.expires_in) || 0) * 1000
    expires.setTime(expires.getTime() + expiresMSeconds)

    // ... notice client login success to close the modal

    setCookie('access_token', tokenInfo.access_token, { httpOnly: true, path: '/', expires })

    console.log("refresh after: " + tokenInfo.access_token)

    writeCookie(res)

    res.writeHead(200, { 'Content-Type': 'text/plain' })

    // res.end("<script>window.top.refreshToken(" +expiresMSeconds+ ")</script>")
    res.end("window.top.refreshToken(10000)")
  })
}


function refreshOAuthToken (body, SUCC_callback) {

  const post_data = JSON.stringify(body)
  const post_options = {
    protocol: 'http:',
    host: '120.24.58.42',
    port: '2001',
    path: '/token',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    }
  }
  const post_req =  http.request(post_options, function (post_res) {
    post_res.setEncoding('utf8')
    let body = ''
    post_res.on('data', function (chunk) {
      body += chunk
    })
    post_res.on('end', function () {
      body = JSON.parse(body)
      SUCC_callback(body)
    })

    post_res.on('error', function (e) {
      console.log("problem to get token: " + e.message)
    })
  })
  post_req.write(post_data)
  post_req.end()
}
