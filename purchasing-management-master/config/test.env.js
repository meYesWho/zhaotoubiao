'use strict'
const merge = require('webpack-merge')
const devEnv = require('./dev.env')

module.exports = merge(devEnv, {
  NODE_ENV: '"test"',
  ENV_CONFIG: "'test'",
  BASE_API: "'https://testtender.firstcare.com.cnn'"
})
