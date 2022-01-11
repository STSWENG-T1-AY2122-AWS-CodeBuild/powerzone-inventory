const deepEqualInAnyOrder = require('deep-equal-in-any-order');
require('chai').use(deepEqualInAnyOrder);
const assert = require('chai').assert;
const sinon = require('sinon');

const logInControllerUtil = require('../controllers/log-in-controller-util.js');

/* Bcrypt is used to deal with password hashing. */
const bcrypt = require('bcrypt');

describe('the function to grant access depending on whether the password is equivalent to the hashed password in the database', function() {
    let res;
    let req;
    let result;

    beforeEach(function() {
        res = {
            status: sinon.stub().returnsThis(),
			json: sinon.stub(),
            send: sinon.spy()
        };

        req = {
            session: {
                username: '',
                role: ''
            }
        }

        result = {
            username: 'kikyo',
            role: 'administrator'
        };
    });

    afterEach(function() {
        bcrypt.compare.restore();
    });

    it('should set the session username to the account username if the password matches the value in the database', function() {
        sinon.stub(bcrypt, 'compare').yields(null, true);
        logInControllerUtil.logInUtil(req, res, result, "hello");

        assert.equal(req.session.username, result.username);
    });

    it('should set the session role to the account role if the password matches the value in the database', function() {
        sinon.stub(bcrypt, 'compare').yields(null, true);
        logInControllerUtil.logInUtil(req, res, result, "hello");

        assert.equal(req.session.role, result.role);
    });

    it('should not set the session username to the account username if the password does not match the value in the database', function() {
        sinon.stub(bcrypt, 'compare').yields(null, false);
        logInControllerUtil.logInUtil(req, res, result, "hello");

        assert.equal(req.session.username, '');
    });

    it('should not set the session role to the account role if the password does not match the value in the database', function() {
        sinon.stub(bcrypt, 'compare').yields(null, false);
        logInControllerUtil.logInUtil(req, res, result, "hello");

        assert.equal(req.session.role, '');
    });
});
