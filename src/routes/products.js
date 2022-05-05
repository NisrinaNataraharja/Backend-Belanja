const express = require('express')
const productController = require('../controller/products')

const router = express.Router()
// -----> /products.....
router
 .get('/', productController.selectProducts)
//   //.get('/:id', productController.detailProduct)
  .post('/', productController.insertProducts)
  .put('/:id', productController.updateProducts)
  .delete('/:id', productController.deleteProducts)

module.exports = router