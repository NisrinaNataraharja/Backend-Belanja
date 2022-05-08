const express = require('express')
const userCartController = require('../controller/cart')
const router = express.Router()

router
  .get('/', userCartController.selectCart)
  .post('/', userCartController.insertCart)
  .put('/:cartId', userCartController.updateCart)
  .delete('/:cartId', userCartController.deleteCart)

module.exports = router