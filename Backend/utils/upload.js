const multer = require('multer');

const upload = multer({ dest: "uploads" });

module.exports = upload;
// const multer = require('multer');

// // Define storage configuration
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, 'uploads'); // Set destination folder
//   },
//   filename: function (req, file, cb) {
//     cb(null, file.originalname); // Keep original filename
//   }
// });

// // Initialize multer with custom storage configuration
// const upload = multer({ storage: storage });

// module.exports = upload;
