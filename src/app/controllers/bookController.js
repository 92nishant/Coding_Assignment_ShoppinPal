var bookModel = require('../models/bookModel.js');
const {getValidationErrors, to} = require('../utils/utils.js');
const pe = require('parse-error');
/**
 * bookController.js
 *
 * @description :: Server-side logic for managing books.
 */
module.exports = {

    /**
     * bookController.list()
     */
    list: async (req, res) => {
        
        let pageNum = req.params.page,
            limit = req.params.limit || 10, 
            err, books, conditions = {};

        const offset = (pageNum - 1) * limit; 
        
        if(req.query.search){
            conditions = {
                $or:[
                    {
                        title : { 
                            $eq : req.query.search
                        }
                    },
                    {
                        author : { 
                            $eq : req.query.search 
                        }
                    }
                ]
            };
        }
        
        [err, books] = await to(bookModel.find(conditions,{
            _id:1,
            title:1,
            author:1,
            isbn:1,
            release_date:1
        },{ 
            skip : offset, 
            limit : limit 
        } ).sort({ _id : -1 }));

        if (err) {
            return res.status(500).json({
                message: 'Error when getting book.',
                error: err,
                success:false,
            });
        }
        return res.status(200).json({ success:true, data:books });
    },

    /**
     * bookController.show()
     */
    show: async (req, res) => {
        
        try{
            var bookId = req.params.id, err, book;
            
            if(bookId.trim() == ""){
                return res.status(400).json({
                    message: 'Book id can not be blank',
                    success: true
                });
            }

            [err, book] = await to(bookModel.findOne({_id: bookId}));
            
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting book.',
                    error: err,
                    success: false
                });
            }
            if (!book) {
                return res.status(404).json({
                    message: 'No such book',
                    success: true
                });
            }
            return res.status(200).json({success: true, data:book});
        }catch(error){
            return res.status(500).json(pe(error));
        }
    },

    /**
     * bookController.create()
     */
    create: async (req, res) => {
        
        try{
            let err, book
            [err, book] = await to(bookModel.findOne({ isbn:req.body.isbn}));
            console.log(err);
            if(err){
                throw err;
            }

            if(book){
                return res.status(400).json({
                    success : true,
                    message : "ISBN code already exists."
                });
            }

            book = new bookModel({
    			author : req.body.author,
    			title : req.body.title,
    			isbn : req.body.isbn,
    			release_date : req.body.release_date
            });


            book.save(function (err, bookRes) {
                if (err) {
                    let errors, statusCode, validationErrors = true;
                    if(err.message.indexOf("validation failed") >= 0 ){
                        errors = getValidationErrors(err.errors);
                        validationErrors = false;
                        statusCode = 400;
                    }else{
                        errors = err;
                        statusCode = 400;
                    }

                    return res.status(statusCode).json({
                        message: 'Error when creating book',
                        validate: validationErrors,
                        error: errors
                    });
                }
                return res.status(201).json({success:true, data:bookRes});
            });
        }catch(error){
            console.log(error)
            return res.status(500).json(pe(error));
        }

    },

    /**
     * bookController.update()
     */
    update: async (req, res) => {
        var bookId = req.params.id, 
            err, book;
        
        if(bookId.trim() == ""){
            return res.status(400).json({
                success:false,
                message: 'Book Id can not be blank'
            });  
        }

        [err, book] = await to(bookModel.findOne({_id: id}));

        if (err) {
            return res.status(500).json({
                message: 'Error when getting book',
                success:false,
                error: err,
            });
        }
        if (!book) {
            return res.status(404).json({
                message: 'No such book',
                success:false,
            });
        }

        book.author = req.body.author.trim() ? req.body.author : book.author;
		book.title = req.body.title.trim() ? req.body.title : book.title;
		book.isbn = req.body.isbn.trim() ? req.body.isbn : book.isbn;
		book.release_date = req.body.release_date ? req.body.release_date : book.release_date;
		
        book.save(function (err, book) {
            if (err) {
                return res.status(500).json({
                    success:false,
                    message: 'Error when updating book.',
                    error: err,
                });
            }

            return res.json({success:true, data:book});
        });
    },

    /**
     * bookController.remove()
     */
    remove: async (req, res) => {
        var bookId = req.params.id;
        console.log(bookId);
        if(bookId.trim() == ""){
            return res.status(400).json({
                success:false,
                message: 'Book Id can not be blank'
            });  
        }

        [err, book] = await to(bookModel.findOne({_id: bookId}));
            
        if (err) {
            return res.status(500).json({
                message: 'Error when getting book.',
                error: err,
                success: false
            });
        }

        if(!book){
            return res.status(404).json({
                message: 'Book not found.',
                success: false
            });
        }

        bookModel.findByIdAndRemove(bookId, function (err, book) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when deleting the book.',
                    error: err,
                    success: false
                });
            }
            return res.status(200).json({ success: true, message:"Book deleted successfully"});
        });
    }
};
