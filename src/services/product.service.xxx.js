'use strict'

const {product, clothing, electronic, furniture} = require('../models/product.model')
const {BadRequestError, ForbiddenError} = require('../core/error.response')
const { findAllDraftsForShop, publishProductByShop, findAllPublishForShop, unPublishProductByShop, searchProductByUser, updateProductById } = require('../models/repositories/product.repo')
const { removeUndefinedObject, updateNestedOjectParser } = require('../utils')

// define Factory class to create product
class ProductFactory {

  static productRegistry = {} //key-class

  static registerProductType(type, classRef) {
    ProductFactory.productRegistry[type] = classRef
  }


  static async createProduct( type, payload ) {
    const productClass = ProductFactory.productRegistry[type]
    if(!product_type) throw new BadRequestError(`Invalid product type ${type}`)

    return new productClass (payload).createProduct()
  }

  static async updateProduct( type, payload, productId ) {
    const productClass = ProductFactory.productRegistry[type]
    if(!product_type) throw new BadRequestError(`Invalid product type ${type}`)

    return new productClass (payload).createProduct(productId)
  }

  //PUT 
  static async publishProductByShop({product_shop, product_id}){
    return await publishProductByShop({product_shop, product_id})
  }

  static async unPublishProductByShop({product_shop, product_id}){
    return await unPublishProductByShop({product_shop, product_id})
  }

  static async findAllDraftsForShop({ product_shop, limit = 50, skip = 0}) {
    const query = { product_shop, isDraft: true}
    return await findAllDraftsForShop({query, limit, skip})
  }

  static async findAllPubllishForShop({ product_shop, limit = 50, skip = 0}) {
    const query = { product_shop, isPublished: true}
    return await findAllDraftsForShop({query, limit, skip})
  }

  static async searchProduct ({keySearch}) {
    return await searchProductByUser({keySearch})
  }
  static async findAllProducts ({ limit = 50, sort = 'ctime', page = 1, filter = {isPublished: true} }) {
    return await findAllProducts({limit})
  }
  static async findProduct ({product_id}) {
    return await searchProductByUser({keySearch})
  }
}


class Product {
  constructor({
    product_name, product_thumb, product_description, product_price, product_quantity, product_type, product_shop, product_attributes 
  }){
    this.product_name = product_name;
    this.product_thumb = product_thumb;
    this.product_description = product_description;
    this.product_price = product_price;
    this.product_quantity = product_quantity;
    this.product_type = product_type;
    this.product_shop = product_shop;
    this.product_attributes = product_attributes;
  }

  //create new product
  async createProduct( product_id){
    const newProduct = await product.create({...this, _id: product_id})
    if(newProduct) {
      await insertInvetory({
        productId: newProduct._id
      })
    }
  }

  // update Product 
  async updateProduct( productId, bodyUpdate ){
    return await product.findByIdAndUpdate({productId, bodyUpdate, model: product})
  }

}

// define sub-class for different product types Clothing
class Clothing extends Product{
    async createProduct() {
      const newClothing = await clothing.create({...this.product_attributes,
        product_shop: this.product_shop})
      if(!newClothing) throw new BadRequestError('create new Clothing error')

      const newProduct = await super.createProduct(newClothing._id)
      if(!newProduct) throw new BadRequestError('create new Product error')

      return newProduct
    }

    async updateProduct(productId) {
      const objectParams = removeUndefinedObject(this)
      if(objectParams.product_attributes) {
        await updateProductById({
          productId, 
          bodyUpdate: updateNestedOjectParser(objectParams.product_attributes), 
          model: clothing})
      }
      const updatedProduct = await super.updateProduct(productId, updateNestedOjectParser(objectParams))
      return updatedProduct

  }
}

// define sub-class for different product types Electronic
class Electronics extends Product{
  async createProduct() {
   const newElectronic = await electronic.create({
    ...this.product_attributes,
    product_shop: this.product_shop
   })
   if(!newElectronic) throw new BadRequestError('create new electronic error')

   const newProduct = await super.createProduct(newElectronic._id)
   if(!newProduct) throw new BadRequestError('create new Product error')

   return newProduct
  }

  async updateProduct (productId) {

  }
}

class Furniture extends Product{
  async createProduct() {
   const newFurniture = await electronic.create({
    ...this.product_attributes,
    product_shop: this.product_shop
   })
   if(!newFurniture) throw new BadRequestError('create new electronic error')

   const newProduct = await super.createProduct(newFurniture._id)
   if(!newProduct) throw new BadRequestError('create new Product error')

   return newProduct
  }
}

// register product types
ProductFactory.registerProductType('Electronic', Electronics)
ProductFactory.registerProductType('Clothing', Clothing)
ProductFactory.registerProductType('Furniture', Furniture)

module.exports = ProductFactory;

