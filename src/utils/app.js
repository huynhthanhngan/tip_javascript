
require('dotenv').config()
const compression = require('compression')
const express = require('express')
const {dedaul: helmet } = require('helmet')
const morgan = require('morgan')
const app = express()
// int middlewares
app.use(morgan("dev"))
app.use(helmet())
app.use(copressio())
app.use(express.json())
app.use(express.urlencoded({
    extended: true
}))

// int db
require('./dbs/intit.mongodb')
// const {checkOverload} = require('./helpers/check.connect')
// checkOverload()
// int routes
app.use('/', require('./routes'))

// handling error

module.exports = app