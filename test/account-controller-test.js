const deepEqualInAnyOrder = require('deep-equal-in-any-order');
require('chai').use(deepEqualInAnyOrder);
const assert = require('chai').assert;
const expect = require('chai').expect;
const sinon = require('sinon');

const accountController = require('../controllers/account-controller.js');
const Account = require('../models/account-schema.js');
const db = require('../models/db.js');

/* Bcrypt is used to deal with password hashing. */
const bcrypt = require('bcrypt');

/* Use ten salt rounds for password hashing. */
const saltRounds = 10;

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

        db.convertToObjectId.restore();
        db.updateOne.restore();
    });
});

describe('the function to update the status of the selected user account to "Pending"', function() {
    it('should update the status of the account to "Pending" only once', function() {
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
        accountController.postEditStatusPending(req, res);

        assert.isTrue(db.updateOne.calledOnce);
        assert.equal(db.updateOne.firstCall.args[0], Account);
		expect(db.updateOne.firstCall.args[1]).to.deep.equalInAnyOrder(filter);
		expect(db.updateOne.firstCall.args[2]).to.deep.equalInAnyOrder({status: 'Pending'});

        db.convertToObjectId.restore();
        db.updateOne.restore();
    });
});

describe('the function to update the status of the selected user account to "Accepted"', function() {
    it('should update the status of the account to "Accepted" only once', function() {
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
        accountController.postEditStatusAccept(req, res);

        assert.isTrue(db.updateOne.calledOnce);
        assert.equal(db.updateOne.firstCall.args[0], Account);
		expect(db.updateOne.firstCall.args[1]).to.deep.equalInAnyOrder(filter);
		expect(db.updateOne.firstCall.args[2]).to.deep.equalInAnyOrder({status: 'Accepted'});

        db.convertToObjectId.restore();
        db.updateOne.restore();
    });
});

describe('the function to update the role of the selected user account', function() {
    it('should update the role of the account only once', function() {
        let convertToObjectId = sinon.stub(db, 'convertToObjectId');
        convertToObjectId.returns('123');

        const req = {
            body: {
                accountId: '123',
                editAccountRole: 'inventory-manager'
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
        accountController.postEditRole(req, res);

        assert.isTrue(db.updateOne.calledOnce);
        assert.equal(db.updateOne.firstCall.args[0], Account);
		expect(db.updateOne.firstCall.args[1]).to.deep.equalInAnyOrder(filter);
		expect(db.updateOne.firstCall.args[2]).to.deep.equalInAnyOrder({role: req.body.editAccountRole});

        db.convertToObjectId.restore();
        db.updateOne.restore();
    });
});

describe('the function to delete the selected user account', function() {
    it('should delete the account only once', function() {
        let convertToObjectId = sinon.stub(db, 'convertToObjectId');
        convertToObjectId.returns('123');

        const req = {
            body: {
                accountId: '123',
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

        sinon.stub(db, 'deleteOne').yields({});
        accountController.postDeleteAccount(req, res);

        assert.isTrue(db.deleteOne.calledOnce);
        assert.equal(db.deleteOne.firstCall.args[0], Account);
		expect(db.deleteOne.firstCall.args[1]).to.deep.equalInAnyOrder(filter);

        db.convertToObjectId.restore();
        db.deleteOne.restore();
    });
});

describe('the function to edit the account details', function() {
	let req;
	let res;
	let hash;

	beforeEach(function() {
		res = {
			status: sinon.stub().returnsThis(),
			json: sinon.stub(),
			send: sinon.stub(),
		};
	});

	afterEach(function() {
		bcrypt.hash.restore();
	});

	it('should hash the password only once', function() {
		req = {
			body: {
				editAccountEmail: 'hello@gmail.com',
				editAccountFName: 'hello',
				editAccountLName: 'hello',
				editAccountUsername: 'hello',
				editAccountNewPassword: 'hello',
				editAccountConfirmPassword: 'hello'
			},
            session: {
                username: 'hello'
            }
		};

		hash = 'fasdfasdfa';

		sinon.stub(bcrypt, 'hash').yields(null, hash);
		accountController.postEditAccount(req, res);

		assert.isTrue(bcrypt.hash.calledOnce);
		assert.equal(bcrypt.hash.firstCall.args[0], req.body.editAccountNewPassword);
	});

	it('should hash the password for the specified number of rounds', function() {
		req = {
			body: {
				editAccountEmail: 'hello@gmail.com',
				editAccountFName: 'hello',
				editAccountLName: 'hello',
				editAccountUsername: 'hello',
				editAccountNewPassword: 'hello',
				editAccountConfirmPassword: 'hello'
			},
            session: {
                username: 'hello'
            }
		};

		hash = 'fasdfasdfa';

		sinon.stub(bcrypt, 'hash').yields(null, hash);
		accountController.postEditAccount(req, res);

		assert.equal(bcrypt.hash.firstCall.args[1], saltRounds);
	});

	it('should not hash the password if the passwords do not match', function() {
		req = {
			body: {
				editAccountEmail: 'hello@gmail.com',
				editAccountFName: 'hello',
				editAccountLName: 'hello',
				editAccountUsername: 'hello',
				editAccountNewPassword: 'hello',
				editAccountConfirmPassword: 'hi'
			},
            session: {
                username: 'hello'
            }
		};

		hash = 'fasdfasdfa';

		sinon.stub(bcrypt, 'hash').yields(null, hash);
		accountController.postEditAccount(req, res);

		assert.isTrue(bcrypt.hash.notCalled);
	});
});

describe('the function to get the successful edit page', function() {
    it('should render the successful edit page only once', function() {
        const req = sinon.spy();
		const res = {
			render: sinon.spy(),
		};

        accountController.getSuccessfulEdit(req, res);
        assert.isTrue(res.render.calledOnce);
        assert.equal(res.render.firstCall.args[0], 'successful-edit');
    });
});

describe('the function to get the edit account page', function() {
    it('should render the successful edit page only once', function() {
        const req = sinon.spy();
		const res = {
			render: sinon.spy(),
		};

        accountController.getEditAccount(req, res);
        assert.isTrue(res.render.calledOnce);
        assert.equal(res.render.firstCall.args[0], 'edit-account');
    });
});