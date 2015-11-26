import loginOAuthCB, { refreshToken, oAuthLogout } from './loginOAuthCB'






export default function callback (req, res) {
  switch (req.url.split('?')[0]) {
  case '/login':
    loginOAuthCB(req, res)
    break
  case '/refresh':
    refreshToken(req, res)
    break
  case '/logout':
    oAuthLogout(req, res)
    break
  default:
  }
}
