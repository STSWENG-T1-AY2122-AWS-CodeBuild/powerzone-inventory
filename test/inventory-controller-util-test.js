const deepEqualInAnyOrder = require('deep-equal-in-any-order');
require('chai').use(deepEqualInAnyOrder);
const expect = require('chai').expect;

const inventoryControllerUtil = require('../controllers/inventory-controller-util.js');

describe('the function to organizing the details across all the inventory items', function() {
	it('should include the correct details of the inventory items', function() {
		const dbResult = [
			{
				_id: '123',
				type: 'gasoline',
				supplier: 'boop',
				price: '651',
				location: 'manila',
				quantityPurchased: '57',
				quantityDepleted: '40',
				date: new Date(2002, 1, 11)
			},
			{
				_id: '124',
				type: 'premium-gasoline-95',
				supplier: 'boop1',
				price: '652',
				location: 'manila1',
				quantityPurchased: '57',
				quantityDepleted: '40',
				date: new Date(2002, 1, 11)
			},
			{
				_id: '125',
				type: 'premium-gasoline-97',
				supplier: 'boop2',
				price: '653',
				location: 'manila2',
				quantityPurchased: '57',
				quantityDepleted: '40',
				date: new Date(2002, 1, 1)
			},
			{
				_id: '126',
				type: 'kerosene',
				supplier: 'boop3',
				price: '654',
				location: 'manila3',
				quantityPurchased: '57',
				quantityDepleted: '40',
				date: new Date(2002, 1, 11)
			},
			{
				_id: '127',
				type: 'diesel',
				supplier: 'boop4',
				price: '655',
				location: 'manila4',
				quantityPurchased: '57',
				quantityDepleted: '40',
				date: new Date(2002, 1, 11)
			}
		];

		const expectedResult = {
			'dates': [
				'02/01/2002',
				'02/11/2002',
				'02/11/2002',
				'02/11/2002',
				'02/11/2002'
			],
			'ids': [
				'123',
				'124',
				'125',
				'126',
				'127'
			],
			'locations': [
				'manila',
				'manila1',
				'manila2',
				'manila3',
				'manila4'
			],
			'prices': [
				'651',
				'652',
				'653',
				'654',
				'655'
			],
			'statuses': [
				'In Stock',
				'In Stock',
				'In Stock',
				'In Stock',
				'In Stock'
			],
			'suppliers': [
				'boop',
				'boop1',
				'boop2',
				'boop3',
				'boop4'
			],
			'totalDiesel': 17,
			'totalGasoline': 17,
			'totalKerosene': 17,
			'totalPremiumGasoline95': 17,
			'totalPremiumGasoline97': 17,
			'types': [
				'diesel',
				'gasoline',
				'kerosene',
				'premium-gasoline-95',
				'premium-gasoline-97'
			]
		};

		const result = inventoryControllerUtil.inventoryUtil(dbResult);
		expect(result).to.deep.equalInAnyOrder(expectedResult);
	});
});
