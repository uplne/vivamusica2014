var path = require('path'),
    viva;

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

function StartViva() {
    viva = require('./static/js/server/');
    viva();
}

module.exports = StartViva();