const mongoose  = require("mongoose");
const Book      = require("../models/bookModel");

exports.book_get_all = (req, res) => {
    Book.find()
        .select("name editor author image _id")
        .exec()
        .then(books => {
            return res.status(200).json({
                books : books
            });
        })
        .catch(err => {
            return res.status(500).json({
                message: `Db Error ${err}`,
            });
        });
}

exports.book_get_id = (req, res) => {
    const bookId = req.params.bookId;
    Book.findById(bookId)
        .select("name editor author image")
        .exec()
        .then(book => {
            if (book) {
                return res.status(200).json({
                    book : book
                });
            } else {
                return res.status(404).json({
                    message: 'We coulndt find the Book!'
                });
            }
        })
        .catch(err => {
            return res.status(500).json({
                message: `Db Error ${err}`,
            });
        });
};

exports.book_create = (req, res) => {
    const book = new Book({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        editor: req.body.editor,
        author: req.body.author,
        image: req.body.image
    });
    book.save()
        .then(result => {
            return res.status(201).json({
                message: 'Book Created',
            });
        })
        .catch(err => {
            return res.status(500).json({
                message: `Db Error ${err}`,
            });
        });
};

exports.book_delete = (req, res) => {
    const bookId = req.params.bookId;
    Book.remove({ _id: bookId })
        .exec()
        .then(result => {
            return res.status(201).json({
                message: 'Book Deleted',
            });
        })
        .catch(err => {
            return res.status(500).json({
                message: `Db Error ${err}`,
            });
        });
};