const deepEqualInAnyOrder = require('deep-equal-in-any-order');
require('chai').use(deepEqualInAnyOrder);
const assert = require('chai').assert;
const expect = require('chai').expect;
const sinon = require('sinon');

const logInController = require('../controllers/log-in-controller.js');
const Account = require('../models/account-schema.js');
const db = require('../models/db.js');

describe('the function to get the log-in page', function() {
	it('should render the log-in page only once if the user is not logged in', function() {
		const req = {
			session: {
				username: null,
			},
		};

		const res = {
			render: sinon.spy(),
			redirect: sinon.spy(),
		};

		logInController.getLogIn(req, res);

		assert.isTrue(res.render.calledOnce);
		assert.equal(res.render.firstCall.args[0], 'log-in');
	});

	it('should not redirect to the home page if the user is not logged in', function() {
		const req = {
			session: {
				username: null,
			},
		};

		const res = {
			render: sinon.spy(),
			redirect: sinon.spy(),
		};

		logInController.getLogIn(req, res);

		assert.isTrue(res.redirect.notCalled);
	});

	it('should redirect to the home page if the user is logged in', function() {
		const req = {
			session: {
				username: 'bettina',
			},
		};

		const res = {
			render: sinon.spy(),
			redirect: sinon.spy(),
		};

		logInController.getLogIn(req, res);

		assert.isTrue(res.redirect.calledOnce);
		assert.equal(res.redirect.firstCall.args[0], '/getHome');
	});

	it('should not render the log-in page if the user is not logged in', function() {
		const req = {
			session: {
				username: 'bettina',
			},
		};

		const res = {
			render: sinon.spy(),
			redirect: sinon.spy(),
		};

		logInController.getLogIn(req, res);

		assert.isTrue(res.render.notCalled);
	});
});

describe('the function to log a user into the application', function() {
	let req;
	let res;
	let expectedResult;

	beforeEach(function() {
		req = {
			body: {
				loginUsername: 'hello',
				loginPassword: 'hello',
			},
		};

		res = {
			status: sinon.stub().returnsThis(),
			json: sinon.stub(),
			send: sinon.stub(),
		};

		expectedResult = {
			email: 'hello@gmail.com',
			name: 'hello',
			username: 'hello',
			role: 'inventory-manager',
			password: 'hello',
		};

		sinon.stub(db, 'findOne').yields(expectedResult);
		logInController.postLogIn(req, res);
	});

	it('should search the database for the username only once', function() {
		assert.isTrue(db.findOne.calledOnce);
		assert.equal(db.findOne.firstCall.args[0], Account);
		expect(db.findOne.firstCall.args[1]).to.deep.equalInAnyOrder({username: req.body.loginUsername});

		db.findOne.restore();
	});
});
