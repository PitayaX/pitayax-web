module.exports = {
  development: {
    apiProxy: 'http://localhost',
    fileProxy: 'http://localhost',
    host: 'http://localhost',
    oAuthServer: 'http://localhost',
    oAuthRedirectUrl: 'http://localhost',
    oAuthRegRedirectUrl: 'http://localhost',
    isProduction: false,
    port: process.env.PORT,
    apiPort: process.env.APIPORT,
    app: {
      name: 'React Redux Example Development'
    }
  },
  production: {
    apiProxy: 'http://localhost',
    fileProxy: 'http://localhost',
    host: 'http://localhost',
    oAuthServer: 'http://localhost',
    oAuthRedirectUrl: 'http://localhost',
    oAuthRegRedirectUrl: 'http://localhost',
    isProduction: true,
    port: process.env.PORT,
    apiPort: process.env.APIPORT,
    app: {
      name: 'React Redux Example Production'
    }
  }
}[process.env.NODE_ENV || 'development']
