const express = require('express')
const router = express.Router()
const categoryControler = require('../controller/category')
const { protect, isAdmin } = require('../middlewares/auth')

router
  .get('/', categoryControler.getCategory)
  .post('/', protect, isAdmin, categoryControler.insertCategory)
  .put('/:idCategory', protect, isAdmin, categoryControler.updateCategory)
  .delete('/:idCategory', protect, isAdmin, categoryControler.deleteCategory)

module.exports = router