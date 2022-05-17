/* eslint-disable no-undef */
require('dotenv').config()

const express = require('express')
const helmet = require("helmet")
const cors = require('cors')
const createError = require('http-errors')
const morgan = require('morgan')
const mainRoute = require('./src/routes')
const xss = require('xss-clean')
const path = require('path')
// const categoryRouter = require('./src/routes/category')
// const productsRouter = require('./src/routes/products')
// const transactionRouter = require('./src/routes/transaction')
// const userRouter = require('./src/routes/user')
// const userAddressRouter = require('./src/routes/userAddress')
// const cartRouter = require('./src/routes/cart')

const app = express()
const PORT = process.env.PORT || 5000

app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(cors())
app.use(helmet())
app.use(morgan('dev'))
app.use(xss())



//
app.use('/v1', mainRoute)
// app.use('/category', categoryRouter)
// app.use('/products', productsRouter)
// app.use('/transaction', transactionRouter)
// app.use('/user', userRouter)
// app.use('/userAddress', userAddressRouter)
// app.use('/cart', cartRouter)

app.use('/image', express.static(path.join(__dirname, '/upload')))
app.all('*', (req, res, next) => {
  next(new createError.NotFound())
})


// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  const messError = err.message || 'Internal Server Error'
  const statusCode = err.status || 500
  res.status(statusCode).json({
    message: messError
  })
})

app.listen(PORT, () => {
  console.log(`Server starting on port ${PORT}`)
})

