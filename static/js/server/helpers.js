var exphbs  = require('express-hbs'),
    helpers = {},
    api     = {};

helpers.foreach = function(context, options) {
    var result = "";

    for (var i = 0; i < context.length; i++) {
        result = result + options.fn(context[i]);
    }

    return result;
};

api.registerHelper = function(name, fn) {
    exphbs.registerHelper(name, fn);
};

api.registerHelpers = function() {
    this.registerHelper('foreach', helpers.foreach);
};

module.exports = api;
module.exports.registerHelpers = api.registerHelpers;
