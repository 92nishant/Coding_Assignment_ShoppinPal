const usersModel = require('../models/usersModel.js');
const {getHasPassword} = require('../utils/utils.js');

/**
 * usersController.js
 *
 * @description :: Server-side logic for managing userss.
 */
module.exports = {

    /**
     * usersController.list()
     */
    list: function (req, res) {
        usersModel.find(function (err, userss) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting users.',
                    error: err
                });
            }
            return res.json(userss);
        });
    },

    /**
     * usersController.show()
     */
    show: function (req, res) {
        var id = req.params.id;
        usersModel.findOne({_id: id}, function (err, users) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting users.',
                    error: err
                });
            }
            if (!users) {
                return res.status(404).json({
                    message: 'No such users'
                });
            }
            return res.json(users);
        });
    },

    /**
     * usersController.create()
     */
    create: function async (req, res) {

        try{
            let password = getHasPassword(req.body.password);
            var users = new usersModel({
    			first_name : req.body.first_name,
    			last_name : req.body.last_name,
    			email : req.body.email,
    			password : password,
    			status : req.body.status
            });
            
            users.save(function (err, users) {
                if (err) {
                    return res.status(500).json({
                        success:false,
                        message: 'Error when creating users',
                        error: err
                    });
                }
                return res.status(201).json({success:true, data:users});
            });
        }catch(error){
            return res.status(201).json({success:false, message: error});
        }

    },

    /**
     * usersController.update()
     */
    update: function (req, res) {
        var id = req.params.id;
        usersModel.findOne({_id: id}, function (err, users) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting users',
                    error: err
                });
            }
            if (!users) {
                return res.status(404).json({
                    message: 'No such users'
                });
            }

            users.first_name = req.body.first_name ? req.body.first_name : users.first_name;
			users.last_name = req.body.last_name ? req.body.last_name : users.last_name;
			users.email = req.body.email ? req.body.email : users.email;
			users.password = req.body.password ? req.body.password : users.password;
			users.status = req.body.status ? req.body.status : users.status;
			
            users.save(function (err, users) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when updating users.',
                        error: err
                    });
                }

                return res.json(users);
            });
        });
    },

    /**
     * usersController.remove()
     */
    remove: function (req, res) {
        var id = req.params.id;
        usersModel.findByIdAndRemove(id, function (err, users) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when deleting the users.',
                    error: err
                });
            }
            return res.status(204).json();
        });
    }
};
