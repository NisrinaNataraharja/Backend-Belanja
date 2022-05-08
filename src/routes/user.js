const express = require('express')
const userController = require('../controller/user')
const router = express.Router()

router
  .get('/', userController.selectUser)
  .post('/', userController.insertUser)
  .put('/:id', userController.updateUser)
  .delete('/:id', userController.deleteUser)

module.exports = router