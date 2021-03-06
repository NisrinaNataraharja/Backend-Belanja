const pool = require('../config/db')

// const selectProducts = ({ limit, offset }) => {
//   return pool.query('SELECT * FROM products LIMIT $1 OFFSET $2', [limit, offset])
// }

const selectProductWithCondition = (condition) => {
  //console.log(condition);
  return pool.query(`
  SELECT p.*
  FROM products p  
  LEFT JOIN category c on p.categoryid = c."idCategory"
  WHERE p.nameproduct ILIKE '%${condition.search}%' 
  GROUP BY p.id, p.nameproduct, c."categoryName", p.description, p.rating, p.price, p.stock, p.condition, p.seller, p.brand, p.status
  ORDER BY ${condition.sort} ${condition.order}
  LIMIT ${condition.limit} OFFSET ${condition.offset}
  `)
}

const insertProducts = ({ categoryid, nameproduct, description, rating, price, stock, size, color, condition, seller, brand, status, isarchieve, created_at, image }) => {
  return pool.query('INSERT INTO products (categoryid, nameproduct, description, rating, price, stock, size, color, condition, seller, brand, status, isarchieve, created_at, image) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15)', [categoryid, nameproduct, description, rating, price, stock, size, color, condition, seller, brand, status, isarchieve, created_at, image])
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
  ///selectProducts,
  selectProductWithCondition,
  updateProducts,
  insertProducts,
  deleteProducts,
  countProducts
}