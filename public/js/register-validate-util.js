/* JavaScript file containing the utility methods for the client-side validation of account-related pages */

/**
 * Checks if the length of an unhashed password is valid.
 *
 * A password should have at least 12 characters.
 *
 * @param {string} password Unhashed password.
 * @return {boolean} true if the length of the unhashed password is valid; false, otherwise.
 */
const isPasswordLengthValid = function(password) {
	return password.length >= 12;
};

/**
 * Checks if the format of an unhashed password is valid.
 *
 * A password should contain at least one lowercase letter, uppercase letter, number, and special character.
 *
 * @param {string} password Unhashed password.
 * @return {boolean} true if the format of the unhashed password is valid; false, otherwise.
 */
const isPasswordFormatValid = function(password) {
	const format = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&^()|{}\[\]:;\"<>'`#,./~\\+=-])[A-Za-z\d@$!%*?&^()|{}\[\]:;\"<>'`#,./~\\+=-]/;

	/* Resolves the issue wherein the regex fails if the first character is a space. */
	return format.test(password.trim());
};

/**
 * Checks if the length of a username is valid.
 *
 * A username should have at least one character when trimmed of trailing and starting whitespaces.
 *
 * @param {string} username Untrimmed username.
 * @return {boolean} true if the length of the username is valid; false, otherwise.
 */
const isUsernameLengthValid = function(username) {
	return username.trim().length >= 1;
};

/**
 * Checks if the format of a username is valid.
 *
 * A username is not allowed to consiste solely of special characters.
 *
 * @param {string} username Username.
 * @return {boolean} true if the format of the username is valid; false, otherwise.
 */
const isUsernameFormatValid = function(username) {
	const format = /^[^a-zA-Z0-9]+$/;
	return !format.test(username);
};

/**
 * Checks if the two unhashed passwords are matching.
 *
 * @param {string} password First password (unhashed).
 * @param {string} confirmPassword Confirmatory password (unhashed).
 * @return {boolean} true if the unhashed passwords are matching; false, otherwise.
 */
const arePasswordsMatching = function(password, confirmPassword) {
	return password === confirmPassword;
};

export {
	isPasswordLengthValid,
	isPasswordFormatValid,
	isUsernameLengthValid,
	isUsernameFormatValid,
	arePasswordsMatching
};
