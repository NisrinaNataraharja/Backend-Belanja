const express = require('express')
const router = express.Router()
const productController = require('../controller/products')
// const { protect, isSeller } = require('../middlewares/auth')
const middUpload = require('../middlewares/upload')
// const { hitCacheProductDetail } = require('../middlewares/redis')

router
  .get('/', productController.selectProductsWithCondition)
  .get('/:id',  productController.detailProduct)
  .post('/', middUpload, productController.insertProducts)
  .put('/:id', middUpload, productController.updateProducts)
  .delete('/:id',productController.deleteProducts)

module.exports = router
// , protect, isSeller
//protect, isSeller,
// hitCacheProductDetail,
// protect, isSeller,