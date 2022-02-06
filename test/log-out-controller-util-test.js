const assert = require('chai').assert;
const sinon = require('sinon');

const logOutControllerUtil = require('../controllers/log-out-controller-util.js');

describe('the utility function for logging an active user out of the application', function() {
	it('should set the active session to null only once', function() {
		const req = {
			session: 'hello'
		};

		const res = {
			redirect: sinon.spy()
		};

		logOutControllerUtil.logOutUtil(req, res);
		assert.isNull(req.session);
	});

	it('should redirect the log-in page only once', function() {
		const req = {
			session: 'hello'
		};

		const res = {
			redirect: sinon.spy()
		};

		logOutControllerUtil.logOutUtil(req, res);
		assert.isTrue(res.redirect.calledOnce);
	});
});
