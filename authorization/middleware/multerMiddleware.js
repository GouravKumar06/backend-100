const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, '../authorization/uploads/images');
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    },
});

const checkFileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image')) {
        cb(null, true);
    } else {
        throw new Error('Invalid file type. Only image files are allowed.');
    }
};

const upload = multer({
    storage: storage,
    fileFilter: checkFileFilter,
    limits: { 
        fileSize: 5 * 1024 * 1024
    },
});

module.exports = upload;

