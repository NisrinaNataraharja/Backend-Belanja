const pool = require('../config/db')

const selectTransaction = ({ limit, offset }) => {
    return pool.query('SELECT * FROM "Transaction" LIMIT $1 OFFSET $2', [limit, offset])
  }
  
  const insertTransaction = ({productId, userId, quantity, totalShopping, deliveryCost, orderStatus, paymentMethod}) => {
    return pool.query('INSERT INTO "Transaction" ("productId", "userId", quantity, "totalShopping", "deliveryCost", "orderStatus", "paymentMethod") VALUES($1, $2, $3, $4, $5, $6, $7)', [productId, userId, quantity, totalShopping, deliveryCost, orderStatus, paymentMethod])
  }

  const updateTransaction = ({ productId, userId, quantity, totalShopping, deliveryCost, orderStatus, paymentMethod, idTransaction }) => {
    return pool.query('UPDATE "Transaction" SET "productId" = $1, "userId" = $2, quantity = $3, "totalShopping" = $4, "deliveryCost" = $5, "orderStatus" = $6, "paymentMethod" = $7 WHERE "idTransaction" = $8', [productId, userId, quantity, totalShopping, deliveryCost, orderStatus, paymentMethod, idTransaction])
  }
  
  const deleteTransaction = (idTransaction) => {
    return pool.query('DELETE FROM "Transaction" WHERE "idTransaction" = $1', [idTransaction])
  }
  
  const countTransaction = () => {
    return pool.query('SELECT COUNT(*) AS total FROM "Transaction"')
  }
  
  module.exports = {
    selectTransaction,
    insertTransaction,
    updateTransaction,
    deleteTransaction,
    countTransaction
  }