'use strict'

const express = require('express')
const { apiKey, permission } = require('../auth/checkAuth.js')
const { asyncHandler } = require('../auth/checkAuth.js')
const accessController = require('../controllers/access.controller')
const router = express.Router()

router.use(apiKey)
router.use(permission('0000'))
router.use('/v1/api/product', require('./product'))

router.use('/v1/api', require('./access'))
// router.get('', (req, res, next) => {
//     return res.status(200).json({
//         message: 'Welcome Fantipjs!'
//     })
// })
router.post('/shop/signup', asyncHandler(accessController.signUp))

module.exports = router