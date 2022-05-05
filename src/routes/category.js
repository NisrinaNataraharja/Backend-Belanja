const express = require('express')
const router = express.Router()
const categoryControler = require('../controller/category')

//  ----> /category.....
router
  .get('/', categoryControler.getCategory)
  .post('/', categoryControler.insertCategory)
  .put('/:idCategory', categoryControler.updateCategory)
  .delete('/:idCategory', categoryControler.deleteCategory)

module.exports = router