import qs from 'querystring'
import { aq } from 'pitayax-service-core'
import cookie from 'cookie'
import config from '../config'

let COOKIES = []


const oAuthLoginUri = config.oAuthServer + '/remote/auth'
const oAuthTokenUri = config.oAuthServer + '/token'
const passcode = '56tyghbn./-='
const clientID = 'pitayax-web'
const grantType = 'authorization_code'

export default
function login (req, res) {

  console.log('here is login callback')

  COOKIES = []

  aq.rest(oAuthLoginUri, "POST", {
    passcode,
    clientID
  }, {
    email: req.body.userName,
    password: req.body.password
  })
  .then(function (data) {

    console.log('here is succ')
    console.log("data.code: "+data.code)

    convertCodeToToken(data.code, req, res)

  })
 .catch(function (e) {
   console.log('here is get code failed')
   console.log(e)

   const resBody={}
   resBody.error='用户名或密码错误！'
   res.writeHead(200, { 'Content-Type': 'application/json' })
   res.end(JSON.stringify(resBody))

 })
}

export function refreshToken (req, res) {

  console.log('here is refreshToken')

  const cookies = cookie.parse(req.headers.cookie)

  if (!req.headers.cookie) {
    res.writeHead(200, { 'Content-Type': 'application/json' })
    res()
  }

  console.log('refresh before: '+ cookies.access_token)

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

      console.log('refresh after: '+ tokenInfo.access_token)

      const expiresMSeconds = Number(tokenInfo.expires_in) * 1000
      // const expiresMSeconds = 5000
      resBody.refreshTokenInterval=expiresMSeconds
      writeHeaderInfo(res, tokenInfo)

    }
    res.end(JSON.stringify(resBody))

  })
  .catch(e => {

    console.log('here is get refresh token failed')
    console.log(e)

    const resBody={}
    res.writeHead(200, { 'Content-Type': 'application/json' })
    resBody.error=e.error.description || '超时'
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

  console.log(code)
  console.log(grantType)
  console.log(clientID)
  aq.rest(oAuthTokenUri, "POST", {}, {
    code,
    grant_type: grantType,
    client_id: clientID,
    redirect_uri: ''
  })
  .then(data => {

    console.log('here is convert succ')

    const resBody={}


    if (data.error) {

      res.writeHead(200, { 'Content-Type': 'application/json' })
      resBody.error=data.error

    } else {

      const tokenInfo = data.data

      const expiresMSeconds = Number(tokenInfo.expires_in) * 1000
      // const expiresMSeconds = 5000
      resBody.nickName=tokenInfo.nickname
      resBody.userId=tokenInfo.userid
      resBody.refreshTokenInterval=expiresMSeconds
      writeHeaderInfo(res, tokenInfo)

    }

    res.end(JSON.stringify(resBody))

  })
  .catch(e => {

    console.log('here is get convert code to token failed')
    console.log(e)

    const resBody={}
    res.writeHead(200, { 'Content-Type': 'application/json' })
    resBody.error = '用户名或密码错误！'
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
