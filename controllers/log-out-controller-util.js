const logOutUtilControllerUtil = {
    logOutUtil: function(req, res) {
        req.session = null;
        res.redirect('/');
    }
};

module.exports = logOutUtilControllerUtil;