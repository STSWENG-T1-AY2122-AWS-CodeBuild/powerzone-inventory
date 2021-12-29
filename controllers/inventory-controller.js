/* Controller for displaying the inventory page */

const inventoryController = {
	/**
	 * Gets the inventory page.
	 * 
	 * @param req Object that contains information on the HTTP request from the client.
	 * @param res Object that contains information on the HTTP response from the server.
	 */
	getInventory: function(req, res) {
        res.render('inventory');
	},

	getAddStock: function(req, res){
		res.render('add-stock');
	},

	getEditStock: function(req, res){
		res.render('edit-stock');
	},

	getMoreInfoStock: function(req, res){
		res.render('more-info-stock');
	}
}

module.exports = inventoryController;