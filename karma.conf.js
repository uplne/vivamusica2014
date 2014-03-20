// Karma configuration
// Generated on Sun Oct 20 2013 07:28:56 GMT+0200 (CEST)

module.exports = function(config) {
    config.set({
        frameworks: ["mocha", "chai"],

        files: [
            "static/js/tests/**/*.js"
        ],

        reporters: ["progress"],

        port: 1999,

        color: true,

        autoWatch: false,

        browsers: ["Chrome"],

        captureTimeout: 6000,

        singleRun: true
    });
};
