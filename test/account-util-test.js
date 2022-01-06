const assert = require('chai').assert;

const {
	getRoleValue,
} = require('.././public/js/account-util.js');

describe('the function to convert a role to its equivalent value in the database', function() {
	it('should return a string', function() {
		const result = getRoleValue('Inventory Manager');
		assert.isString(result);
	});

	it('should return inventory-manager if the role is Inventory Manager', function() {
		const result = getRoleValue('Inventory Manager');
		assert.equal(result, 'inventory-manager');
	});

	it('should return transaction-cashier if the role is Transaction Cashier', function() {
		const result = getRoleValue('Transaction Cashier');
		assert.equal(result, 'transaction-cashier');
	});

	it('should return delivery-manager if the role is Delivery Manager', function() {
		const result = getRoleValue('Delivery Manager');
		assert.equal(result, 'delivery-manager');
	});
});
