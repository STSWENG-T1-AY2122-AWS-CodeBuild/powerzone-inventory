const deepEqualInAnyOrder = require('deep-equal-in-any-order');
require('chai').use(deepEqualInAnyOrder);
const expect = require('chai').expect;

const deliveryControllerUtil = require('../controllers/delivery-controller-util.js');

describe('the function to organizing the details across all the delivery items', function() {
	it('should include the correct details of the delivery items without null date values but with single-digit date components', function() {
		const dbResult = [
			{
				id: '123',
				customer: 'kurisu',
				dropoff: 'nakahara',
				status: 'pending',
				date: new Date('2021/2/2')
			},
			{
				id: '124',
				customer: 'misaki',
				dropoff: 'makise',
				status: 'cancelled',
				date: new Date('2022/1/3')
			}
		];

		const expectedResult = {
			customers: [
				'kurisu',
				'misaki'
			],
			dates: [
				'02/02/2021',
				'01/03/2022'
			],
			dropoffs: [
				'makise',
				'nakahara'
			],
			ids: [
				'123',
				'124'
			],
			statuses: [
				'cancelled',
				'pending'
			]
		};

		const result = deliveryControllerUtil.deliveryUtil(dbResult);
		expect(result).to.deep.equalInAnyOrder(expectedResult);
	});

	it('should include the correct details of the delivery items without null date values and without single-digit date components', function() {
		const dbResult = [
			{
				id: '123',
				customer: 'kurisu',
				dropoff: 'nakahara',
				status: 'pending',
				date: new Date('2021/10/22')
			},
			{
				id: '124',
				customer: 'misaki',
				dropoff: 'makise',
				status: 'cancelled',
				date: new Date('2022/11/13')
			}
		];

		const expectedResult = {
			customers: [
				'kurisu',
				'misaki'
			],
			dates: [
				'10/22/2021',
				'11/13/2022'
			],
			dropoffs: [
				'makise',
				'nakahara'
			],
			ids: [
				'123',
				'124'
			],
			statuses: [
				'cancelled',
				'pending'
			]
		};

		const result = deliveryControllerUtil.deliveryUtil(dbResult);
		expect(result).to.deep.equalInAnyOrder(expectedResult);
	});

	it('should include the correct details of the delivery items, including those with null date values', function() {
		const dbResult = [
			{
				id: '123',
				customer: 'kurisu',
				dropoff: 'nakahara',
				status: 'pending',
				date: null
			},
			{
				id: '124',
				customer: 'misaki',
				dropoff: 'makise',
				status: 'cancelled',
				date: new Date('2022/1/12')
			}
		];

		const expectedResult = {
			customers: [
				'kurisu',
				'misaki'
			],
			dates: [
				null,
				'01/12/2022'
			],
			dropoffs: [
				'makise',
				'nakahara'
			],
			ids: [
				'123',
				'124'
			],
			statuses: [
				'cancelled',
				'pending'
			]
		};

		const result = deliveryControllerUtil.deliveryUtil(dbResult);
		expect(result).to.deep.equalInAnyOrder(expectedResult);
	});
});

describe('the function to format the database results for storing the fuel amounts per transaction order', function() {
	it('should reflect the correct amount per fuel type', function() {
		const dbResult = [
			{
				litersGasoline: 123,
				litersPremiumGasoline95: 456,
				litersDiesel: 789,
				litersPremiumGasoline97: 234,
				litersKerosene: 567
			},
			{
				litersGasoline: 23,
				litersPremiumGasoline95: 45,
				litersDiesel: 89,
				litersPremiumGasoline97: 24,
				litersKerosene: 57
			}
		];

		const expectedResult = {
			'litersDiesel': [
				89,
				789
			],
			'litersGasoline': [
				23,
				123
			],
			'litersKerosene': [
				57,
				567
			],
			'litersPremiumGasoline95': [
				45,
				456
			],
			'litersPremiumGasoline97': [
				24,
				234
			]
		};

		const result = deliveryControllerUtil.transactionOrdersUtil(dbResult);
		expect(result).to.deep.equalInAnyOrder(expectedResult);
	});
});

describe('the function to format the database results for storing the fuel amounts per inventory entry', function() {
	it('should compute the correct aggregated amount per fuel type', function() {
		const dbResult = [
			{
				type: 'gasoline',
				quantityPurchased: '65',
				quantityDepleted: '56'
			},
			{
				type: 'premium-gasoline-95',
				quantityPurchased: '15',
				quantityDepleted: '3'
			},
			{
				type: 'diesel',
				quantityPurchased: '635',
				quantityDepleted: '561'
			},
			{
				type: 'premium-gasoline-97',
				quantityPurchased: '615',
				quantityDepleted: '156'
			},
			{
				type: 'kerosene',
				quantityPurchased: '765',
				quantityDepleted: '0'
			}
		];

		const expectedResult = {
			totalDiesel: 74,
			totalGasoline: 9,
			totalKerosene: 765,
			totalPremiumGasoline95: 12,
			totalPremiumGasoline97: 459
		};

		const result = deliveryControllerUtil.inventoryAmountsUtil(dbResult);
		expect(result).to.deep.equalInAnyOrder(expectedResult);
	});
});
