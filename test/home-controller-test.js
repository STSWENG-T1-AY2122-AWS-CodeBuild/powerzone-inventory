const assert = require('chai').assert;
const sinon = require('sinon');

const homeController = require('../controllers/home-controller.js');

describe('the function to get the home page', function() {
    it('should render the home page', function() {
        let req = {}
        let res = {
            render: sinon.spy()
        }
        
        homeController.getHome(req, res);
        console.log(res.render);

        assert.isTrue(res.render.calledOnce);
        assert.equal(res.render.firstCall.args[0], 'home');
    });
});
