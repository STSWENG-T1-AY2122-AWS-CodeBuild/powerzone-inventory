const assert = require('chai').assert;

const {isValidPhoneNumber} = require('../public/js/transaction-delivery-validate-util.js');

describe('the function to check if a phone number is valid based on its length', function() {
	it('should return a Boolean', function() {
		const result = isValidPhoneNumber('12345678');
		assert.isBoolean(result);
	});

	it('should return false if the phone number has less than 7 digits', function() {
		const result = isValidPhoneNumber('123456');
		assert.isFalse(result);
	});

	it('should return false if the phone number has more than 15 digits', function() {
		const result = isValidPhoneNumber('1234561234561234');
		assert.isFalse(result);
	});

	it('should return true if the phone number has 7 digits', function() {
		const result = isValidPhoneNumber('1234567');
		assert.isTrue(result);
	});

	it('should return true if the phone number has 15 digits', function() {
		const result = isValidPhoneNumber('123456123456123');
		assert.isTrue(result);
	});

	it('should return true if the phone number between 7 and 15 digits', function() {
		const result = isValidPhoneNumber('123456789');
		assert.isTrue(result);
	});
});
