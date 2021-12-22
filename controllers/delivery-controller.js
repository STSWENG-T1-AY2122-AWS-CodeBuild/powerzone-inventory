/* Controller for displaying the delivery page */

const deliveryController = {
	/**
	 * Gets the delivery page.
	 * 
	 * @param req Object that contains information on the HTTP request from the client.
	 * @param res Object that contains information on the HTTP response from the server.
	 */
	getDelivery: function(req, res) {
        res.render('delivery');
	},

	getAddDelivery: function(req, res){
		res.render('add-delivery');
	}
}

module.exports = deliveryController;