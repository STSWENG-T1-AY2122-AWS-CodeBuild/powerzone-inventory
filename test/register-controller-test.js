const deepEqualInAnyOrder = require('deep-equal-in-any-order');
require('chai').use(deepEqualInAnyOrder);
const assert = require('chai').assert;
const expect = require('chai').expect;
const sinon = require('sinon');

const registerController = require('../controllers/register-controller.js');
const Account = require('../models/account-schema.js');
const db = require('../models/db.js');

/* Bcrypt is used to deal with password hashing. */
const bcrypt = require('bcrypt');

/* Use ten salt rounds for password hashing. */
const saltRounds = 10;

describe('the function to get the register page', function() {
    it('should render the register page only once if the user is not logged in', function() {
        let req = {
            session: {
                username: null
            }
        };

        let res = {
            render: sinon.spy(),
            redirect: sinon.spy()
        };
        
        registerController.getRegister(req, res);

        assert.isTrue(res.render.calledOnce);
        assert.equal(res.render.firstCall.args[0], 'register');
    });

    it('should not redirect to the home page if the user is not logged in', function() {
        let req = {
            session: {
                username: null
            }
        };

        let res = {
            render: sinon.spy(),
            redirect: sinon.spy()
        };

        registerController.getRegister(req, res);

        assert.isTrue(res.redirect.notCalled);
    });

    it('should redirect to the register page if the user is logged in', function() {
        let req = {
            session: {
                username: 'bettina'
            }
        };

        let res = {
            render: sinon.spy(),
            redirect: sinon.spy()
        };

        registerController.getRegister(req, res);

        assert.isTrue(res.redirect.calledOnce);
        assert.equal(res.redirect.firstCall.args[0], '/getHome');
    });

    it('should not render the log-in page if the user is not logged in', function() {
        let req = {
            session: {
                username: 'bettina'
            }
        };

        let res = {
            render: sinon.spy(),
            redirect: sinon.spy()
        };

        registerController.getRegister(req, res);

        assert.isTrue(res.render.notCalled);
    });
});

describe('the function to register a new account', function() {
    let req, res, hash;

    beforeEach(function() {
        req = {
            body: {
                signupEmail: 'hello@gmail.com',
                signupFname: 'hello',
                signupLname: 'hello',
                signupUsername: 'hello',
                signupRole: 'inventory-manager',
                signupPassword: 'hello'
            }
        };

        res = {
            status: sinon.stub().returnsThis(),
            json: sinon.stub(),
            send: sinon.stub()
        };

        hash = 'fasdfasdfa';

        sinon.stub(bcrypt, 'hash').yields(null, hash);
        registerController.postRegister(req, res);
    });

    afterEach(function() {
        bcrypt.hash.restore();
    });

    it('should hash the password only once', function() {
        assert.isTrue(bcrypt.hash.calledOnce);
        assert.equal(bcrypt.hash.firstCall.args[0], req.body.signupPassword);
    });

    it('should hash the password for the specified number of rounds', function() {
        assert.equal(bcrypt.hash.firstCall.args[1], saltRounds);
    });
});

describe('the function to verify whether a username is unique', function() {
    let req, expectedResult;

    beforeEach(function() {
        req = {
            query: {
                username: 'hello',
                email: 'hello@gmail.com'
            }
        };

        res = {
            status: sinon.stub().returnsThis(),
            json: sinon.stub(),
            send: sinon.stub()
        };

        expectedResult = {
            email: 'hello@gmail.com',
			name: 'hello',
			username: 'hello',
			role: 'inventory-manager',
			password: 'hello'
        };
    });

    afterEach(function() {
        db.findOne.restore();
    });

    it('should search the database for the username only once', function() {
        sinon.stub(db, 'findOne').yields(expectedResult);
        registerController.getCheckUsername(req, res);

        assert.isTrue(db.findOne.calledOnce);
        assert.equal(db.findOne.firstCall.args[0], Account);
        expect(db.findOne.firstCall.args[1]).to.deep.equalInAnyOrder({username: req.query.username.toLowerCase()});
        assert.equal(db.findOne.firstCall.args[2], 'username');
    });
});

describe('the function to verify whether an email address is unique', function() {
    let req, expectedResult;

    beforeEach(function() {
        req = {
            query: {
                username: 'hello',
                email: 'hello@gmail.com'
            }
        };

        res = {
            status: sinon.stub().returnsThis(),
            json: sinon.stub(),
            send: sinon.stub()
        };

        expectedResult = {
            email: 'hello@gmail.com',
			name: 'hello',
			username: 'hello',
			role: 'inventory-manager',
			password: 'hello'
        };
    });

    afterEach(function() {
        db.findOne.restore();
    });

    it('should search the database for the email address only once', function() {
        sinon.stub(db, 'findOne').yields(expectedResult);
        registerController.getCheckEmail(req, res);

        assert.isTrue(db.findOne.calledOnce);
        assert.equal(db.findOne.firstCall.args[0], Account);
        expect(db.findOne.firstCall.args[1]).to.deep.equalInAnyOrder({email: req.query.email.toLowerCase()});
        assert.equal(db.findOne.firstCall.args[2], 'email');
    });
});