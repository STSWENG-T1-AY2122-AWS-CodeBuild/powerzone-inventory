const validator = require('./validator.min.js');

const isPasswordLengthValid = function(password) {
    return validator.isLength(password, {min: 12});
}

const isPasswordFormatValid = function(password) {
    return validator.matches(password, /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&^()|{}\[\]:;\"<>'`#,./~\\+=-])[A-Za-z\d@$!%*?&^()|{}\[\]:;\"<>'`#,./~\\+=-]/)
}

const isPasswordValid = function(password) {
    return isPasswordLengthValid && isPasswordFormatValid;
}

const isUsernameLengthValid = function(username) {
    return validator.isLength(username.trim(), {min: 1});
}

const isUsernameValid = function(password) {
    return isUsernameLengthValid;
}

module.exports = {
    isPasswordLengthValid,
    isPasswordFormatValid,
    isUsernameLengthValid
}