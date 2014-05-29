/**
 * Handling user accounts
 */

var api = {
    // TODO: connect to DB
    loginHandler: function(user, callback) {
        if (user.user === "media" && user.pswd === "heslo") {
            console.log('login true');
            callback('', true);
        } else {
            callback("Wrong username or password!");
        }
    }
}

module.exports = api;
