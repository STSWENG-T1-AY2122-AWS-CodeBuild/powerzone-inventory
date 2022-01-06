const deepEqualInAnyOrder = require('deep-equal-in-any-order');
require('chai').use(deepEqualInAnyOrder);
const assert = require('chai').assert;
const expect = require('chai').expect;
const sinon = require('sinon');

const accountController = require('../controllers/account-controller.js');
const Account = require('../models/account-schema.js');
const db = require('../models/db.js');

describe('the function to get the account page', function() {
    let res;
    let expectedResult;

    beforeEach(function() {
        res = {
			status: sinon.stub().returnsThis(),
			json: sinon.stub(),
			send: sinon.stub(),
		};

        expectedResult = [
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
        ]
    });

	it('should retrieve all the accounts only once if the user is the administrator', function() {
        const req = {
			session: {
				role: 'administrator',
			},
		};

        sinon.stub(db, 'findMany').yields(expectedResult);
		accountController.getAccount(req, res);

        assert.isTrue(db.findMany.calledOnce);
        assert.equal(db.findMany.firstCall.args[0], Account);
		expect(db.findMany.firstCall.args[1]).to.deep.equalInAnyOrder({});
		assert.equal(db.findMany.firstCall.args[2], '_id firstName lastName username role status');

        db.findMany.restore();
	});

    it('should retrieve exactly one account only once if the user is not an administrator', function() {
        const req = {
			session: {
                username: 'jana',
				role: 'inventory-manager',
			},
		};

        sinon.stub(db, 'findOne').yields(expectedResult[0]);
		accountController.getAccount(req, res);

        assert.isTrue(db.findOne.calledOnce);
        assert.equal(db.findOne.firstCall.args[0], Account);
		expect(db.findOne.firstCall.args[1]).to.deep.equalInAnyOrder({username: req.session.username});
		assert.equal(db.findOne.firstCall.args[2], 'email firstName lastName role password');

        db.findOne.restore();
    });
});

describe('the function to update the status of the selected user account to "Rejected"', function() {
    it('should update the status of the account to "Rejected" only once', function() {
        let convertToObjectId = sinon.stub(db, 'convertToObjectId');
        convertToObjectId.returns('123');

        const req = {
            body: {
                accountId: '123'
            }
        }
        
        const res = {
			status: sinon.stub().returnsThis(),
			json: sinon.stub(),
			send: sinon.stub(),
		};

        const filter = {
            _id: convertToObjectId('123')
        };

        sinon.stub(db, 'updateOne').yields({});
        accountController.postEditStatusReject(req, res);

        assert.isTrue(db.updateOne.calledOnce);
        assert.equal(db.updateOne.firstCall.args[0], Account);
		expect(db.updateOne.firstCall.args[1]).to.deep.equalInAnyOrder(filter);
		expect(db.updateOne.firstCall.args[2]).to.deep.equalInAnyOrder({status: 'Rejected'});

        db.updateOne.restore();
    });
});
