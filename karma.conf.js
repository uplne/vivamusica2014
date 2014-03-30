// Karma configuration
// Generated on Sun Oct 20 2013 07:28:56 GMT+0200 (CEST)

module.exports = function(config) {
    config.set({
        frameworks: ["mocha"],

        files: [
            {pattern: 'static/js/lib/**/*.js', included: false},
            {pattern: 'static/js/modules/**/*.js', included: false},
            {pattern: 'tests/unit/**/*.js', included: false}

        ],

        exclude: [
            'static/js/main.js'
        ],

        client: {
            mocha: {
                ui: "tdd",
                reporter: "spec",
                timeout: "15000"
            }
        },

        reporters: ["progress"],

        port: 1999,

        color: true,

        autoWatch: false,

        browsers: ["Chrome"],

        captureTimeout: 6000,

        singleRun: true
    });
};
