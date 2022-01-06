const deepEqualInAnyOrder = require('deep-equal-in-any-order');
require('chai').use(deepEqualInAnyOrder);
const assert = require('chai').assert;
const expect = require('chai').expect;
const sinon = require('sinon');

const homeController = require('../controllers/home-controller.js');
const SellingPrice = require('../models/selling-price-schema.js');
const db = require('../models/db.js');

describe('the function to get the home page', function() {
	it('should search the database for the selling prices only once', function() {
		const req = {
			session: {
				username: 'bettina',
			},
		};

		const res = {
			render: sinon.spy(),
			redirect: sinon.spy(),
		};

		const expectedResult = {
			role: 'inventory-manager',
			gasoline: '6.23',
			premiumGasoline95: '6.23',
			diesel: '6.23',
			premiumGasoline97: '6.23',
			kerosene: '6.23',
		};

		sinon.stub(db, 'findOne').yields(expectedResult);
		homeController.getHome(req, res);

		assert.isTrue(db.findOne.calledOnce);
		assert.equal(db.findOne.firstCall.args[0], SellingPrice);
		expect(db.findOne.firstCall.args[1]).to.deep.equalInAnyOrder({label: 'Prices'});
		assert.equal(db.findOne.firstCall.args[2], 'gasoline premiumGasoline95 diesel premiumGasoline97 kerosene');

		db.findOne.restore();
	});

	it('should not redirect to the log-in page if the user is logged in', function() {
		const req = {
			session: {
				username: 'bettina',
			},
		};

		const res = {
			render: sinon.spy(),
			redirect: sinon.spy(),
		};

		homeController.getHome(req, res);

		assert.isTrue(res.redirect.notCalled);
	});

	it('should redirect to the log-in page only once if the user is not logged in', function() {
		const req = {
			session: {
				username: null,
			},
		};

		const res = {
			render: sinon.spy(),
			redirect: sinon.spy(),
		};

		homeController.getHome(req, res);

		assert.isTrue(res.redirect.calledOnce);
		assert.equal(res.redirect.firstCall.args[0], '/');
	});

	it('should not render the home page if the user is not logged in', function() {
		const req = {
			session: {
				username: null,
			},
		};

		const res = {
			render: sinon.spy(),
			redirect: sinon.spy(),
		};

		homeController.getHome(req, res);

		assert.isTrue(res.render.notCalled);
	});
});
