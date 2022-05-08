const pool = require('../config/db')

const selectUserAddress = ({ limit, offset }) => {
    return pool.query('SELECT * FROM "UserAddress" LIMIT $1 OFFSET $2', [limit, offset])
  }
  
  const insertUserAddress = ({saveAs, userId, recieptName, address, recieptPhone, postalCode, city, isPrimary}) => {
    return pool.query('INSERT INTO "UserAddress" ("saveAs", "userId", "recieptName", address, "recieptPhone", "postalCode", city, "isPrimary") VALUES($1, $2, $3, $4, $5, $6, $7, $8)', [saveAs, userId, recieptName, address, recieptPhone, postalCode, city, isPrimary])
  }
 
  const updateUserAddress = ({ saveAs, userId, recieptName, address, recieptPhone, postalCode, city, isPrimary, id }) => {
    return pool.query('UPDATE "UserAddress" SET "saveAs" = $1, "userId" = $2, "recieptName" = $3, address = $4, "recieptPhone" = $5, "postalCode" = $6, city = $7, "isPrimary" = $8 WHERE id = $9', [saveAs, userId, recieptName, address, recieptPhone, postalCode, city, isPrimary, id])
  }
  
  const deleteUserAddress = (id) => {
    return pool.query('DELETE FROM "UserAddress" WHERE id = $1', [id])
  }
  
  const countUserAddress = () => {
    return pool.query('SELECT COUNT(*) AS total FROM "UserAddress"')
  }
  
  module.exports = {
    selectUserAddress,
    insertUserAddress,
    updateUserAddress,
    deleteUserAddress,
    countUserAddress
  }