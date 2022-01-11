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
