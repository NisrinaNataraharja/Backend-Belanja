const pool = require('../config/db')

const selectCart = ({ limit, offset }) => {
    return pool.query('SELECT * FROM cart LIMIT $1 OFFSET $2', [limit, offset])
  }
  
  const insertCart = ({userId, productId, quantity, totalPrice}) => {
    return pool.query('INSERT INTO cart ("userId", "productId", quantity, "totalPrice") VALUES($1, $2, $3, $4)', [userId, productId, quantity, totalPrice])
  }
 
  const updateCart = ({ cartId, userId, productId, quantity, totalPrice }) => {
    return pool.query('UPDATE cart SET "userId" = $1, "productId" = $2, quantity = $3, "totalPrice" = $4 WHERE "cartId" = $5', [cartId, userId, productId, quantity, totalPrice])
  }

 
  const deleteCart = (cartId) => {
    return pool.query('DELETE FROM cart WHERE "cartId"= $1', [cartId])
  }
  
  const countCart = () => {
    return pool.query('SELECT COUNT(*) AS total FROM cart')
  }
  
  module.exports = {
    selectCart,
    insertCart,
    updateCart,
    deleteCart,
    countCart
  }