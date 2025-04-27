const express = require('express');
const { uploadImage, fetchImages } = require('../controllers/image');
const { isAuthenticated } = require('../middleware/authMiddleware');
const upload = require('../middleware/multerMiddleware');

const router = express.Router();

router.post('/upload',isAuthenticated,upload.single('image'), uploadImage);
router.get('/getImages',isAuthenticated,fetchImages);


module.exports = router;