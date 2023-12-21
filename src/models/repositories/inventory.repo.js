'use strict';

const { inventory } = require('../inventory.model');
const { Types } = require('mongoose')

const insertInvetory = async({
  productId, shopId, stock, location = 'unknown',
}) => {
  return await inventory.create({
    inven_productId: productId,
    inven_stock: stock,
    inven_location: location,
    inven_shopId: shopId,
  })
}

module.exports = { insertInvetory }