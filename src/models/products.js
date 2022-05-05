const pool = require('../config/db')

const selectProducts = ({ limit, offset }) => {
  return pool.query('SELECT * FROM products LIMIT $1 OFFSET $2', [limit, offset])
}

// const getProductById = (id) => {
//   return pool.query('SELECT products.*, category.name AS name_category FROM products INNER JOIN category ON products.id_category = category.id WHERE products.id = $1', [id])
// }

const insertProducts = ({ categoryid, nameproduct, description, rating, price, stock, size, color, condition, seller, brand, status, isarchieve, created_at }) => {
  return pool.query('INSERT INTO products (categoryid, nameproduct, description, rating, price, stock, size, color, condition, seller, brand, status, isarchieve, created_at) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)', [categoryid, nameproduct, description, rating, price, stock, size, color, condition, seller, brand, status, isarchieve, created_at])
}

const updateProducts = ({categoryid, nameproduct, description, rating, price, stock, size, color, condition, seller, brand, status, isarchieve, created_at, id}) => {
  return pool.query('UPDATE products SET categoryid = $1, nameproduct = $2, description = $3, rating = $4, price = $5, stock = $6, size = $7, color = $8, condition = $9, seller = $10, brand = $11, status = $12, isarchieve = $13, created_at = $14 WHERE id = $15', [categoryid, nameproduct, description, rating, price, stock, size, color, condition, seller, brand, status, isarchieve, created_at, id])
}

const deleteProducts = (id) => {
  return pool.query('DELETE FROM products WHERE id = $1', [id])
}

const countProducts = () => {
  return pool.query('SELECT COUNT(*) AS total FROM products')
}

module.exports = {
  selectProducts,
  // getProductById,
  updateProducts,
  insertProducts,
  deleteProducts,
  countProducts
}