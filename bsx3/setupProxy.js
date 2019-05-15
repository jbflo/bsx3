const proxy = require('http-proxy-middleware')
 
module.exports = function(app) {
  app.use(proxy('/bsxcube/api/v0.1', { target: 'http://localhost:8080/',
                          logLevel: "debug",
                          changeOrigin: true
                        }))
}
