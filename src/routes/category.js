const express = require('express')
const router = express.Router()
const categoryControler = require('../controller/category')

//  ----> /category.....
router
  .get('/', categoryControler.getCategory)
  .post('/', categoryControler.insertCategory)
// .put('/:id', categoryControler.updateCategory)
  .delete('/:id', categoryControler.deleteCategory)

module.exports = router