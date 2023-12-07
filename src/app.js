const express = require('express')
const morgan = require('morgan')
const app = express()
const compression = require('compression')
const { default: helmet} = require('helmet')

//init db
require('./dbs/init.mongodb')
const {checkOverload} = require('./helpers/check.connect')
checkOverload()
app.use(morgan("dev"))
app.use(helmet())
app.use(compression())
// morgan("combined")
// morgan("common")
// morgan("short")
// morgan("tiny")

app.get('/', (req, res, next) => {
  return res.status(200).json({
    message: 'Welcome to the ...'
  })
})
module.exports = app