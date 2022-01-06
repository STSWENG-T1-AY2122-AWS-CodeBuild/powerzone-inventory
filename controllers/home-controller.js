/* Controller for displaying the home page */

/* The db file and selling price schema are used for the home page. */
const db = require('../models/db.js');
const SellingPrice = require('../models/selling-price-schema.js');

const homeController = {
	/**
	 * Gets the home page.
	 *
	 * @param req Object that contains information on the HTTP request from the client.
	 * @param res Object that contains information on the HTTP response from the server.
	 */
	getHome: function(req, res) {
		if (req.session.username != null) {
			/* Retrieve the selling prices stored in the database. */
			const query = {label: 'Prices'};
			const projection = 'gasoline premiumGasoline95 diesel premiumGasoline97 kerosene';

			db.findOne(SellingPrice, query, projection, function(result) {
				/* Store the retrieved selling prices in the variable data. */
				const data = {
					role: req.session.role,
					gasoline: result.gasoline.toFixed(2),
					premiumGasoline95: result.premiumGasoline95.toFixed(2),
					diesel: result.diesel.toFixed(2),
					premiumGasoline97: result.premiumGasoline97.toFixed(2),
					kerosene: result.kerosene.toFixed(2)
				};

				res.render('home', data);
			});
		} else {
			/* If the user is not logged in, redirect them to the log in page. */
			res.redirect('/');
		}
	},

	/**
	 * Edits the selling prices displayed on the home page.
	 *
	 * @param req Object that contains information on the HTTP request from the client.
	 * @param res Object that contains information on the HTTP response from the server.
	 */
	 postEditPrices: function(req, res) {
		 /* Retrieve the updated selling prices from the user input. */
		const gasoline = req.body.editGasolinePrice;
		const premiumGasoline95 = req.body.editPremiumGasoline95Price;
		const diesel = req.body.editDieselPrice;
		const premiumGasoline97 = req.body.editPremiumGasoline97Price;
		const kerosene = req.body.editKerosenePrice;

		/* Store the updated prices in the variable update to update the database. */
		const update = {
			gasoline: gasoline,
			premiumGasoline95: premiumGasoline95,
			diesel: diesel,
			premiumGasoline97: premiumGasoline97,
			kerosene: kerosene
		};

		/* Update the database entry with the label "Prices"; note that this is the only database entry in
		 * the prices schema.
		 */
		const filter = {label: 'Prices'};

		db.updateOne(SellingPrice, filter, update, function(flag) {
			res.status(200).json('Prices updated successfully!');
			res.send();
		});
	}
};

module.exports = homeController;
