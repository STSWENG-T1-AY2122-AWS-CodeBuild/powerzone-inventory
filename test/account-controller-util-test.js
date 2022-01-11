const deepEqualInAnyOrder = require('deep-equal-in-any-order');
require('chai').use(deepEqualInAnyOrder);
const expect = require('chai').expect;

const accountControllerUtil = require('../controllers/account-controller-util.js');

describe('the utility function for retrieving the account details from the admin side', function() {
    it('should return all the retrieved accounts', function() {
        const dbResult = [
			{
				_id: '01234',
				firstName: 'mark',
				lastName: 'sy',
				username: 'cheems',
				role: 'inventory-manager',
				status: 'pending'
			},
			{
				_id: '01235',
				firstName: 'bark',
				lastName: 'see',
				username: 'doge',
				role: 'transaction-cashier',
				status: 'rejected'
			}
		];

        const result = accountControllerUtil.accountUtil(dbResult);

        expect(result).to.deep.equalInAnyOrder({accountDetails: dbResult});
    });

    it('should exclude the administrator account from the retrieved accounts', function() {
        const dbResult = [
			{
				_id: '01234',
				firstName: 'mark',
				lastName: 'sy',
				username: 'cheems',
				role: 'inventory-manager',
				status: 'pending'
			},
			{
				_id: '01235',
				firstName: 'bark',
				lastName: 'see',
				username: 'doge',
				role: 'transaction-cashier',
				status: 'rejected'
			},
            {
				_id: '01236',
				firstName: 'bork',
				lastName: 'chua',
				username: 'zoie',
				role: 'administrator',
				status: 'rejected'
			}
		];

        const expectedResult = [
			{
				_id: '01234',
				firstName: 'mark',
				lastName: 'sy',
				username: 'cheems',
				role: 'inventory-manager',
				status: 'pending'
			},
			{
				_id: '01235',
				firstName: 'bark',
				lastName: 'see',
				username: 'doge',
				role: 'transaction-cashier',
				status: 'rejected'
			}
		];

        const result = accountControllerUtil.accountUtil(dbResult);

        expect(result).to.deep.equalInAnyOrder({accountDetails: expectedResult});
    });
});