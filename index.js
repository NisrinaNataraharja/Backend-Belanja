/* eslint-disable no-undef */
require('dotenv').config()

const express = require('express')
const helmet = require("helmet")
const cors = require('cors')
const createError = require('http-errors')
const morgan = require('morgan')
const categoryRouter = require('./src/routes/category')
const productsRouter = require('./src/routes/products')
const transactionRouter = require('./src/routes/transaction')
const userRouter = require('./src/routes/user')
const userAddressRouter = require('./src/routes/userAddress')
const cartRouter = require('./src/routes/cart')

const app = express()
const PORT = process.env.PORT || 5000
// middleware
app.use(express.json())
app.use(cors())
app.use(helmet())
app.use(morgan('dev'))


//
app.use('/category', categoryRouter)
app.use('/products', productsRouter)
app.use('/transaction', transactionRouter)
app.use('/user', userRouter)
app.use('/userAddress', userAddressRouter)
app.use('/cart', cartRouter)

app.all('*', (req, res, next) => {
  next(new createError.NotFound())
})

//next
app.use((err, req, res) => {
  const messError = err.message || 'Internal Server Error'
  const statusCode = err.status || 500

  res.status(statusCode).json({
    message: messError
  })
})

app.listen(PORT, () => {
  console.log(`Server starting on port ${PORT}`)
})

// eslint
// https://npm.io/package/eslint-config-standard