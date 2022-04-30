const productModel = require('../models/products')
let products = [
  {
    id: 1,
    name: 'baju',
    price: 0,
    stock: 0
  }
]

const insert = (req, res) => {
  const { id, stock, name, price } = req.body

  products.push({
    id,
    name,
    stock,
    price
  })
  res.json({
    message: 'data berhasil ditambahkan'
  })
}

const detailProduct = async (req, res) => {
  try {
    const id = req.params.id
    const result = await productModel.getProductById(id)
    res.json({
      data: result.rows[0]
    })
  } catch (error) {
    console.log(error)
  }

  //   http::/localhost:4000/product/2
}

const update = (req, res) => {
  const { name, price, stock } = req.body
  const id = req.params.id

  products = products.map((item) => {
    if (item.id === id) {
      const result = {
        id,
        name,
        price,
        stock
      }
      return result
    } else {
      return item
    }
  })
  res.json({
    message: 'data berhasil di update'
  })
}
const deleteProduct = (req, res) => {
  const id = req.params.idproduct
  products = products.filter((item) => item.id !== id)

  res.json({
    message: 'adata berhasil di hapus dengan id = ' + id
  })
}
const getProduct = (req, res) => {
  res.json({
    data: products
  })
}

module.exports = {
  getProduct,
  delete: deleteProduct,
  update,
  insert,
  detailProduct
}