// const myMiddle = (req, res, next) => {
//     console.log('print helo world')
 
//     next()
//   }
  
//   const validate = (req, res, next) => {
//     const stock = req.body.stock
  
//     if (stock < 1) {
//       return res.json({
//         message: 'stock harus lebih dari 0'
//       })
//     }
//     next()
//   }
  
  const myCors = (req, res) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE')
    res.header('Access-Control-Allow-Headers', 'Content-Type')

  }
  
  module.exports = {
    // myMiddle,
    // validate,
    myCors
  }