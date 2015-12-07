module.exports = {
  development: {
    apiProxy: 'http://10.10.73.207:8088',
    fileProxy: 'http://10.10.73.208:8081',
    host: '10.10.73.4',
    oAuthServer: 'http://120.24.58.42:2001',
    oAuthRedirectUrl: 'http://10.10.73.4:3000/cb/login',
    oAuthRegRedirectUrl: 'http://10.10.73.4:3000/cb/reg',
    isProduction: false,
    port: process.env.PORT,
    apiPort: process.env.APIPORT,
    app: {
      name: 'React Redux Example Development'
    }
  },
  production: {
    apiProxy: 'http://10.10.73.207:8088',
    fileProxy: 'http://10.10.73.208:8081',
    host: '10.10.73.4',
    oAuthServer: 'http://120.24.58.42:2001',
    oAuthRedirectUrl: 'http://10.10.73.4:3000/cb/login',
    oAuthRegRedirectUrl: 'http://10.10.73.4:3000/cb/reg',
    isProduction: true,
    port: process.env.PORT,
    apiPort: process.env.APIPORT,
    app: {
      name: 'React Redux Example Production'
    }
  }
}[process.env.NODE_ENV || 'development']
