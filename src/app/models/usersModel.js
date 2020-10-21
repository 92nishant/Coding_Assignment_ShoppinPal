var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var usersSchema = new Schema({
	'first_name' : String,
	'last_name' : String,
	'email' : String,
	'password' : String,
	'status' : String
},{timestamps:true});

module.exports = mongoose.model('users', usersSchema);
