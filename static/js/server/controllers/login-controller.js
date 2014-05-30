/**
 * Handling user accounts
 */

var api = {
    // TODO: connect to DB
    loginHandler: function(user, callback) {
        if (user.user === "media" && user.pswd === "heslo") {
            callback('', user);
        } else {
            callback("Wrong username or password!");
        }
    }
}

module.exports = api;
