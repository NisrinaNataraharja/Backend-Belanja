const express = require('express')
const transactionController = require('../controller/transaction')
const router = express.Router()
const { protect } = require('../middlewares/auth.js')

router
  .get('/', protect, transactionController.selectTransaction)
  .post('/', protect, transactionController.insertTransaction)
  .put('/:idTransaction', protect, transactionController.updateTransaction)
  .delete('/:idTransaction', protect, transactionController.deleteTransaction)

module.exports = router