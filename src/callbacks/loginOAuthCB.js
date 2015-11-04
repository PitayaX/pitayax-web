import http from 'http'
import qs from 'querystring'

let COOKIES = []
const COOKIE_KEY = 'Set-Cookie'


export default function loginOAuthSuccess (req, res) {

  COOKIES = req.headers[COOKIE_KEY] || []

  // ... send http post to get oAuth token

  getOAuthToken(req.query.code, (tokenInfo) => {
    const expires =  new Date()
    expires.setDate(expires.getDate() + 1)

    // ... notice client login success to close the modal

    setCookie('token', tokenInfo.access_token, { httpOnly: true, expires })
    writeCookie(res)
    res.writeHead(200, { 'Content-Type': 'text/plain' })
    res.end()
  })
}

function getOAuthToken (code, SUCC_callback) {
  let tokenInfo
  const post_data = JSON.stringify({
    code,
    grant_type: "authorization_code",
    client_id: "Blog",
    redirect_uri: "http://localhost:3000/cb/login"

  })
  const post_options = {
    protocol: 'http:',
    host: '10.10.73.28',
    port: '8001',
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
