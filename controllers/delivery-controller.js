/* Controller for displaying the delivery page */

/* The db file and delivery schema are used for the delivery page. */
const db = require('../models/db.js');
const Delivery = require('../models/delivery-schema.js');

/* A utility file is used for auxiliary functions. */
const deliveryControllerUtil = require('./delivery-controller-util.js');

const deliveryController = {
	/**
	 * Gets the delivery page.
	 *
	 * @param {Express.Request} req  Object that contains information on the HTTP request from the client.
	 * @param {Express.Response} res  Object that contains information on the HTTP response from the server.
	 */
	getDelivery: function(req, res) {
		/* Retrieve the details of all deliveries. */
		const query = {};
		const projection = 'id date customer dropoff status';

		db.findMany(Delivery, query, projection, function(result) {
			const details = deliveryControllerUtil.deliveryUtil(result);

			/* Store the retrieved delivery details in the variable data. */
			const data = {
				deliveryIds: details.ids,
				deliveryDates: details.dates,
				deliveryCustomers: details.customers,
				deliveryDropoffs: details.dropoffs,
				deliveryStatuses: details.statuses,

				/* Additionally, store the role of the account to authorize the add and edit stock features. */
				role: req.session.role
			};

			res.render('delivery', data);
		});
	},

	postEditStatusCancelled: function(req, res) {

	},

	postEditStatusCompleted: function(req, res) {

	},

	postEditStatusPending: function(req, res) {

	},

	/**
	 * Gets the page displaying more information for a particular delivery.
	 *
	 * @param {Express.Request} req  Object that contains information on the HTTP request from the client.
	 * @param {Express.Response} res  Object that contains information on the HTTP response from the server.
	 */
	getMoreInfoDelivery: function(req, res) {
		/* Retrieve the delivery ID from the page link. */
		const id = req.params.id;

		/* Retrieve the data corresponding to the ID of the selected delivery. */
		const query = {id: id};
		const projection = 'id status customer number date warehouse dropoff manager driver';

		db.findOne(Delivery, query, projection, function(result) {
			/* Format the display of the delivery date from the Date object, if applicable,
             * stored in the database.
             */
			let cleanDate = null;

			if (result.date != null) {
				const month = result.date.getMonth() + 1;
				let formattedMonth = month;
				if (month.toString().length < 2) {
					formattedMonth = '0' + month.toString();
				}

				const date = result.date.getDate();
				let formattedDate = date;
				if (date.toString().length < 2) {
					formattedDate = '0' + date.toString();
				}

				const year = result.date.getFullYear();

				cleanDate = year + '-' + formattedMonth + '-' + formattedDate;
			}

			/* Store the delivery details in the variable data. */
			const data = {
				id: result.id,
				date: cleanDate,
				status: result.status,
				customer: result.customer,
				number: result.number,
				warehouse: result.warehouse,
				dropoff: result.dropoff,
				manager: result.manager,
				driver: result.driver
			};

			res.render('more-info-delivery', data);
		});
	},

	/**
	 * Gets the page for editing information on a particular delivery.
	 *
	 * @param {Express.Request} req  Object that contains information on the HTTP request from the client.
	 * @param {Express.Response} res  Object that contains information on the HTTP response from the server.
	 */
	getEditDelivery: function(req, res) {
		/* Retrieve the delivery ID from the page link. */
		const id = req.params.id;

		/* Retrieve the data corresponding to the ID of the selected delivery. */
		const query = {id: id};
		const projection = 'id customer number date warehouse dropoff manager driver';

		db.findOne(Delivery, query, projection, function(result) {
			/* Format the display of the delivery date from the Date object, if applicable,
             * stored in the database.
             */
			let cleanDate = null;

			if (result.date != null) {
				const month = result.date.getMonth() + 1;
				let formattedMonth = month;
				if (month.toString().length < 2) {
					formattedMonth = '0' + month.toString();
				}

				const date = result.date.getDate();
				let formattedDate = date;
				if (date.toString().length < 2) {
					formattedDate = '0' + date.toString();
				}

				const year = result.date.getFullYear();

				cleanDate = year + '-' + formattedMonth + '-' + formattedDate;
			}

			/* Store the delivery details in the variable data. */
			const data = {
				id: result.id,
				date: cleanDate,
				status: result.status,
				customer: result.customer,
				number: result.number,
				warehouse: result.warehouse,
				dropoff: result.dropoff,
				manager: result.manager,
				driver: result.driver
			};

			res.render('edit-delivery', data);
		});
	},

	postEditDelivery: function(req, res) {

	}
};

module.exports = deliveryController;
