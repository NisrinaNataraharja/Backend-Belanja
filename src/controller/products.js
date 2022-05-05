const createError = require('http-errors')
const productsModel = require('../models/products')
const commonHelper = require('../helper/common')
const errorServ = new createError.InternalServerError()

exports.selectProducts = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1
    const limit = parseInt(req.query.limit) || 5
    const offset = (page - 1) * limit
    const result = await productsModel.selectProducts({ offset, limit })

        // paginatino
        const { rows: [count] } = await productsModel.countProducts()
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

exports.insertProducts = (req, res, next) => {
  const { categoryid, nameproduct, description, rating, price, stock, size, color, condition, seller, brand, status, isarchieve, created_at } = req.body

  const data = {
    categoryid,
    nameproduct,
    description,
    rating,
    price,
    stock,
    size,
    color,
    condition,
    seller,
    brand,
    status,
    isarchieve,
    created_at
  }
  productsModel.insertProducts(data)
    .then(() => {
      commonHelper.response(res, data, 201, 'insert data success')
    })
    .catch((error) => {
      console.log(error)
      next(errorServ)
    })
}

exports.updateProducts = (req, res, next) => {
  const id = req.params.id
  const { categoryid, nameproduct, description, rating, price, stock, size, color, condition, seller, brand, status, isarchieve, created_at } = req.body
  productsModel.updateProducts({ id, categoryid, nameproduct, description, rating, price, stock, size, color, 
    condition, seller, brand, status, isarchieve, created_at})
    .then(() => {
      res.json({
        message: 'data berhasil di update'
      })
    })
    .catch((error) => {
      console.log(error)
      next(errorServ)
    })
}

exports.deleteProducts = (req, res, next) => {
  const id = req.params.id
  productsModel.deleteProducts(id)
    .then(() => {
      res.json({
        message: 'data berhasil di hapus'
      })
    })
    .catch((error) => {
      console.log(error)
      next(new createError.InternalServerError())
    })
}


