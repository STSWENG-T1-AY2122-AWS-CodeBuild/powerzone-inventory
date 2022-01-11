const deepEqualInAnyOrder = require('deep-equal-in-any-order');
require('chai').use(deepEqualInAnyOrder);
const assert = require('chai').assert;
const expect = require('chai').expect;
const sinon = require('sinon');

const homeController = require('../controllers/home-controller.js');
const SellingPrice = require('../models/selling-price-schema.js');
const db = require('../models/db.js');

describe('the function to get the home page', function() {
	let res;
	
	beforeEach(function() {
		res = {
			render: sinon.spy(),
			redirect: sinon.spy()
		};
	});
	
	it('should search the database for the selling prices only once', function() {
		const req = {
			session: {
				username: 'bettina'
			}
		};

		const expectedResult = {
			role: 'inventory-manager',
			gasoline: '6.23',
			premiumGasoline95: '6.23',
			diesel: '6.23',
			premiumGasoline97: '6.23',
			kerosene: '6.23'
		};

		sinon.stub(db, 'findOne').yields(expectedResult);
		homeController.getHome(req, res);

		assert.isTrue(db.findOne.calledOnce);
		db.findOne.restore();
	});

	it('should search the database for the selling prices with the correct arguments', function() {
		const req = {
			session: {
				username: 'bettina'
			}
		};

		const expectedResult = {
			role: 'inventory-manager',
			gasoline: '6.23',
			premiumGasoline95: '6.23',
			diesel: '6.23',
			premiumGasoline97: '6.23',
			kerosene: '6.23'
		};

		sinon.stub(db, 'findOne').yields(expectedResult);
		homeController.getHome(req, res);

		assert.equal(db.findOne.firstCall.args[0], SellingPrice);
		expect(db.findOne.firstCall.args[1]).to.deep.equalInAnyOrder({label: 'Prices'});
		assert.equal(db.findOne.firstCall.args[2], 'gasoline premiumGasoline95 diesel premiumGasoline97 kerosene');

		db.findOne.restore();
	});

	it('should not redirect to the log-in page if the user is logged in', function() {
		const req = {
			session: {
				username: 'bettina'
			}
		};

		homeController.getHome(req, res);
		assert.isTrue(res.redirect.notCalled);
	});

	it('should redirect to the next page only once if the user is not logged in', function() {
		const req = {
			session: {
				username: null
			}
		};

		homeController.getHome(req, res);
		assert.isTrue(res.redirect.calledOnce);
	});

	it('should redirect to the log-in page if the user is not logged in', function() {
		const req = {
			session: {
				username: null
			}
		};

		homeController.getHome(req, res);
		assert.equal(res.redirect.firstCall.args[0], '/');
	});

	it('should not render the home page if the user is not logged in', function() {
		const req = {
			session: {
				username: null
			}
		};

		homeController.getHome(req, res);
		assert.isTrue(res.render.notCalled);
	});
});

describe('the function to edit the selling prices displayed on the home page', function() {
	let req;
	let res;
	let update;

	beforeEach(function() {
		req = {
			body: {
				editGasolinePrice: '67',
				editPremiumGasoline95Price: '78',
				editDieselPrice: '89',
				editPremiumGasoline97Price: '10',
				editKerosenePrice: '12'
			}
		};

		res = {
			status: sinon.stub().returnsThis(),
			json: sinon.stub(),
			send: sinon.stub()
		};

		update = {
			gasoline: req.body.editGasolinePrice,
			premiumGasoline95: req.body.editPremiumGasoline95Price,
			diesel: req.body.editDieselPrice,
			premiumGasoline97: req.body.editPremiumGasoline97Price,
			kerosene: req.body.editKerosenePrice
		};
	});

	it('should update the database with the correct prices only once', function() {
		sinon.stub(db, 'updateOne').yields({});
		homeController.postEditPrices(req, res);

		assert.isTrue(db.updateOne.calledOnce);
		db.updateOne.restore();
	});

	it('should update the database with the correct prices with the correct arguments', function() {
		sinon.stub(db, 'updateOne').yields({});
		homeController.postEditPrices(req, res);

		assert.equal(db.updateOne.firstCall.args[0], SellingPrice);
		expect(db.updateOne.firstCall.args[1]).to.deep.equalInAnyOrder({label: 'Prices'});
		expect(db.updateOne.firstCall.args[2]).to.deep.equalInAnyOrder(update);

		db.updateOne.restore();
	});
});
