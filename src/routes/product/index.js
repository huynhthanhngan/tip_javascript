'use strict';

const express = require('express');
const router = express.Router();
const { asyncHandler } = require('../../auth/checkAuth')
const { authenticationV2 } = require('../../auth/authUtils');
const productController = require('../../controllers/product.controller');

router.use(authenticationV2)
router.post('', asyncHandler(productController.createProduct))

module.exports = router