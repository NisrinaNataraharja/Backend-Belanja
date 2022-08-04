const express = require('express')
const userCartController = require('../controller/cart')
const { protect } = require('../middlewares/auth')
const router = express.Router()

router
  .get('/', protect, userCartController.getCart)
  .post('/', protect, userCartController.addCart)
  // .put('/:cartId', userCartController.updateCart)
  .delete('/:cartId', userCartController.deleteCart)

module.exports = router