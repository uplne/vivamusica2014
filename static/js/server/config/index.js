var paths   = require('./paths'),
    path    = require('path'),
    config;

config = require(paths().config)[process.env.NODE_ENV];

config.paths = paths();

module.exports = config;
