const express = require('express')
const morgan = require('morgan')
const app = express()

app.use(morgan("dev"))
morgan("combined")
morgan("common")
morgan("short")
morgan("tiny")
module.exports = app