/* JavaScript file containing the utility methods for the client-side validation of the transactions page */

/**
 * Checks if the phone number is valid based on its length.
 *
 * A valid phone number has at least 7 digits and at most 15 digits.
 *
 * @param {string} phoneNumber Phone number to be checked.
 * @return {boolean} true if the phone number is valid; false, otherwise.
 */
const isValidPhoneNumber = function(phoneNumber) {
	return !isShortPhoneNumber(phoneNumber) && !isLongPhoneNumber(phoneNumber);
};

/**
 * Checks if the phone number is shorter than a valid phone number.
 *
 * A valid phone number has at least 7 digits.
 *
 * @param {string} phoneNumber Phone number to be checked.
 * @return {boolean} true if the phone number is shorter than required; false, otherwise.
 */
const isShortPhoneNumber = function(phoneNumber) {
	return phoneNumber.length < 7;
};

/**
 * Checks if the phone number is longer than a valid phone number.
 *
 * A valid phone number has at most 15 digits.
 *
 * @param {string} phoneNumber Phone number to be checked.
 * @return {boolean} true if the phone number is longer than required; false, otherwise.
 */
const isLongPhoneNumber = function(phoneNumber) {
	return phoneNumber.length > 15;
};

export {isValidPhoneNumber};
