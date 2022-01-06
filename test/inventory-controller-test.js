const deepEqualInAnyOrder = require('deep-equal-in-any-order');
require('chai').use(deepEqualInAnyOrder);
const assert = require('chai').assert;
const expect = require('chai').expect;
const sinon = require('sinon');

const inventoryController = require('../controllers/inventory-controller.js');
const Inventory = require('../models/inventory-schema.js');
const db = require('../models/db.js');

describe('the function to get the inventory page', function() {
    it('should retrieve the details of all the inventory purchases only once', function() {
        const req = {
			session: {
				role: 'administrator'
			}
		};

        const res = {
			status: sinon.stub().returnsThis(),
			json: sinon.stub(),
			send: sinon.stub()
		};

        const expectedResult = [
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

        sinon.stub(db, 'findMany').yields(expectedResult);
		inventoryController.getInventory(req, res);

		assert.isTrue(db.findMany.calledOnce);
		assert.equal(db.findMany.firstCall.args[0], Inventory);
		expect(db.findMany.firstCall.args[1]).to.deep.equalInAnyOrder({});
		assert.equal(db.findMany.firstCall.args[2], '_id type date supplier price quantity');

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

        const filter = {
			_id: convertToObjectId('123')
		};

        sinon.stub(db, 'findOne').yields(expectedResult);
		inventoryController.getMoreInfoStock(req, res);

		assert.isTrue(db.findOne.calledOnce);
		assert.equal(db.findOne.firstCall.args[0], Inventory);
		expect(db.findOne.firstCall.args[1]).to.deep.equalInAnyOrder(filter);
		assert.equal(db.findOne.firstCall.args[2], 'type supplier location quantity price date');

        db.convertToObjectId.restore();
        db.findOne.restore();
    })
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

        const filter = {
			_id: convertToObjectId('123')
		};

        sinon.stub(db, 'findOne').yields(expectedResult);
		inventoryController.getEditStock(req, res);

		assert.isTrue(db.findOne.calledOnce);
		assert.equal(db.findOne.firstCall.args[0], Inventory);
		expect(db.findOne.firstCall.args[1]).to.deep.equalInAnyOrder(filter);
		assert.equal(db.findOne.firstCall.args[2], 'type supplier location quantity price date');

        db.convertToObjectId.restore();
        db.findOne.restore();
    })
});

describe('the function to register the details of a particular stock', function() {
    it('should retrieve the information for the stock only once', function() {
        const req = {
			body: {
                editStockId: '1234',
                editStockName: 'Diesel',
                editStockSupplier: 'Chevron',
                editStockStorage: 'Masangkay',
                editStockQuantity: '1234',
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
			quantity: req.body.editStockQuantity,
			price: req.body.editStockPricePurchased,
			date: req.body.editStockDatePurchased
        };

        sinon.stub(db, 'updateOne').yields({});
		inventoryController.postEditStock(req, res);

		assert.isTrue(db.updateOne.calledOnce);
		assert.equal(db.updateOne.firstCall.args[0], Inventory);
		expect(db.updateOne.firstCall.args[1]).to.deep.equalInAnyOrder(filter);
		expect(db.updateOne.firstCall.args[2]).to.deep.equalInAnyOrder(update);

        db.convertToObjectId.restore();
        db.updateOne.restore();
    })
});

describe('the function to get the page for adding a new stock', function() {
	it('should render the page for adding a new stock only once', function() {
		const req = sinon.spy();
		const res = {
			render: sinon.spy()
		};

		inventoryController.getAddStock(req, res);
		assert.isTrue(res.render.calledOnce);
		assert.equal(res.render.firstCall.args[0], 'add-stock');
	});
});

describe('the function to add a new stock', function() {
    it('should insert the new stock only once', function() {
        const req = {
			body: {
                addStockName: 'Diesel',
                addStockSupplier: 'Chevron',
                addStockStorage: 'Masangkay',
                addStockQuantity: '1234',
                addStockPricePurchased: '45.3',
                addStockDatePurchased: '05-06-2022'
            }
		};

        const res = {
			status: sinon.stub().returnsThis(),
			json: sinon.stub(),
			send: sinon.stub()
		};
        const purchase = {
			type: req.body.addStockName.trim(),
			supplier: req.body.addStockSupplier.trim(),
			location: req.body.addStockStorage.trim(),
			quantity: req.body.addStockQuantity,
			price: req.body.addStockPricePurchased,
			date: req.body.addStockDatePurchased
		};

        sinon.stub(db, 'insertOne').yields({});
		inventoryController.postAddStock(req, res);

		assert.isTrue(db.insertOne.calledOnce);
		assert.equal(db.insertOne.firstCall.args[0], Inventory);
		expect(db.insertOne.firstCall.args[1]).to.deep.equalInAnyOrder(purchase);

        db.insertOne.restore();
    })
});
