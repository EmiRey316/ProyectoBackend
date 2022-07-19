const multer = require("multer");

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
      cb(null, "src/public/Storage")
    },
    filename: function(req, file, cb) {
      cb(null, "Avatar-" + Date.now() + ".png")
    }
  })
  
  const upload = multer({storage: storage})

  module.exports = upload;