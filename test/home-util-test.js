const assert = require('chai').assert;

const {
    isAllowedToEdit
} = require('.././public/js/home-util.js');

describe('the function to check if a role has the privilege to edit inventory prices', function() {
    it('should return a Boolean value', function() {
        const result = isAllowedToEdit('administrator');
        assert.isBoolean(result);
    });

    it('should return true if the role is administrator', function() {
        const result = isAllowedToEdit('administrator');
        assert.isTrue(result);
    });

    it('should return true if the role is inventory manager', function() {
        const result = isAllowedToEdit('inventory-manager');
        assert.isTrue(result);
    });

    it('should return false if the role is transaction cashier', function() {
        const result = isAllowedToEdit('transaction-cashier');
        assert.isFalse(result);
    });

    it('should return false if the role is delivery manager', function() {
        const result = isAllowedToEdit('delivery-manager');
        assert.isFalse(result);
    });
});