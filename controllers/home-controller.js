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
			let query = {label: "Prices"};
			let projection = 'gasoline premiumGasoline95 diesel premiumGasoline97 kerosene';

			db.findOne(SellingPrice, query, projection, function(result) {
				
				/* Store the retrieved selling prices in the variable data. */
				let data = {
					role: req.session.role,
					gasoline: result.gasoline,
					premiumGasoline95: result.premiumGasoline95,
					diesel: result.diesel,
					premiumGasoline97: result.premiumGasoline97,
					kerosene: result.kerosene
				}

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
		let gasoline = req.body.editGasolinePrice;
		let premiumGasoline95 = req.body.editPremiumGasoline95Price;
		let diesel = req.body.editDieselPrice;
		let premiumGasoline97 = req.body.editPremiumGasoline97Price;
		let kerosene = req.body.editKerosenePrice;

		/* Store the updated prices in the variable update to update the database. */
		let update = {
			gasoline: gasoline,
			premiumGasoline95: premiumGasoline95,
			diesel: diesel,
			premiumGasoline97: premiumGasoline97,
			kerosene: kerosene
		}

		/* Update the database entry with the label "Prices"; note that this is the only database entry in
		 * the prices schema.
		 */
		let filter = {label: "Prices"};

		db.updateOne(SellingPrice, filter, update, function(flag) {
			res.status(200).json("Prices updated successfully!");
			res.send();
		});
	}
}

module.exports = homeController;