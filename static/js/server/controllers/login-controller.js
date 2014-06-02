var mongoose = require('mongoose');

/**
 * Handling user accounts
 */

var api = {
    /**
     * Find user in DB and compare with password submitted by form.
     * Return error message if no match.
     *
     * TODO: crypt
     */
    loginHandler: function(user, callback) {
        var acctounsModel = mongoose.model('Accounts');

        acctounsModel.findOne({"user": user.user}, function(err, res) {
            if (!err && res.pswd === user.pswd) {
                callback('', user);
            } else {
                callback("Wrong username or password!");
            }
        });
    }
}

module.exports = api;
