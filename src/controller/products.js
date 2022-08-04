/* eslint-disable no-undef */
const createError = require('http-errors')
const productsModel = require('../models/products')
const commonHelper = require('../helper/common')
const errorServ = new createError.InternalServerError()
const cloudinary = require('../config/cloudinary')

// const client = require('../config/redis')
// exports.selectProducts = async (req, res, next) => {
//   try {
//     const page = parseInt(req.query.page) || 1
//     const limit = parseInt(req.query.limit) || 5
//     const offset = (page - 1) * limit
//     const result = await productsModel.selectProducts({ offset, limit })

//         const { rows: [count] } = await productsModel.countProducts()
//         const totalData = parseInt(count.total)
//         const totalPage = Math.ceil(totalData / limit)
//         const pagination = {
//           currentPage: page,
//           limit,
//           totalData,
//           totalPage
//         }

//         commonHelper.response(res, result.rows, 200, 'get data success', pagination)
//   } catch (error) {
//     console.log(error)
//     next(errorServ)
//   }
// }

exports.selectProductsWithCondition = async (req, res, next) => {
  try {
    const condition = req.query
    condition.search = condition.search || ''
    condition.page = parseInt(condition.page) || 1
    condition.limit = parseInt(condition.limit) || 6
    condition.offset = (condition.page * condition.limit) - condition.limit
    condition.sort = condition.sort || 'id'
    condition.order = condition.order || 'ASC'
    const result = await productsModel.selectProductWithCondition(condition)


    const { rows: [count] } = await productsModel.countProducts()
    const totalData = parseInt(count.total)
    const totalPage = Math.ceil(totalData / condition.limit)
    const pagination = {
      currentPage: condition.page,
      limit: condition.limit,
      totalData,
      totalPage
    }

    commonHelper.response(res, result.rows, 200, 'get data success', pagination)
  } catch (error) {
    console.log(error)
    next(errorServ)
  }
}

exports.detailProduct = (req, res, next) => {
  const id = req.params.id
  productsModel
    .getProductById(id)
    .then((result) => {
      commonHelper.response(res, result.rows, 200, 'get data by id success')
    })
    .catch((error) => {
      console.log(error)
      next(createError)
    })
}
// exports.detailProduct = async (req, res) => {
//   try {
//     const id = req.params.id;
//     const { rows: [product] } = await productsModel.getProductById(id);
//     client.setEx(`product/${id}`, 60*60, JSON.stringify(product))

//     commonHelper.response(res, product, 200, 'get data dari database')
//   } catch (error) {
//     console.log(error);
//   }

// };

exports.insertProducts = async (req, res, next) => {
  try {
    console.log(req.file);
    const { categoryid, nameproduct, description, rating, price, stock, size, color, condition, seller, brand, status, isarchieve, created_at } = req.body
    // const image = JSON.parse(req.body.image)
    let image
    if (req.files.image) {
      image = req.files.image[0].path
      // image = `${process.env.HOST_LOCAL_IMAGE}image/${req.files.image[0].filename}`
      const url = await new Promise((resolve, reject) => {
        cloudinary.uploader.upload(image, { folder: 'belanja/product' }, function (error, result) {
          if (result) {
            resolve(result.url)
          } else if (error) {
            reject(error)
          }
        })
      })
      image = url
    }
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
      created_at,
      image
      // : JSON.stringify(
      //   image.map((item) => `${process.env.HOST}/image/${item.image}`))
    }
    console.log(data);
    await productsModel.insertProducts(data)
    commonHelper.response(res, data, 201, 'insert data success')
  } catch (error) {
    console.log(error)
    next(errorServ)
  }
}


exports.updateProducts = async (req, res, next) => {
  try {
    const id = req.params.id
    const { categoryid, nameproduct, description, rating, price, stock, size, color, condition, seller, brand, status, isarchieve, created_at } = req.body
    // const image = JSON.parse(req.body.image)
    // console.log(image.length);
    let image
    if (req.files.image) {
      image = req.files.image[0].path
      // image = `${process.env.HOST_LOCAL_IMAGE}image/${req.files.image[0].filename}`
      const url = await new Promise((resolve, reject) => {
        cloudinary.uploader.upload(image, { folder: 'belanja/product' }, function (error, result) {
          if (result) {
            resolve(result.url)
          } else if (error) {
            reject(error)
          }
        })
      })
      image = url
    }
    const data = {
      id,
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
      created_at,
      image
      // : image.length > 0 ? JSON.stringify(image.map((item) => `${process.env.HOST}/image/${item.image}`)) : undefined

    }
    await productsModel.updateProducts(data)
    commonHelper.response(res, data, 202, 'update data success')
  } catch (error) {
    console.log(error)
    next(errorServ)
  }

}

exports.deleteProducts = (req, res, next) => {
  const id = req.params.id
  productsModel.deleteProducts(id)
    .then(() => {
      commonHelper.response(res, null, 203, 'delete data success')
    })
    .catch((error) => {
      console.log(error)
      next(new createError.InternalServerError())
    })
}


