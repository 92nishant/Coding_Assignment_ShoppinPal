var mongoose = require('mongoose');
var Schema   = mongoose.Schema;
const moment = require('moment');
var bookSchema = new Schema({
	'author' : {
		type:String,
		required: [true, "Author name can't be blank."]
	},
	'title' : {
		type:String,
		required: [true, "Title can't be blank."]
	},
	'isbn' : {
		type:String,
		unique: true,
		required: [true, "ISBN can't be blank."]
	},
	'release_date' : {
		type:Date,
		required: [true, "Release Date can't be blank."],
		get:(data)=>{
			return  moment(new Date(data)).format('LLL');
		}
	},
},{timestamps:true});

module.exports = mongoose.model('book', bookSchema);
