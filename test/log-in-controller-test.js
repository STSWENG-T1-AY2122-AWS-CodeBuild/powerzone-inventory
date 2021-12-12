const assert = require('chai').assert;
const sinon = require('sinon');

const logInController = require('../controllers/log-in-controller.js');


describe('the function to get the log-in page', function() {
    it('should render the log-in page only once if the user is not logged in', function() {
        let req = {
            session: {
                username: 'bettina'
            }
        };

        let res = {
            render: sinon.spy(),
            redirect: sinon.spy()
        };
        
        logInController.getHome(req, res);

        assert.isTrue(res.render.calledOnce);
        assert.equal(res.render.firstCall.args[0], 'home');
    });
});
