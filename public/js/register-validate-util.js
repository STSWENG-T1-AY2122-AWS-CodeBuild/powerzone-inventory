const isPasswordLengthValid = function(password) {
	return password.length >= 12;
};

const isPasswordFormatValid = function(password) {
	const format = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&^()|{}\[\]:;\"<>'`#,./~\\+=-])[A-Za-z\d@$!%*?&^()|{}\[\]:;\"<>'`#,./~\\+=-]/;
	return format.test(password.trim());
};

const isUsernameLengthValid = function(username) {
	return username.trim().length >= 1;
};

const isUsernameFormatValid = function(username) {
	const format = /^[^a-zA-Z0-9]+$/;
	return !format.test(username);
};

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
