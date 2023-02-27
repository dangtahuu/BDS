const express = require('express');
const router = express.Router();
const UploadController = require('./upload.controller');
const multer = require('multer')
const { auth } = require('../../middleware');

const upload = multer({
    dest: 'uploadBuffer'
});

router.post('/multi-images', auth, upload.any(), UploadController.uploadMultiImages);

module.exports = router;