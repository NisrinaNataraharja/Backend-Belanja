const express = require('express')
const transactionController = require('../controller/transaction')
const router = express.Router()

router
  .get('/', transactionController.selectTransaction)
  .post('/', transactionController.insertTransaction)
  .put('/:idTransaction', transactionController.updateTransaction)
  .delete('/:idTransaction', transactionController.deleteTransaction)

module.exports = router