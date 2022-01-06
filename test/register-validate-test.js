const assert = require('chai').assert;

const {
	isPasswordLengthValid,
	isPasswordFormatValid,
	isUsernameLengthValid,
	arePasswordsMatching,
} = require('.././public/js/register-validate-util.js');

describe('the function to check if the password has at least 12 characters', function() {
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

describe('the function to check if the password has at least one lowercase letter, uppercase letter, number, and punctuation', function() {
	it('should return a Boolean', function() {
		const result = isPasswordFormatValid('abc12345678');
		assert.isBoolean(result);
	});

	it('should return false if password contains only lowercase letters', function() {
		const result = isPasswordFormatValid('abcd');
		assert.isFalse(result);
	});

	it('should return false if password contains only uppercase letters', function() {
		const result = isPasswordFormatValid('ABCD');
		assert.isFalse(result);
	});

	it('should return false if password contains only numbers', function() {
		const result = isPasswordFormatValid('1234');
		assert.isFalse(result);
	});

	it('should return false if password contains only punctuations', function() {
		const result = isPasswordFormatValid('./({');
		assert.isFalse(result);
	});

	it('should return false if password contains only letters', function() {
		const result = isPasswordFormatValid('aAtGbBC');
		assert.isFalse(result);
	});

	it('should return false if password contains only letters and numbers', function() {
		const result = isPasswordFormatValid('aA1234tGbBC');
		assert.isFalse(result);
	});

	it('should return false if password contains only numbers and punctuations', function() {
		const result = isPasswordFormatValid('12423;()*');
		assert.isFalse(result);
	});

	it('should return false if password contains only letters and punctuations', function() {
		const result = isPasswordFormatValid('sdfasd;()AFfGT*');
		assert.isFalse(result);
	});

	it('should return false if password contains only uppercase letters, numbers and punctuations', function() {
		const result = isPasswordFormatValid('23534;()AFGT*');
		assert.isFalse(result);
	});

	it('should return false if password contains only lowercase letters, numbers and punctuations', function() {
		const result = isPasswordFormatValid('sdfasd;()2345*');
		assert.isFalse(result);
	});

	it('should return true if password contains at least one lowercase letter, uppercase letter, number, and punctuation', function() {
		const result = isPasswordFormatValid('aAdsfR3234;{Z}');
		assert.isTrue(result);
	});
});

describe('the function to check if the trimmed username has at least one character', function() {
	it('should return a Boolean', function() {
		const result = isUsernameLengthValid('abc12345678');
		assert.isBoolean(result);
	});

	it('should return false if the username consists only of a single space', function() {
		const result = isUsernameLengthValid(' ');
		assert.isFalse(result);
	});

	it('should return false if the username consists only of spaces', function() {
		const result = isUsernameLengthValid('    ');
		assert.isFalse(result);
	});

	it('should return true if the trimmed username consists at least one character', function() {
		const result = isUsernameLengthValid(' memgonzales');
		assert.isTrue(result);
	});
});

describe('the function to check if passwords match', function() {
	it('should return a Boolean', function() {
		const result = arePasswordsMatching('hello', 'hello');
		assert.isBoolean(result);
	});

	it('should return false if the passwords do not match', function() {
		const result = arePasswordsMatching('hellO', 'nihao');
		assert.isFalse(result);
	});

	it('should return false if the passwords contain the same characters but with different capitalization', function() {
		const result = arePasswordsMatching('hellO', 'hEllo');
		assert.isFalse(result);
	});

	it('should return false if the passwords are identical except for trailing spaces', function() {
		const result = arePasswordsMatching('hello ', 'hello');
		assert.isFalse(result);
	});

	it('should return true if the passwords match', function() {
		const result = arePasswordsMatching('hello', 'hello');
		assert.isTrue(result);
	});
});
