const usersController = require('../controllers/usersController.js');
const bookController = require('../controllers/bookController.js');

module.exports = (app) => {

	/*
	 * GET
	 */
	app.get('/users', usersController.list);

	/*
	 * GET
	 */
	app.get('/user/:id', usersController.show);

	/*
	 * POST
	 */
	app.post('/users', usersController.create);

	/*
	 * PUT
	 */
	app.put('/user/:id', usersController.update);

	/*
	 * DELETE
	 */
	app.delete('/user/:id', usersController.remove);

	/*
	 * GET
	 */
	app.get('/books/:page', bookController.list);

	/*
	 * GET
	 */
	app.get('/book/:id', bookController.show);

	/*
	 * POST
	 */
	app.post('/book', bookController.create);

	/*
	 * PUT
	 */
	app.put('/book/:id', bookController.update);

	/*
	 * DELETE
	 */
	app.delete('/book/:id', bookController.remove);

};