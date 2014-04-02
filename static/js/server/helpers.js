var exphbs  = require('express-hbs'),
    helpers = {},
    api     = {},
    utils   = {};

helpers = {
    foreach: function(context, options) {
        var result = "";

        for (var i = 0; i < context.length; i++) {
            result = result + options.fn(context[i]);
        }

        return result;
    },

    eachNav: function(context, options) {
        var result = "";

        for (var i = 0; i < context.length; i++) {

            result = result + options.fn(context[i]);
        }

        return result;
    },

    imageAssets: function (context, options) {
        var output = '/static/images' + context;

        return new exphbs.SafeString(output);
    },

    cssAssets: function (context, options) {
        var output = '/static/css' + context;

        return new exphbs.SafeString(output);
    }
};

// TODO - move to utils module
utils = {
    getSelected: function(item) {

    }
}

api = {
    registerHelper: function(name, fn) {
        exphbs.registerHelper(name, fn);
    },

    registerHelpers: function() {
        this.registerHelper('foreach', helpers.foreach);
        this.registerHelper('eachNav', helpers.eachNav);
        this.registerHelper('imageAssets', helpers.imageAssets);
        this.registerHelper('cssAssets', helpers.cssAssets);
    }
};

module.exports = api;
module.exports.registerHelpers = api.registerHelpers;
