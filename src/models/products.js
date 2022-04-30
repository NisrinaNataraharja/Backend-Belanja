const pool = require('../config/db')
const getProductById = (id) => {
  return pool.query('SELECT products.*, category.name AS name_category FROM products INNER JOIN category ON products.id_category = category.id WHERE products.id = $1', [id])
}

module.exports = {
  getProductById
}