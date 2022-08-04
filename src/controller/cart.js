/* eslint-disable no-undef */
const createError = require('http-errors')
const cartModel = require('../models/cart')
const jwt = require('jsonwebtoken')
const {response} = require('../helper/common')
const errorServ = new createError.InternalServerError()

exports.getCart = async (req, res, next) => {
  try {
    let token = req.headers.authorization.split(' ')[1];
    let decoded = jwt.verify(token, process.env.SECRET_KEY_JWT);
    const id = decoded.id
    const result = await cartModel.getCart(id)

    response(res, result.rows, 200, 'Get Cart Success')
  } catch (error) {
    console.log(error)
    next(errorServ)
  }
},

exports.addCart = async (req, res, next) => {
  try {
    let token = req.headers.authorization.split(' ')[1];
    let decoded = jwt.verify(token, process.env.SECRET_KEY_JWT);
    const userId = decoded.id
    
    const { productId, quantity } = req.body
    console.log('ini id projek untuk keranjang');
    console.log(productId)
    const data = {
      userId,
      productId,
      quantity
    }
    const checkId = await cartModel.checkProductId(data.productId, data.userId)
    //   console.log(checkId.rowCount)
    if (checkId.rowCount) {
      const cart = checkId.rows[0]
      const quantity = cart.quantity + 1
      await cartModel.updateCartStock(cart.cartId, quantity)
      return response(res, { ...cart, quantity }, 200, 'Add to cart success')
    }

    await cartModel.insertCart(data)

    response(res, data, 200, 'ADD CART SUCCESS')
  } catch (error) {
    console.log(error)
    next(errorServ)
  }
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


