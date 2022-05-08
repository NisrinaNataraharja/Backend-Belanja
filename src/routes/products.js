const express = require('express')
const productController = require('../controller/products')

const router = express.Router()

router
 .get('/', productController.selectProductsWithCondition)
  .post('/', productController.insertProducts)
  .put('/:id', productController.updateProducts)
  .delete('/:id', productController.deleteProducts)

module.exports = router