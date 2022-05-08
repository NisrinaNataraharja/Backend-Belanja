const pool = require('../config/db')

const selectUser = ({ limit, offset }) => {
    return pool.query('SELECT * FROM "user" LIMIT $1 OFFSET $2', [limit, offset])
  }
  
  const insertUser = ({idUser, nameStore, descriptionStore, email, password, role, phone, gender, birthday, name}) => {
    return pool.query('INSERT INTO "user" ("idUser", "nameStore", "descriptionStore", email, password, role, phone, gender, birthday, name) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)', [idUser, nameStore, descriptionStore, email, password, role, phone, gender, birthday, name])
  }
 
  const updateUser = ({ idUser, nameStore, descriptionStore, email, password, role, phone, gender, birthday, name, id }) => {
    return pool.query('UPDATE "user" SET "idUser" = $1, "nameStore" = $2, "descriptionStore" = $3, email = $4, password = $5, role = $6, phone = $7, gender = $8, birthday = $9, name = $10 WHERE id = $11', [idUser, nameStore, descriptionStore, email, password, role, phone, gender, birthday, name, id])
  }
  
  const deleteUser = (id) => {
    return pool.query('DELETE FROM "user" WHERE id = $1', [id])
  }
  
  const countUser = () => {
    return pool.query('SELECT COUNT(*) AS total FROM "user"')
  }
  
  module.exports = {
    selectUser,
    insertUser,
    updateUser,
    deleteUser,
    countUser
  }