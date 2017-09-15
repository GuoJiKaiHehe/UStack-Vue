var merge = require('webpack-merge')
var prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  API_ROOT: '"http://localhost:8888/api/"',
  MAP_KEY : '"oT44OLv8E00AsvUkcZPNZ78EyTDalnnU"',
  COOKIE_DOMAIN:  '"http://127.0.0.1"',
})
