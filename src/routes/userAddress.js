const express = require('express')
const userAddressController = require('../controller/userAddress')
const router = express.Router()

router
  .get('/', userAddressController.selectUserAddress)
  .post('/', userAddressController.insertUserAddress)
  .put('/:id', userAddressController.updateUserAddress)
  .delete('/:id', userAddressController.deleteUserAddress)

module.exports = router