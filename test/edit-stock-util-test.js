const assert = require('chai').assert;

const {
	getFuelValue
} = require('.././public/js/edit-stock-util.js');

describe('the function to convert a role to its equivalent value in the database', function() {
	it('should return a string', function() {
		const result = getFuelValue('Gasoline');
		assert.isString(result);
	});

	it('should return gasoline if the fuel is Gasoline', function() {
		const result = getFuelValue('Gasoline');
		assert.equal(result, 'gasoline');
	});

	it('should return premium-gasoline-95 if the fuel is Premium Gasoline 95', function() {
		const result = getFuelValue('Premium Gasoline 95');
		assert.equal(result, 'premium-gasoline-95');
	});

	it('should return diesel if the fuel is Diesel', function() {
		const result = getFuelValue('Diesel');
		assert.equal(result, 'diesel');
	});

	it('should return premium-gasoline-97 if the fuel is Premium Gasoline 97', function() {
		const result = getFuelValue('Premium Gasoline 97');
		assert.equal(result, 'premium-gasoline-97');
	});

	it('should return kerosene if the fuel is Kerosene', function() {
		const result = getFuelValue('Kerosene');
		assert.equal(result, 'kerosene');
	});
});
