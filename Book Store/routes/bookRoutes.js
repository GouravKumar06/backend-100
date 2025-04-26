const express = require('express');
const { addBook, getBooks, getBookById, updateBookById, deleteBookById, deleteAllBooks } = require('../controllers/bookController');
const router = express.Router();

router.post("/addBook", addBook);
router.get('/getBooks',getBooks);
router.get('/getBook/:id',getBookById);
router.put('/updateBook/:id',updateBookById);
router.delete('/deleteBook/:id',deleteBookById);
router.delete('/deleteAllBooks',deleteAllBooks);


module.exports = router;