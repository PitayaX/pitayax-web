import loginOAuthCB, { refreshToken } from './loginOAuthCB'






export default function callback (req, res) {
  switch (req.url.split('?')[0]) {
  case '/login':
    loginOAuthCB(req, res)
    break
  case '/refresh':
    refreshToken(req, res)
    break
  default:
  }
}
