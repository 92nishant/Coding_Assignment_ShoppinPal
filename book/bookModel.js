var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var bookSchema = new Schema({
	'author' : String,
	'title' : String,
	'isbn' : String,
	'release_date' : Date
});

module.exports = mongoose.model('book', bookSchema);
