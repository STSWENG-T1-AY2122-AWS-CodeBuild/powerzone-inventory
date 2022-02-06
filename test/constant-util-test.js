const assert = require('chai').assert;

const {
	getFuelTypes,
	getFuelTypeNames,
	getDiscountPercents,
	getDiscountCutOffs
} = require('.././public/js/constant-util.js');

describe('the function to return the database values of the fuel types recognized by the system', function() {
	it('should return an array', function() {
		const result = getFuelTypes();
		assert.isArray(result);
	});

	it('should return the correct fuel types', function() {
		const result = getFuelTypes();
		assert.deepEqual(result, ['gasoline', 'premium-gasoline-95', 'diesel', 'premium-gasoline-97', 'kerosene']);
	});
});

describe('the function to return the names of the fuel types recognized by the system', function() {
	it('should return an array', function() {
		const result = getFuelTypeNames();
		assert.isArray(result);
	});

	it('should return the correct names of the fuel types', function() {
		const result = getFuelTypeNames();
		assert.deepEqual(result, ['Gasoline', 'Premium Gasoline 95', 'Diesel', 'Premium Gasoline 97', 'Kerosene']);
	});
});

describe('the function to return the discount rates for bulk orders', function() {
	it('should return an array', function() {
		const result = getDiscountPercents();
		assert.isArray(result);
	});

	it('should return the correct discount rates', function() {
		const result = getDiscountPercents();
		assert.deepEqual(result, [0.02, 0.05]);
	});
});

describe('the function to return the cut-offs (in terms of liters of fuel ordered) for the discount scheme for bulk orders', function() {
	it('should return an array', function() {
		const result = getDiscountCutOffs();
		assert.isArray(result);
	});

	it('should return the correct cut-offs (in terms of liters of fuel ordered)', function() {
		const result = getDiscountCutOffs();
		assert.deepEqual(result, [50000, 150000]);
	});
});
