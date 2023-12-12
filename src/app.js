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
app.use(express.json())
app.use(express.urlencoded({
  extended: true
}))
// morgan("combined")
// morgan("common")
// morgan("short")
// morgan("tiny")

// app.get('/', (req, res, next) => {
//   return res.status(200).json({
//     message: 'Welcome to the ...'
//   })
// })

app.use('/', require('./routes'))

//handling errors
app.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})

app.use((error, req, res, next) => {
  const statusCode = error.status || 500
  return res.status(statusCode).json({
    status: 'error',
    code: statusCode,
    message: error.message || 'Internal Server Error'
  })
})
module.exports = app