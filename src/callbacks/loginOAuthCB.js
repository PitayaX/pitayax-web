import qs from 'querystring'
import { aq } from 'pitayax-service-core'
import cookie from 'cookie'
import config from '../config'

let COOKIES = []
const oAuthTokenUri = config.oAuthServer + '/token'

export default function loginOAuthSuccess (req, res) {

  COOKIES = req.headers['Set-Cookie'] || []
  postToOAuth(oAuthTokenUri, {
    code: req.query.code,
    grant_type: "authorization_code",
    client_id: "pitayax-web",
    redirect_uri: config.oAuthRedirectUrl
  }, tokenInfo => {
    // ... notice client login success to close the modal
    if (tokenInfo.error) {
      res.writeHead(200, { 'Content-Type': 'text/plain' })
      res.end("login failed:"+ tokenInfo.error)
    } else {
      writeHeaderInfo(res, tokenInfo)
      // res.end("<script>window.top.refreshToken(5000)</script>")
      res.end("<script>window.top.refreshToken(" +expiresMSeconds+ ")</script>")
    }
  })
}

export function refreshToken (req, res) {
  const cookies = cookie.parse(req.headers.cookie)

  postToOAuth(oAuthTokenUri, {
    "refresh_token": cookies.access_token,
    "grant_type": 'refresh_token'
  }, tokenInfo => {
    if (tokenInfo.error) {
      res.writeHead(200, { 'Content-Type': 'text/html' })
      res.end("window.top.refreshTokenFailed")
    } else {
      writeHeaderInfo(res, tokenInfo)
      res.end("<script>window.top.refreshToken(" +expiresMSeconds+ ")</script>")
      // res.end("window.top.refreshToken(5000)")
    }
  })
}


function writeHeaderInfo (res, tokenInfo) {
  const expires =  new Date()
  const expiresMSeconds = (Number(tokenInfo.expires_in) || 0) * 1000
  expires.setTime(expires.getTime() + expiresMSeconds)
  COOKIES.push(cookie.serialize('access_token', tokenInfo.access_token, { httpOnly: true, path: '/', expires }))
  res.setHeader('Set-Cookie', COOKIES)
  res.writeHead(200, { 'Content-Type': 'text/html' })
}


function postToOAuth (uri, data, cb) {
  aq.rest(uri, "POST", {}, data)
  .then(data => {
    if (data.error) {
      console.log("get token failed: " + data.error)
      cb(data)
    }else {
      cb(data.data)
    }
  })
  .catch(e => console.log(e))
}
