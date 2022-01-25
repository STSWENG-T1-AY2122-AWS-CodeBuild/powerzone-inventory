/* Controller for displaying the delivery page */

/* The db file, delivery schema, and transaction schema are used for the delivery page. */
const db = require('../models/db.js');
const Delivery = require('../models/delivery-schema.js');
const Transaction = require('../models/transaction-schema.js');

/* A utility object is used for auxiliary functions. */
const deliveryControllerUtil = require('./delivery-controller-util.js');

/* The transaction controller is used to update the transaction status.*/
const transactionController = require('./transaction-controller.js');

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

	/**
	 * Updates the status of the selected delivery to "Cancelled".
	 *
	 * @param {Express.Request} req  Object that contains information on the HTTP request from the client.
	 * @param {Express.Response} res  Object that contains information on the HTTP response from the server.
	 */
	postEditStatusCancelled: function(req, res) {
		/* Retrieve the ID of the selected delivery. */
		const deliveryId = req.body.deliveryId;

		/* Set the status of the selected delivery to "Cancelled". */
		const update = {status: 'cancelled'};

		/* Use the retrieved delivery ID for database retrieval. */
		const filter = {id: deliveryId};

		/* Update the status of the delivery and its corresponding transaction. */
		db.updateOne(Delivery, filter, update, function(flag) {
			/* The transaction ID corresponding to a delivery has a starting digit of 1 and the same
			 * succeeding digits as the delivery ID.
			 */
			const transactionId = parseInt(deliveryId) - 10000000;

			/* Get the original status of the corresponding transaction. */
			query = {id: transactionId};
			projection = 'id status';

			db.findOne(Transaction, query, projection, function(result) {
			   /* Assign the retrieved transaction details to the body of the request object
				* and set the status of the transaction to "Cancelled."
				*/
				req.body.transactionId = result.id;
				req.body.transactionStatusOld = result.status;

				transactionController.postEditStatusCancelled(req, res);
			});
		});
	},

	/**
	 * Updates the status of the selected delivery to "Completed".
	 *
	 * @param {Express.Request} req  Object that contains information on the HTTP request from the client.
	 * @param {Express.Response} res  Object that contains information on the HTTP response from the server.
	 */
	postEditStatusCompleted: function(req, res) {
		/* Retrieve the ID of the selected delivery. */
		const deliveryId = req.body.deliveryId;

		/* Set the status of the selected delivery to "Completed". */
		const update = {status: 'completed'};

		/* Use the retrieved delivery ID for database retrieval. */
		const filter = {id: deliveryId};

		/* Update the status of the delivery and its corresponding transaction. */
		db.updateOne(Delivery, filter, update, function(flag) {
			/* The transaction ID corresponding to a delivery has a starting digit of 1 and the same
			 * succeeding digits as the delivery ID.
			 */
			const transactionId = parseInt(deliveryId) - 10000000;

			/* Get the original status of the corresponding transaction. */
			query = {id: transactionId};
			projection = 'id status';

			db.findOne(Transaction, query, projection, function(result) {
				/* Assign the retrieved transaction details to the body of the request object
				* and set the status of the transaction to "Completed."
				*/
				req.body.transactionId = result.id;
				req.body.transactionStatusOld = result.status;

				transactionController.postEditStatusCompleted(req, res);
			});
		});
	},

	/**
	 * Updates the status of the selected delivery to "Pending".
	 *
	 * @param {Express.Request} req  Object that contains information on the HTTP request from the client.
	 * @param {Express.Response} res  Object that contains information on the HTTP response from the server.
	 */
	postEditStatusPending: function(req, res) {
		/* Retrieve the ID of the selected delivery. */
		const deliveryId = req.body.deliveryId;

		/* Set the status of the selected delivery to "Pending". */
		const update = {status: 'pending'};

		/* Use the retrieved delivery ID for database retrieval. */
		const filter = {id: deliveryId};

		/* Update the status of the delivery and its corresponding transaction. */
		db.updateOne(Delivery, filter, update, function(flag) {
			/* The transaction ID corresponding to a delivery has a starting digit of 1 and the same
			 * succeeding digits as the delivery ID.
			 */
			const transactionId = parseInt(deliveryId) - 10000000;

			/* Get the original status of the corresponding transaction. */
			query = {id: transactionId};
			projection = 'id status';

			db.findOne(Transaction, query, projection, function(result) {
			   /* Assign the retrieved transaction details to the body of the request object
				* and set the status of the transaction to "Pending."
				*/
				req.body.transactionId = result.id;
				req.body.transactionStatusOld = result.status;

				transactionController.postEditStatusPending(req, res);
			});
		});
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
		const projection = 'id customer number date status warehouse dropoff manager driver';

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

	/**
	 * Edits the details of a delivery.
	 *
	 * @param {Express.Request} req  Object that contains information on the HTTP request from the client.
	 * @param {Express.Response} res  Object that contains information on the HTTP response from the server.
	 */
	postEditDelivery: function(req, res) {
		/* Retrieve the delivery details from the user input. */
		const id = req.body.editDeliveryId;
		const warehouse = req.body.editDeliveryWarehouse.trim();
		const status = req.body.editDeliveryStatus;
		const dropoff = req.body.editDeliveryDropoff.trim();
		const customer = req.body.editDeliveryCustomerName.trim();
		const manager = req.body.editDeliveryManager.trim();
		const number = req.body.editDeliveryCustomerNumber;
		const driver = req.body.editDeliveryDriver.trim();
		const date = req.body.editDeliveryDate;

		/* Use the delivery ID for database retrieval. */
		const filter = {id: id};

		/* Assign the updated details to the update variable. */
		const update = {
			warehouse: warehouse,
			status: status,
			dropoff: dropoff,
			customer: customer,
			manager: manager,
			number: number,
			driver: driver,
			date: date
		};

		db.updateOne(Delivery, filter, update, function(flag) {
			/* If the delivery status is set to "Completed", set the status of its corresponding transaction
			 * to "Completed."
			 */
			if (status == 'completed') {
				/* The transaction ID corresponding to a delivery has a starting digit of 1 and the same
				 * succeeding digits as the delivery ID.
				 */
				const transactionId = parseInt(id) - 10000000;

				/* Get the original status of the corresponding transaction. */
				query = {id: transactionId};
				projection = 'id status';

				db.findOne(Transaction, query, projection, function(result) {
				   /* Assign the retrieved transaction details to the body of the request object
					* and set the status of the transaction to "Completed."
					*/
					req.body.transactionId = result.id;
					req.body.transactionStatusOld = result.status;

					transactionController.postEditStatusCompleted(req, res);
				});

			/* If the delivery status is set to "Pending", set the status of its corresponding transaction
			 * to "Pending."
			 */
			} else if (status == 'pending') {
				/* The transaction ID corresponding to a delivery has a starting digit of 1 and the same
				 * succeeding digits as the delivery ID.
				 */
				const transactionId = parseInt(id) - 10000000;

				/* Get the original status of the corresponding transaction. */
				query = {id: transactionId};
				projection = 'id status';

				db.findOne(Transaction, query, projection, function(result) {
					/* Assign the retrieved transaction details to the body of the request object
					* and set the status of the transaction to "Pending."
					*/
					req.body.transactionId = result.id;
					req.body.transactionStatusOld = result.status;

					transactionController.postEditStatusPending(req, res);
				});

		   /* Otherwise, if the delivery status is set to "Cancelled", set the status of its 
		    * corresponding transaction to "Cancelled."
			*/
		    } else {
			   /* The transaction ID corresponding to a delivery has a starting digit of 1 and the same
				* succeeding digits as the delivery ID.
				*/
			   const transactionId = parseInt(id) - 10000000;

			   /* Get the original status of the corresponding transaction. */
			   query = {id: transactionId};
			   projection = 'id status';

			   db.findOne(Transaction, query, projection, function(result) {
				   /* Assign the retrieved transaction details to the body of the request object
				   * and set the status of the transaction to "Cancelled."
				   */
				   req.body.transactionId = result.id;
				   req.body.transactionStatusOld = result.status;

				   transactionController.postEditStatusCancelled(req, res);
			   });
		   }
		});
	}
};

module.exports = deliveryController;
