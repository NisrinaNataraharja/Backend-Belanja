const pool = require('../config/db')

const findByEmail = (email) => {
  return new Promise((resolve, reject) => {
    pool.query('SELECT * FROM "user" WHERE email = $1', [email], (error, result) => {
      if (!error) {
        resolve(result)
      } else {
        reject(error)
      }
    })
  })
}


const create = ({ idUser, nameStore, descriptionStore, email, password, role, phone, gender, birthday, name, city, imageUser, isActive }) => {
  return new Promise((resolve, reject) => {
    pool.query('INSERT INTO "user" ("idUser", "nameStore", "descriptionStore", email, password, role, phone, gender, birthday, name, city, "imageUser", "isActive")VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)', [idUser, nameStore, descriptionStore, email, password, role, phone, gender, birthday, name, city, imageUser, isActive], (error, result) => {
      if (!error) {
        resolve(result)
      } else {
        reject(error)
      }
    })
  })
}

const selectUser = ({ limit, offset }) => {
  return pool.query('SELECT * FROM "user" LIMIT $1 OFFSET $2', [limit, offset])
}

const updateUser = ({ idUser, nameStore, descriptionStore, email, password, role, phone, gender, birthday, name, city, imageUser, isActive, id }) => {
  return pool.query(`UPDATE "user" SET "idUser" = COALESCE($1, "idUser"),
   "nameStore" = COALESCE($2, "nameStore"), 
   "descriptionStore" = COALESCE($3, "descriptionStore"), 
   email = COALESCE($4, email), 
   password = COALESCE($5, password), 
   role = COALESCE($6, role), 
   phone = COALESCE($7, phone), 
   gender = COALESCE($8, gender), 
   birthday = COALESCE($9, birthday), 
   name = COALESCE($10, name), 
   city = COALESCE($11, city), 
   "imageUser" = COALESCE($12, "imageUser"), 
   "isActive" = COALESCE($13, "isActive")  WHERE id = $14`, [idUser, nameStore, descriptionStore, email, password, role, phone, gender, birthday, name, city, imageUser, isActive, id])
}

const deleteUser = (id) => {
  return pool.query('DELETE FROM "user" WHERE id = $1', [id])
}

const countUser = () => {
  return pool.query('SELECT COUNT(*) AS total FROM "user"')
}

module.exports = {
  findByEmail,
  create,
  selectUser,
  updateUser,
  deleteUser,
  countUser
}