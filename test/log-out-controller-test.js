const assert = require('chai').assert;
const expect = require('chai').expect;
const sinon = require('sinon');

const logOutController = require('../controllers/log-out-controller.js');

describe('the function to log an active user out of the application', function() {
	it('should destroy the active session only once', function() {
		const req = {
			session: {
				destroy: sinon.spy()
			}
		};

		const res = {};

		logOutController.getLogOut(req, res);
		assert.isTrue(req.session.destroy.calledOnce);
	});
});
