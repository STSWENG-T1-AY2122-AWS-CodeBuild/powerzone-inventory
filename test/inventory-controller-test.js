const deepEqualInAnyOrder = require('deep-equal-in-any-order');
require('chai').use(deepEqualInAnyOrder);
const assert = require('chai').assert;
const expect = require('chai').expect;
const sinon = require('sinon');

const inventoryController = require('../controllers/inventory-controller.js');
const Inventory = require('../models/inventory-schema.js');
const db = require('../models/db.js');

describe('the function to get the inventory page', function() {
	let req;
	let res;
	let expectedResult;

	beforeEach(function() {
		req = {
			session: {
				role: 'administrator'
			}
		};

		res = {
			status: sinon.stub().returnsThis(),
			json: sinon.stub(),
			send: sinon.stub(),
			render: sinon.spy()
		};

		expectedResult = [
			{
				_id: '01234',
				type: 'Diesel',
				date: '01-06-2022',
				supplier: 'Chevron',
				price: '67.83',
				quantity: '1200'
			},
			{
				_id: '012234',
				type: 'Kerosene',
				date: '01-06-2022',
				supplier: 'Rhombus',
				price: '61.83',
				quantity: '200'
			}
		];
	});

	it('should retrieve the details of all the inventory purchases only once', function() {
		sinon.stub(db, 'findMany').yields(expectedResult);
		inventoryController.getInventory(req, res);

		assert.isTrue(db.findMany.calledOnce);

		db.findMany.restore();
	});

	it('should retrieve the details of all the inventory purchases with the correct arguments', function() {
		sinon.stub(db, 'findMany').yields(expectedResult);
		inventoryController.getInventory(req, res);

		assert.equal(db.findMany.firstCall.args[0], Inventory);
		expect(db.findMany.firstCall.args[1]).to.deep.equalInAnyOrder({});
		assert.equal(db.findMany.firstCall.args[2], '_id type date supplier price quantityPurchased quantityDepleted');

		db.findMany.restore();
	});
});

describe('the function to get the page displaying more information for a particular stock', function() {
	it('should retrieve the information for the stock only once', function() {
		const req = {
			params: {
				id: '1234'
			}
		};

		const res = {
			status: sinon.stub().returnsThis(),
			json: sinon.stub(),
			send: sinon.stub()
		};

		const expectedResult = {
			_id: '01234',
			type: 'Diesel',
			supplier: 'Chevron',
			location: 'Manila',
			quantity: '1200',
			price: '67.83',
			date: '01-06-2022'
		};

		const convertToObjectId = sinon.stub(db, 'convertToObjectId');
		convertToObjectId.returns('123');

		sinon.stub(db, 'findOne').yields(expectedResult);
		inventoryController.getMoreInfoStock(req, res);

		assert.isTrue(db.findOne.calledOnce);

		db.convertToObjectId.restore();
		db.findOne.restore();
	});

	it('should retrieve the information for the stock with the correct arguments', function() {
		const req = {
			params: {
				id: '1234'
			}
		};

		const res = {
			status: sinon.stub().returnsThis(),
			json: sinon.stub(),
			send: sinon.stub()
		};

		const expectedResult = {
			_id: '01234',
			type: 'Diesel',
			supplier: 'Chevron',
			location: 'Manila',
			quantity: '1200',
			price: '67.83',
			date: '01-06-2022'
		};

		const convertToObjectId = sinon.stub(db, 'convertToObjectId');
		convertToObjectId.returns('123');

		const filter = {
			_id: convertToObjectId('123')
		};

		sinon.stub(db, 'findOne').yields(expectedResult);
		inventoryController.getMoreInfoStock(req, res);

		assert.equal(db.findOne.firstCall.args[0], Inventory);
		expect(db.findOne.firstCall.args[1]).to.deep.equalInAnyOrder(filter);
		assert.equal(db.findOne.firstCall.args[2], 'type supplier location quantityPurchased quantityDepleted price date');

		db.convertToObjectId.restore();
		db.findOne.restore();
	});
});

describe('the function to get the page for editing information on a particular stock', function() {
	it('should retrieve the information for the stock only once', function() {
		const req = {
			params: {
				id: '1234'
			}
		};

		const res = {
			status: sinon.stub().returnsThis(),
			json: sinon.stub(),
			send: sinon.stub()
		};

		const expectedResult = {
			_id: '01234',
			type: 'Diesel',
			supplier: 'Chevron',
			location: 'Manila',
			quantity: '1200',
			price: '67.83',
			date: '01-06-2022'
		};

		const convertToObjectId = sinon.stub(db, 'convertToObjectId');
		convertToObjectId.returns('123');

		sinon.stub(db, 'findOne').yields(expectedResult);
		inventoryController.getEditStock(req, res);

		assert.isTrue(db.findOne.calledOnce);

		db.convertToObjectId.restore();
		db.findOne.restore();
	});

	it('should retrieve the information for the stock with the correct arguments', function() {
		const req = {
			params: {
				id: '1234'
			}
		};

		const res = {
			status: sinon.stub().returnsThis(),
			json: sinon.stub(),
			send: sinon.stub()
		};

		const expectedResult = {
			_id: '01234',
			type: 'Diesel',
			supplier: 'Chevron',
			location: 'Manila',
			quantity: '1200',
			price: '67.83',
			date: '01-06-2022'
		};

		const convertToObjectId = sinon.stub(db, 'convertToObjectId');
		convertToObjectId.returns('123');

		const filter = {
			_id: convertToObjectId('123')
		};

		sinon.stub(db, 'findOne').yields(expectedResult);
		inventoryController.getEditStock(req, res);

		assert.equal(db.findOne.firstCall.args[0], Inventory);
		expect(db.findOne.firstCall.args[1]).to.deep.equalInAnyOrder(filter);
		assert.equal(db.findOne.firstCall.args[2], 'type supplier location quantityPurchased quantityDepleted price date');

		db.convertToObjectId.restore();
		db.findOne.restore();
	});
});

describe('the function to register the details of a particular stock', function() {
	it('should retrieve the information for the stock only once', function() {
		const req = {
			body: {
				editStockId: '1234',
				editStockName: 'Diesel',
				editStockSupplier: 'Chevron',
				editStockStorage: 'Masangkay',
				editStockQuantityPurchased: '1234',
				editStockQuantityDepleted: '1000',
				editStockPricePurchased: '45.3',
				editStockDatePurchased: '05-06-2022'
			}
		};

		const res = {
			status: sinon.stub().returnsThis(),
			json: sinon.stub(),
			send: sinon.stub()
		};

		const convertToObjectId = sinon.stub(db, 'convertToObjectId');
		convertToObjectId.returns('123');

		sinon.stub(db, 'updateOne').yields({});
		inventoryController.postEditStock(req, res);

		assert.isTrue(db.updateOne.calledOnce);

		db.convertToObjectId.restore();
		db.updateOne.restore();
	});

	it('should retrieve the information for the stock with the correct arguments', function() {
		const req = {
			body: {
				editStockId: '1234',
				editStockName: 'Diesel',
				editStockSupplier: 'Chevron',
				editStockStorage: 'Masangkay',
				editStockQuantityPurchased: '1234',
				editStockQuantityDepleted: '1000',
				editStockPricePurchased: '45.3',
				editStockDatePurchased: '05-06-2022'
			}
		};

		const res = {
			status: sinon.stub().returnsThis(),
			json: sinon.stub(),
			send: sinon.stub()
		};

		const convertToObjectId = sinon.stub(db, 'convertToObjectId');
		convertToObjectId.returns('123');

		const filter = {
			_id: convertToObjectId('123')
		};

		const update = {
			type: req.body.editStockName.trim(),
			supplier: req.body.editStockSupplier.trim(),
			location: req.body.editStockStorage.trim(),
			quantityPurchased: req.body.editStockQuantity,
			price: req.body.editStockPricePurchased,
			date: req.body.editStockDatePurchased
		};

		sinon.stub(db, 'updateOne').yields({});
		inventoryController.postEditStock(req, res);

		assert.equal(db.updateOne.firstCall.args[0], Inventory);
		expect(db.updateOne.firstCall.args[1]).to.deep.equalInAnyOrder(filter);
		expect(db.updateOne.firstCall.args[2]).to.deep.equalInAnyOrder(update);

		db.convertToObjectId.restore();
		db.updateOne.restore();
	});
});

describe('the function to get the page for adding a new stock', function() {
	let req;
	let res;

	beforeEach(function() {
		req = sinon.spy();
		res = {
			render: sinon.spy()
		};
	});

	it('should render the page only once', function() {
		inventoryController.getAddStock(req, res);
		assert.isTrue(res.render.calledOnce);
	});

	it('should render the page for adding a new stock', function() {
		inventoryController.getAddStock(req, res);
		assert.equal(res.render.firstCall.args[0], 'add-stock');
	});
});

describe('the function to add a new stock', function() {
	let req;
	let res;

	beforeEach(function() {
		req = {
			body: {
				addStockName: 'Diesel',
				addStockSupplier: 'Chevron',
				addStockStorage: 'Masangkay',
				addStockQuantityPurchased: '1234',
				addStockQuantityDepleted: '1000',
				addStockPricePurchased: '45.3',
				addStockDatePurchased: '05-06-2022'
			}
		};

		res = {
			status: sinon.stub().returnsThis(),
			json: sinon.stub(),
			send: sinon.stub()
		};
	});

	it('should insert the new stock only once', function() {
		sinon.stub(db, 'insertOne').yields({});
		inventoryController.postAddStock(req, res);

		assert.isTrue(db.insertOne.calledOnce);

		db.insertOne.restore();
	});

	it('should insert the new stock with the correct arguments', function() {
		const purchase = {
			type: req.body.addStockName.trim(),
			supplier: req.body.addStockSupplier.trim(),
			location: req.body.addStockStorage.trim(),
			quantityDepleted: 0,
			quantityPurchased: req.body.addStockQuantityPurchased,
			price: req.body.addStockPricePurchased,
			date: req.body.addStockDatePurchased
		};

		sinon.stub(db, 'insertOne').yields({});
		inventoryController.postAddStock(req, res);

		assert.equal(db.insertOne.firstCall.args[0], Inventory);
		expect(db.insertOne.firstCall.args[1]).to.deep.equalInAnyOrder(purchase);

		db.insertOne.restore();
	});
});
