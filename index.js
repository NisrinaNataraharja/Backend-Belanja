require('dotenv').config()
// const productController =  require('./src/controller/products')
// const commonMid = require('./src/middlewares/common')
// const categoryController = require('./src/controller/category')
// const getProduct = require('./src/controller/products')
const express = require('express')
const cors = require('cors')
const createError = require('http-errors')
const morgan = require('morgan')
const categoryRouter = require('./src/routes/category')
const productsRouter = require('./src/routes/products')
// const commonMid = require('./src/middlewares/common')

const app = express()
const PORT = process.env.PORT || 5000
// middleware
app.use(express.json())
app.use(cors())
app.use(morgan('dev'))

// app.use(commonMid.myCors)
// app.use(cors())
// app.use('/coba',commonMid.myMiddle)
// // app.use(myMiddle)

// app.get('/helo',commonMid.myMiddle, (req, res, next)=>{
//     res.send('hello word')
// })

// products
// app.get('/products',getProduct)
// app.post('/products', commonMid.validate, productController.insert)
// app.put('/products/:id', productController.update)
// app.delete('/products/:idproduct',productController.delete)

// category

// app.get('/category', categoryController.getCategory)
// app.post('/category', categoryController.insertCategory)
// app.put('/category/:id', categoryController.updateCategory)
// app.delete('/category/:id', categoryController.deleteCategory)
app.use('/category', categoryRouter)
app.use('/products', productsRouter)

app.all('*', (req, res, next) => {
  next(new createError.NotFound())
})

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

// eslint
// https://npm.io/package/eslint-config-standard