'use strict';

const express = require('express');
const accessController = require('../../controllers/access.controller');
const router = express.Router();
const { asyncHandler } = require('../../auth/checkAuth')

router.post('/shop/signup', accessController.signUp)
router.post('/shop/login', accessController.login)

///authentication

router.post('/shop/handlerRefreshToken', accessController.logout)

module.exports = router