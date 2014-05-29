/**
 * Handling user accounts
 */

var api = {
    loginHandler: function(user, callback) {
        console.log('loginHandler', user.user, user.pswd);
        if (user.user === "media" && user.pswd === "heslo") {
            console.log('login true');
            callback('', true);
        } else {
            callback("Wrong username or password!");
        }
    }
}

module.exports = api;
