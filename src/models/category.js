const pool = require('../config/db')

const selectCategory = ({ limit, offset }) => {
  return pool.query('SELECT * FROM category LIMIT $1 OFFSET $2', [limit, offset])
}

const insertCategory = ({ categoryName }) => {
  return pool.query('INSERT INTO category ("categoryName") VALUES($1)', [categoryName])
}

const updateCategory = ({ idCategory, categoryName }) => {
  return pool.query('UPDATE category SET "categoryName" = $1 WHERE "idCategory" = $2', [categoryName, idCategory])
}

const deleteCategory = (idCategory) => {
  return pool.query('DELETE FROM category WHERE "idCategory" = $1', [idCategory])
}

const countCategory = () => {
  return pool.query('SELECT COUNT(*) AS total FROM category')
}

module.exports = {
  selectCategory,
  insertCategory,
  updateCategory,
  deleteCategory,
  countCategory
}