'use strict';

const { model, Schema, Types } = require('mongoose');

const DOCUMENT_NAME = 'Inventory'
const COLECTION_NAME = 'Inventories'

const inventorySchema = new Schema ({
    inven_productId: { type: Schema.Types.ObjectId, ref: 'Product'},
    inven_location: { type: String, default: 'unknown'},
    inven_stock: { type: Number, require: true},
    inven_shopId: { type: Schema.Types.ObjectId, ref: 'Shop'},
    inven_shopId: { type: Schema.Types.ObjectId, ref: 'Shop'},
    inven_reservations: { type: Array, default: []},
  },{
  timestamps: true,
  collection: COLECTION_NAME,
})

module.exports = inventory(DOCUMENT_NAME, inventorySchema)