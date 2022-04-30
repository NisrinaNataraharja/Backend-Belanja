const express = require('express')
const productController = require('../controller/products')

const router = express.Router()
// -----> /products.....
router
  .get('/', productController.getProduct)
  .get('/:id', productController.detailProduct)
  .post('/', productController.insert)
  .put('/:id', productController.update)
  .delete('/:idproduct', productController.delete)

module.exports = router