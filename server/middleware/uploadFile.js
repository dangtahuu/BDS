const multer = require('multer');
const upload = multer({
    dest: FOLDER_UPLOAD
});
module.exports = { upload }