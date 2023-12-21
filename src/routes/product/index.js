'use strict';

const express = require('express');
const router = express.Router();
const { asyncHandler } = require('../../auth/checkAuth')
const { authenticationV2 } = require('../../auth/authUtils');
const productController = require('../../controllers/product.controller');

router.get('/search/:keySearch', asyncHandler(productController.getListSearchProduct))
router.get('', asyncHandler(productController.findAllProducts))
router.get('/:product_id', asyncHandler(productController.findProduct))

router.use(authenticationV2)
router.post('', asyncHandler(productController.createProduct))
router.patch('/:productId', asyncHandler(productController.updateProduct))
router.post('/publish/:id', asyncHandler(productController.publishProductByShop))
router.post('/unpublish/:id', asyncHandler(productController.unPublishProductByShop))

//QUERY
router.get('/drafts/all', asyncHandler(productController.getAllDraftsForShop))
router.get('/publisjed/all', asyncHandler(productController.getAllPublishForShop))

module.exports = router