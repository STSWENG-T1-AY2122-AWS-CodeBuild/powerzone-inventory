/* Utility object containing functions for processing and formatting the database retrieval results of 
 * the delivery controller. 
 */

/* The db file and transaction schema are used for retrieving transaction details. */
const db = require('../models/db.js');
const Transaction = require('../models/transaction-schema.js');

/* The transaction controller is used to update the transaction status.*/
const transactionController = require('./transaction-controller.js');

const deliveryControllerUtil = {
	/**
	 * Formats the database results for display in the delivery page.
	 *
	 * @param result  Object that contains the result of the database retrieval.
	 */
	deliveryUtil: function(result) {
		/* Store the details of all deliveries in individual arrays to allow for further formatting. */
		const ids = [];
		const dates = [];
		const customers = [];
		const dropoffs = [];
		const statuses = [];

		/* Assign the result of the database retrieval to the variable deliveries. */
		const deliveries = result;

		/* For each delivery, store the delivery details in the individual arrays. */
		for (let i = 0; i < deliveries.length; i++) {
			/* Format the display of the delivery date from the Date object, if applicable,
             * stored in the database.
             */
			if (deliveries[i].date != null) {
				const month = deliveries[i].date.getMonth() + 1;
				let formattedMonth = month;
				if (month.toString().length < 2) {
					formattedMonth = '0' + month.toString();
				}

				const date = deliveries[i].date.getDate();
				let formattedDate = date;
				if (date.toString().length < 2) {
					formattedDate = '0' + date.toString();
				}

				const year = deliveries[i].date.getFullYear();

				dates[i] = formattedMonth + '/' + formattedDate + '/' + year;
			} else {
				dates[i] = null;
			}

			/* Store the other delivery details in their respective arrays. */
			ids[i] = deliveries[i].id;
			customers[i] = deliveries[i].customer;
			dropoffs[i] = deliveries[i].dropoff;
			statuses[i] = deliveries[i].status;
		}

		/* Return the initialized arrays. */
		return {ids, dates, customers, dropoffs, statuses};
	},

	/**
	 * Sets the status of the transaction corresponding to the selected delivery to "Completed".
	 *
	 * @param {Express.Request} req  Object that contains information on the HTTP request from the client.
	 * @param {Express.Response} res  Object that contains information on the HTTP response from the server.
	 * @param id	String that contains the delivery ID of the selected delivery.
	 */
	completeTransaction: function(req, res, id) {
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
	}
};

module.exports = deliveryControllerUtil;
