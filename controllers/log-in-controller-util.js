/* Bcrypt is used to deal with password hashing. */
const bcrypt = require('bcrypt');

const logInControllerUtil = {
    logInUtil: function(req, res, result, password) {
        bcrypt.compare(password, result.password, function(err, equal) {
            /* If the entered password matches the password stored in the database, open a session for
            * the user.
            */
            if (equal) {
                req.session.username = result.username;
                req.session.role = result.role;

                res.status(200).json('Log in successful');
                res.send();

            /* If the entered password does not match, send an error message. */
            } else {
                res.status(401).json('Incorrect username and/or password');
                res.send();
            }
        });
    }
}

module.exports = logInControllerUtil;