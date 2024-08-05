const express = require('express');
const router = express.Router();
const multer = require('multer');

const {uploadImage} = require('../controllers/uploadControllers');

const storage = multer.memoryStorage();
const upload = multer({storage :storage});

router.post('/',uppload.single('image'),uploadImage);

module.exports = router;