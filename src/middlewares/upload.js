const multer = require('multer')
const { response } = require('../helper/common')
// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//       cb(null, './upload')
//     },
//     filename: function (req, file, cb) {
//       const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
//       cb(null, file.fieldname + '-' + uniqueSuffix + '-'+ file.originalname)
//     }
//   })

//   const upload = multer({ storage: storage })

const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./upload");
  },
  filename: (req, file, cb) => {
    cb(null, new Date().getTime() + "-" + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
    return cb(new Error('Uploaded file must be png or jpg file'));
  }
};

const uploadSingle = (name) => multer({
  storage: fileStorage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 2000000,
  },
}).single(name)

const uploadMultiple = (name) => multer({
  storage: fileStorage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 2000000,
  },
}).array(name, 3)

const middUpload = (img) => (req, res, next) => {
  if (img === "imageUser") {
    uploadSingle(img)(req, res, (err) => {
      if (err) {
        if (err.message) {
          response(res, 400, false, err.message, null);
        } else {
          response(res, null, 400, 'Uploaded file must be png or jpg file')
        }
      } else {
        next();
      }
    });
  } else {
    uploadMultiple(img)(req, res, (err) => {
      if (err) {
        console.log(err)
        if (err.message) {
          response(res, null, 400, err.message);
        } else {
          response(res, null, 400, 'Uploaded file must be png or jpg file')
        }
      } else {
        req.body.image = JSON.stringify(
          req.files.map((item) => {
            return { image: item.filename };
          })
        );
        next();
      }
    });
  }
};

module.exports = middUpload;


 // module.exports = {uploadImage: upload}
