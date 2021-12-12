const assert = require('chai').assert;
const sinon = require('sinon');

const homeController = require('../controllers/home-controller.js');

describe('the function to get the home page', function() {
    it('should render the home page only once if the user is logged in', function() {
        let req = {
            session: {
                username: 'bettina'
            }
        };

        let res = {
            render: sinon.spy(),
            redirect: sinon.spy()
        };
        
        homeController.getHome(req, res);

        assert.isTrue(res.render.calledOnce);
        assert.equal(res.render.firstCall.args[0], 'home');
    });

    it('should not redirect to the log-in page if the user is logged in', function() {
        let req = {
            session: {
                username: 'bettina'
            }
        };

        let res = {
            render: sinon.spy(),
            redirect: sinon.spy()
        };
        
        homeController.getHome(req, res);

        assert.isTrue(res.redirect.notCalled);
    });

    it('should redirect to the log-in page only once if the user is not logged in', function() {
        let req = {
            session: {
                username: null
            }
        };

        let res = {
            render: sinon.spy(),
            redirect: sinon.spy()
        };
        
        homeController.getHome(req, res);

        assert.isTrue(res.redirect.calledOnce);
        assert.equal(res.redirect.firstCall.args[0], '/');
    });

    it('should not render the home page if the user is not logged in', function() {
        let req = {
            session: {
                username: null
            }
        };

        let res = {
            render: sinon.spy(),
            redirect: sinon.spy()
        };
        
        homeController.getHome(req, res);

        assert.isTrue(res.render.notCalled);
    });
});
