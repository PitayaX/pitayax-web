module.exports = {
  development: {
    host: 'http://10.10.73.16',
    oAuthServer: 'http://120.24.58.42:2001',
    oAuthRedirectUrl: 'http://10.10.73.16:3000/cb/login',
    oAuthRegRedirectUrl: 'http://10.10.73.16:3000/cb/reg',
    isProduction: false,
    port: process.env.PORT,
    apiPort: process.env.APIPORT,
    app: {
      name: 'React Redux Example Development'
    }
  },
  production: {
    host: 'http://10.10.73.16',
    oAuthServer: 'http://120.24.58.42:2001',
    oAuthRedirectUrl: 'http://10.10.73.16:3000/cb/login',
    oAuthRegRedirectUrl: 'http://10.10.73.16:3000/cb/reg',
    isProduction: true,
    port: process.env.PORT,
    apiPort: process.env.APIPORT,
    app: {
      name: 'React Redux Example Production'
    }
  }
}[process.env.NODE_ENV || 'development']
