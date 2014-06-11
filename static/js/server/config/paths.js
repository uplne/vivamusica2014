var path    = require('path'),
    appRoot = path.resolve(__dirname, '../../../../');

function getPaths() {
    return {
        'appRoot': appRoot,
        'lang'   : '',
        'config' : path.join(appRoot, 'config.js'),
        'images' : path.join(appRoot, 'static/images'),
        'js'     : path.join(appRoot, 'static/js'),
        'css'    : path.join(appRoot, 'static/css'),
        'pdf'    : path.join(appRoot, 'static/pdf'),
        'fonts'  : path.join(appRoot, 'static/fonts')
    };
}

module.exports = getPaths;
