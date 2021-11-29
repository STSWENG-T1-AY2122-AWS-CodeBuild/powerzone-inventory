const assert = require('chai').assert;
const {
    isPasswordLengthValid
} = require('.././public/js/register-validate-util.js')

describe('the function to check if the password is at least 12 characters', function() {
    it('should return a Boolean', function() {
        const result = isPasswordLengthValid('abc12345678');
        assert.isBoolean(result);
    });

    it('should return false when the password has less than 12 characters', function() {
        const result = isPasswordLengthValid('abc12345678');
        assert.isFalse(result);
    });

    it('should return false when the password has exactly 12 characters', function() {
        const result = isPasswordLengthValid('abcd12345678');
        assert.isTrue(result);
    });

    it('should return false when the password has more than 12 characters', function() {
        const result = isPasswordLengthValid('abcdef1234567890');
        assert.isTrue(result);
    });
});