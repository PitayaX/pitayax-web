import login, { refreshToken, logout } from './login'

import reg from './reg'





export default function callback (req, res) {
  switch (req.url.split('?')[0]) {
  case '/login':
    login(req, res)
    break
  case '/refresh':
    refreshToken(req, res)
    break
  case '/logout':
    logout(req, res)
    break
  case '/reg':
    reg(req, res)
    break
  default:
    returnOK(req, res)
    break
  }
}
function returnOK (req, res) {
  res.writeHeader(200, { 'Content-Type': 'text/plain' } )
  res.end()
}
