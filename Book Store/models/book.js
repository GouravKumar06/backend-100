const mongoose = require('mongoose');


const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Please add a title'],
        trim: true,
        maxlength: [100, 'Book title can not be more than 100 characters']
    },
    author:{
        type: String,
        required: [true, 'Please add an author'],
        trim: true,
    },
    publishDate:{
        type: Date,
        required: [true, 'Please add a publish date'],
        max:[new Date(), 'Publish date can not be in the future']
    }
},{timestamps: true});

module.exports = mongoose.model('Book', bookSchema);