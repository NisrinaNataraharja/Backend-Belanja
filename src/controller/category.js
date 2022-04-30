// const pool = require('../config/db')
const createError = require('http-errors')
const categoryModel = require('../models/category')
const commonHelper = require('../helper/common')
const errorServ = new createError.InternalServerError()

exports.getCategory = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1
    const limit = parseInt(req.query.limit) || 5
    const offset = (page - 1) * limit
    const result = await categoryModel.select({ offset, limit })

    // paginatino
    const { rows: [count] } = await categoryModel.countCategory()
    const totalData = parseInt(count.total)
    const totalPage = Math.ceil(totalData / limit)
    const pagination = {
      currentPage: page,
      limit,
      totalData,
      totalPage
    }
    // res.status(200).json({
    //   pagination: {
    //     currentPage: page,
    //     limit,
    //     totalData,
    //     totalPage
    //   },
    //   data: result
    // })
    commonHelper.response(res, result, 200, 'get data success', pagination)
  } catch (error) {
    console.log(error)
    next(errorServ)
  }
}

exports.insertCategory = (req, res, next) => {
  const { name } = req.body

  const data = {
    name
  }
  categoryModel.insert(data)
    .then(() => {
      commonHelper.response(res, data, 201, 'insert data success')
    })
    .catch((error) => {
      console.log(error)
      next(errorServ)
      // cara 1
    //   const error = new Error('ada error id insert cateogry')
    //   error.status = 500
    //   next(error)
    // cara 2
    // next({message: 'ada error bro', status: 500})
    // cara 3
    //   next(createError(500, 'ada error di input anda'))
    //   next(new createError.NotFound())
    })
}
// exports.updateCategory = (req, res, next)=>{
//     const id = req.params.id
//     const name = req.body.name

//     pool.query("UPDATE category SET name = $1 WHERE id= $2", [name, id], (err, result)=>{
//         if(!err){
//             res.json({
//                 message: result
//             })
//         }else{
//             res.status(500).json({
//                 message: 'internal server error'
//             })
//         }
//     })
// }

exports.deleteCategory = (req, res, next) => {
  const id = req.params.id
  categoryModel.deleteCategory(id)
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

// pool.query("DELETE FROM category WHERE id = $1", [id], (err, result)=>{
//     if(!err){
//         res.json({
//             message: result
//         })
//     }else{
//         res.json({
//             message: 'internal server error'
//         })
//     }
// })