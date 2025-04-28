const express = require('express');
const { uploadImage, fetchImages, deleteImage } = require('../controllers/image');
const { isAuthenticated } = require('../middleware/authMiddleware');
const upload = require('../middleware/multerMiddleware');

const router = express.Router();

router.post('/upload',isAuthenticated,upload.single('image'), uploadImage);
router.get('/getImages',isAuthenticated,fetchImages);
router.delete("/deleteImage/:id", isAuthenticated, deleteImage);


module.exports = router;