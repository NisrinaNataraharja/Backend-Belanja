const express = require('express')
const router = express.Router()
const categoryRouter = require('./category')
const productsRouter = require('./products')
const transactionRouter = require('./transaction')
const userRouter = require('./user')
const userAddressRouter = require('./userAddress')
const cartRouter = require('./cart')


 router
    .use('/category',categoryRouter)
    .use('/products', productsRouter)
    .use('/transaction', transactionRouter)
    .use('/user', userRouter)
    .use('/userAddress', userAddressRouter)
    .use('/cart', cartRouter)

module.exports = router