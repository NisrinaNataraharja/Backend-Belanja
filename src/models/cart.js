const pool = require('../config/db')

const getCart = (id) => {
  console.log('masuk get cart');
  return pool.query(`SELECT cart."cartId", cart."userId", cart."productId", cart.quantity,
  products.nameproduct, products.price, products.brand, products.image FROM cart INNER JOIN products ON cart."productId" = products.id
  WHERE cart."userId" = $1`, [id])
}

const checkProductId = (productId, userId) => {
  return pool.query('SELECT * FROM cart where cart."productId" = $1 AND cart."userId" = $2', [productId, userId])
}

const insertCart = ({ userId, productId, quantity }) => {
  return pool.query('INSERT INTO cart ("userId", "productId", quantity) VALUES($1, $2, $3)', [userId, productId, quantity])
}

const deleteCart = (cartId) => {
  return pool.query('DELETE FROM cart WHERE "cartId"= $1', [cartId])
}

const updateCartStock = (cartId, quantity) => {
  pool.query('UPDATE cart set quantity = $1 WHERE "cartId" = $2', [quantity, cartId])
}


module.exports = {
  getCart,
  checkProductId,
  insertCart,
  deleteCart,
  updateCartStock
}





