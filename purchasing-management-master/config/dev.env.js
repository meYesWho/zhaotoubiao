'use strict'
const merge = require('webpack-merge')
// const prodEnv = require('./prod.env')

const devEnv = require('./dev.env')

module.exports = merge(devEnv, {
  NODE_ENV: '"development"',
  ENV_CONFIG: "'dev'",
  BASE_API: "'https://tender.firstcare.com.cn'"
})
