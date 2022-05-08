const createError = require('http-errors')
const userAddressModel = require('../models/userAddress')
const commonHelper = require('../helper/common')
const errorServ = new createError.InternalServerError()

exports.selectUserAddress = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1
    const limit = parseInt(req.query.limit) || 5
    const offset = (page - 1) * limit
    const result = await userAddressModel.selectUserAddress({ offset, limit })

    // paginatino
    const { rows: [count] } = await userAddressModel.countUserAddress()
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

exports.insertUserAddress = (req, res, next) => {
  const { saveAs, userId, recieptName, address, recieptPhone, postalCode, city, isPrimary } = req.body

  const data = {
    saveAs, 
    userId, 
    recieptName, 
    address, 
    recieptPhone, 
    postalCode, 
    city, 
    isPrimary
  }
  userAddressModel.insertUserAddress(data)
    .then(() => {
      commonHelper.response(res, data, 201, 'insert data success')
    })
    .catch((error) => {
      console.log(error)
      next(errorServ)
    })
}

exports.updateUserAddress = (req, res, next) => {
  const id = req.params.id
  const { saveAs, userId, recieptName, address, recieptPhone, postalCode, city, isPrimary } = req.body
  userAddressModel.updateUserAddress({ id, saveAs, userId, recieptName, address, recieptPhone, postalCode, city, isPrimary })
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

exports.deleteUserAddress = (req, res, next) => {
  const id = req.params.id
  userAddressModel.deleteUserAddress(id)
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
