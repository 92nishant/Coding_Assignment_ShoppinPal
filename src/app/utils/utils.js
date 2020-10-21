const {to} = require('await-to-js');
const pe = require('parse-error');
const bcrypt = require('bcrypt');
const utils = {

	to : async (promise) => {
	    let err, res;
	    
	    [err, res] = await to(promise);
	    if(err) return [pe(err)];

	    return [null, res];
	},

	getHasPassword:(password) => {
		const saltRounds = 10;
		const salt = bcrypt.genSaltSync(saltRounds);
		if(password){
			let hash = bcrypt.hashSync(password, salt);
			return hash;
		}else{
			return false;
		}
	},

	getValidationErrors:(object)=>{

		if(Object.keys(object).length > 0){

			let errorsKeys =  Object.keys(object);
			let errors = [], message = "";
			for (var i = 0; i < errorsKeys.length; i++) {
				message = object[errorsKeys[i]]['message'];
				errors.push({ message });
			}

			return errors;
		}

	} 


};

module.exports = utils;