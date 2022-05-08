const createError = require('http-errors')
const cartModel = require('../models/cart')
const commonHelper = require('../helper/common')
const errorServ = new createError.InternalServerError()

exports.selectCart = async (req, res, next) => {
  try { 
    const page = parseInt(req.query.page) || 1
    const limit = parseInt(req.query.limit) || 5
    const offset = (page - 1) * limit
    const result = await cartModel.selectCart({ offset, limit })

    const { rows: [count] } = await cartModel.countCart()
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

exports.insertCart = (req, res, next) => {
  const { userId, productId, quantity, totalPrice } = req.body

  const data = {
    userId, 
    productId, 
    quantity, 
    totalPrice
  }
  cartModel.insertCart(data)
    .then(() => {
      commonHelper.response(res, data, 201, 'insert data success')
    })
    .catch((error) => {
      console.log(error)
      next(errorServ)
    })
}

exports.updateCart = (req, res, next) => {
  const cartId = req.params.cartId
  const { userId, productId, quantity, totalPrice } = req.body
  cartModel.updateCart({ cartId, userId, productId, quantity, totalPrice })
    .then(() => {
      res.json({
        message: 'update data success'
      })
    })
    .catch((error) => {
      console.log(error)
      next(errorServ)
    })
}

exports.deleteCart = (req, res, next) => {
  const cartId = req.params.cartId
  cartModel.deleteCart(cartId)
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
