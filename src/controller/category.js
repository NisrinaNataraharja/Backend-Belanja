
const createError = require('http-errors')
const categoryModel = require('../models/category')
const commonHelper = require('../helper/common')
const errorServ = new createError.InternalServerError()

exports.getCategory = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1
    const limit = parseInt(req.query.limit) || 5
    const offset = (page - 1) * limit
    const result = await categoryModel.selectCategory({ offset, limit })

   
    const { rows: [count] } = await categoryModel.countCategory()
    const totalData = parseInt(count.total)
    const totalPage = Math.ceil(totalData / limit)
    const pagination = {
      currentPage: page,
      limit,
      totalData,
      totalPage
    }
    
    commonHelper.response(res, result.rows, 200, 'get data success', pagination)
  } catch (error) {
    console.log(error)
    next(errorServ)
  }
}

exports.insertCategory = (req, res, next) => {
  const { categoryName } = req.body

  const data = {
    categoryName
  }
  categoryModel.insertCategory(data)
    .then(() => {
      commonHelper.response(res, data, 201, 'insert data success')
    })
    .catch((error) => {
      console.log(error)
      next(errorServ)
    })
}

exports.updateCategory = (req, res, next) => {
  const idCategory = req.params.idCategory
  const categoryName = req.body.categoryName
  categoryModel.updateCategory({ idCategory, categoryName })
    .then(() => {
      commonHelper.response(res, categoryName, 202, 'update data success')
    })
    .catch((error) => {
      console.log(error)
      next(errorServ)
    })
}

exports.deleteCategory = (req, res, next) => {
  const idCategory = req.params.idCategory
  categoryModel.deleteCategory(idCategory)
    .then(() => {
      res.json({
        message: 'delete data success'
      })
    })
    .catch((error) => {
      console.log(error)
      next(new createError.InternalServerError())
    })
}
