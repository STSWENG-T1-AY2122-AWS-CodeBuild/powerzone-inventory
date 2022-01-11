/* JavaScript file containing the utility methods for the client-side validation of the transactions page */

/**
 * Checks if the phone number is valid based on its length.
 *
 * A valid phone number has at least 7 digits and at most 15 digits.
 *
 * @param {string} phoneNumber
 * @return {boolean} true if the phone number is valid; false, otherwise.
 */
const isValidPhoneNumber = function(phoneNumber) {
	if (phoneNumber.length < 7 || phoneNumber.length > 15) {
		return false;
	}

	return true;
};

export {isValidPhoneNumber};
