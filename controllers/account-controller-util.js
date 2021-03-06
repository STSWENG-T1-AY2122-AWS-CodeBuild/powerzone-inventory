/* Utility object containing functions for processing and formatting the database retrieval results of
 * the account controller.
 */
const accountControllerUtil = {
	/**
	 * Formats the database results for display in the account page.
	 *
	 * @param {Object} result  Object that contains the result of the database retrieval.
	 * @return {Object}	Formatted account details.
	 */
	accountUtil: function(result) {
		/* Assign the result of the database retrieval to the variable accounts. */
		const accounts = result;

		/* For each account, push its details to the accountDetails array if the account
         * does not belong to the administrator.
         */
		const accountDetails = [];
		for (let i = 0; i < accounts.length; i++) {
			if (accounts[i].role != 'administrator') {
				accountDetails.push(accounts[i]);
			}
		}

		/* Store the retrieved account details in the variable data. */
		const data = {
			accountDetails: accountDetails
		};

		return data;
	}
};

module.exports = accountControllerUtil;
