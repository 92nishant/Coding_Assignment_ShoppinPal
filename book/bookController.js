var bookModel = require('./bookModel.js');

/**
 * bookController.js
 *
 * @description :: Server-side logic for managing books.
 */
module.exports = {

    /**
     * bookController.list()
     */
    list: function (req, res) {
        bookModel.find(function (err, books) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting book.',
                    error: err
                });
            }
            return res.json(books);
        });
    },

    /**
     * bookController.show()
     */
    show: function (req, res) {
        var id = req.params.id;
        bookModel.findOne({_id: id}, function (err, book) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting book.',
                    error: err
                });
            }
            if (!book) {
                return res.status(404).json({
                    message: 'No such book'
                });
            }
            return res.json(book);
        });
    },

    /**
     * bookController.create()
     */
    create: function (req, res) {
        var book = new bookModel({
			author : req.body.author,
			title : req.body.title,
			isbn : req.body.isbn,
			release_date : req.body.release_date

        });

        book.save(function (err, book) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when creating book',
                    error: err
                });
            }
            return res.status(201).json(book);
        });
    },

    /**
     * bookController.update()
     */
    update: function (req, res) {
        var id = req.params.id;
        bookModel.findOne({_id: id}, function (err, book) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting book',
                    error: err
                });
            }
            if (!book) {
                return res.status(404).json({
                    message: 'No such book'
                });
            }

            book.author = req.body.author ? req.body.author : book.author;
			book.title = req.body.title ? req.body.title : book.title;
			book.isbn = req.body.isbn ? req.body.isbn : book.isbn;
			book.release_date = req.body.release_date ? req.body.release_date : book.release_date;
			
            book.save(function (err, book) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when updating book.',
                        error: err
                    });
                }

                return res.json(book);
            });
        });
    },

    /**
     * bookController.remove()
     */
    remove: function (req, res) {
        var id = req.params.id;
        bookModel.findByIdAndRemove(id, function (err, book) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when deleting the book.',
                    error: err
                });
            }
            return res.status(204).json();
        });
    }
};
