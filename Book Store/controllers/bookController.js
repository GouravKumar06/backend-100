const Book = require('../models/book')


exports.addBook = async (req, res) => {
    try{
        const {title,author,publishDate} = req.body;

        const bookExist = await Book.find({title});

        console.log("bookExist: ", bookExist);

        if(bookExist.length > 0){
            return res.status(400).json({
                message: 'Book already exists'
            });
        }

        const book = await Book.create({
            title,
            author,
            publishDate
        })

        return res.status(201).json({
            message: 'Book created successfully',
            book
        });

    }catch(error){
        return res.status(500).json({
            message: error.message
        });
    }
}


exports.getBooks = async (req, res) => {
  try {
    const books = await Book.find();

    if (books.length === 0) {
      return res.status(400).json({
        message: "No books found",
      });
    }

    return res.status(200).json({
      message: "Books retrieved successfully",
      books,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};


exports.getBookById = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);

    if (book.length === 0) {
      return res.status(400).json({
        message: "No books found",
      });
    }

    return res.status(200).json({
      message: "Books retrieved successfully",
      book,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

exports.updateBookById = async (req, res) => {
  try {
    const { title, author, publishDate } = req.body;

    const updateField = {};
    if(title) updateField.title = title;
    if(author) updateField.author = author;
    if(publishDate) updateField.publishDate = publishDate;

    console.log("updateField: ", updateField);

    const book = await Book.findByIdAndUpdate(
        req.params.id,
        {
            $set: updateField
        },
        { new: true }
    );

    if (book.length === 0) {
      return res.status(400).json({
        message: "No books found",
      });
    }

    return res.status(200).json({
      message: "Books updated successfully",
      book,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};


exports.deleteBookById = async (req, res) => {
  try {
    const book = await Book.findByIdAndDelete(req.params.id);

    if (book.length === 0) {
      return res.status(400).json({
        message: "No books found",
      });
    }

    return res.status(200).json({
      message: "Books deleted successfully",
      book,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

exports.deleteAllBooks = async (req, res) => {
  try {
    const books = await Book.deleteMany({});

    if (books.length === 0) {
      return res.status(400).json({
        message: "No books found",
      });
    }

    return res.status(200).json({
      message: "Books deleted successfully",
      books,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};