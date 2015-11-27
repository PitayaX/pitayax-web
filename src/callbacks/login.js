import qs from 'querystring'
import { aq } from 'pitayax-service-core'
import cookie from 'cookie'
import config from '../config'

let COOKIES = []

let REFRESH_TOKEN_TIME = 0

const oAuthLoginUri = config.oAuthServer + '/remote/auth'
const oAuthTokenUri = config.oAuthServer + '/token'
const passcode = '56tyghbn./-='
const clientID = 'pitayax-web'
const grantType = 'authorization_code'

export default
function login (req, res) {

  COOKIES = []

  aq.rest(oAuthLoginUri, "POST", {
    passcode,
    clientID
  }, {
    email: req.body.userName,
    password: req.body.password
  })
  .then(function (data) {

    convertCodeToToken(data.code, req, res)

  })
 .catch(function (e) {

   const resBody={}
   resBody.error=e.error || '登录失败！'
   res.writeHead(200, { 'Content-Type': 'application/json' })
   res.end(JSON.stringify(resBody))

 })
}

export function refreshToken (req, res) {

  REFRESH_TOKEN_TIME++

  const cookies = cookie.parse(req.headers.cookie)

  aq.rest(oAuthTokenUri, "POST", {}, {
    refresh_token: cookies.access_token,
    grant_type: 'refresh_token'
  })
  .then(data => {

    const resBody={}

    if (data.error) {

      res.writeHead(200, { 'Content-Type': 'application/json' })
      resBody.error=data.error

    } else {

      const tokenInfo = data.data

      const expiresMSeconds = Number(tokenInfo.expires_in) * 1000
      resBody.refreshTokenInterval=expiresMSeconds
      writeHeaderInfo(res, tokenInfo)

    }
    res.end(JSON.stringify(resBody))

  })
  .catch(e => {

    const resBody={}
    res.writeHead(200, { 'Content-Type': 'application/json' })
    resBody.error=e.error || '超时'
    res.end(JSON.stringify(resBody))

  })
}

export function logout (req, res) {

  const cookies = cookie.parse(req.headers.cookie)
  const oAuthLogoutUri = config.oAuthServer + '/signout'

  aq.rest(oAuthLogoutUri, "POST", {}, {
    'token': cookies.access_token,
    'client_id': clientID
  })
  .then(data => {
    console.log("logout success")
    console.log(data)
  })
  .catch(e => {
    console.log("logout failed")
    console.log(e)
  })



  const expires =  new Date()
  expires.setDate(expires.getDate() - 1)
  res.setHeader('Set-Cookie', cookie.serialize('access_token', '', { httpOnly: true, path: '/', expires }))
  res.writeHead(200, { 'Content-Type': 'text/plain' })
  res.end('')

}



function convertCodeToToken (code, req, res) {

  aq.rest(oAuthTokenUri, "POST", {}, {
    code,
    grant_type: grantType,
    client_id: clientID,
    redirect_uri: ''
  })
  .then(data => {

    const resBody={}


    if (data.error) {

      res.writeHead(200, { 'Content-Type': 'application/json' })
      resBody.error=data.error

    } else {

      const tokenInfo = data.data

      const expiresMSeconds = Number(tokenInfo.expires_in) * 1000
      resBody.nickName=tokenInfo.nickname
      resBody.userID=tokenInfo.userid
      resBody.refreshTokenInterval=expiresMSeconds
      writeHeaderInfo(res, tokenInfo)

    }

    res.end(JSON.stringify(resBody))

  })
  .catch(e => {

    const resBody={}
    res.writeHead(200, { 'Content-Type': 'application/json' })
    resBody.error=e.error || '登录失败！'
    res.end(JSON.stringify(resBody))

  })

}


function writeHeaderInfo (res, tokenInfo) {

  const expires =  new Date()
  const expiresMSeconds = (Number(tokenInfo.expires_in) || 0) * 1000
  expires.setTime(expires.getTime() + expiresMSeconds)
  COOKIES.push(cookie.serialize('access_token', tokenInfo.access_token, { httpOnly: true, path: '/', expires }))
  res.setHeader('Set-Cookie', COOKIES)
  res.writeHead(200, { 'Content-Type': 'application/json' })

}
