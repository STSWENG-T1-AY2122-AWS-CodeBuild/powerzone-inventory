const assert = require('chai').assert;
const sinon = require('sinon');

const logOutController = require('../controllers/log-out-controller.js');
const logOutControllerUtil = require('../controllers/log-out-controller-util.js');

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
    })

	it('should set the active session to null only once', function() {
		const req = {
            session: 'hello'
        };

        const res = {
			redirect: sinon.spy()
		};

		logOutControllerUtil.logOutUtil(req, res);
		assert.isNull(req.session);
	})

	it('should redirect the log-in page only once', function() {
		const req = {
            session: 'hello'
        };

        const res = {
			redirect: sinon.spy()
		};

		logOutControllerUtil.logOutUtil(req, res);
		assert.isTrue(res.redirect.calledOnce);
	})
});