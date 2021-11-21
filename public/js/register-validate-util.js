const validator = require('./validator.min.js');

const isPasswordLengthValid = function(password) {
    return validator.isLength(password, {min: 12});
}

module.exports = {
    isPasswordLengthValid
}