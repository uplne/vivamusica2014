var express      = require('express'),
    bodyParser   = require('body-parser'),
    methodOverride = require('method-override'),
    favicon      = require('static-favicon'),
    errorHandler = require('errorhandler'),
    exphbs       = require('express-hbs'),
    path         = require('path'),
    config       = require('./config'),
    routes       = require('./routes'),
    helpers      = require('./helpers'),
    db           = require('./config/db'),
    dbmodels     = require('./controllers/dbmodels'),
    appRoot      = config.paths.appRoot,
    cookieParser = require('cookie-parser'),
    session      = require('express-session');

function init() {
    app = express();

    setupServer();
}

function setupServer() {

    // Configure server
    app.use(bodyParser());
    app.use(methodOverride());
    app.use(cookieParser());
    app.use(session({ secret: 'vivasecretvisible' }));
    app.use(favicon(config.paths.images + '/favicon.ico'));
    app.use(express.static(path.join(appRoot, 'static')));
    app.use('/static/images', express.static(config.paths.images));
    app.use('/static/js', express.static(config.paths.js));
    app.use('/static/css', express.static(config.paths.css));
    app.use('/static/fonts', express.static(config.paths.fonts));

    // Route to PDFs and other documents
    app.use('/static/pdf', express.static(config.paths.pdf));
    app.use(errorHandler({
        dumpExceptions: true,
        showStack: true
    }));

    // Template engine
    app.engine('hbs', exphbs.express3({
        partialsDir: appRoot + '/static/views/partials',
        defaultLayout: appRoot + '/static/views/layouts/default.hbs'
    }));
    app.set('view engine', 'hbs');
    app.set('views', appRoot + '/static/views');

    helpers.registerHelpers();

    // Start server
    app.listen(config.server.port, function() {
        console.log('Express server listening on port %d in %s mode', config.server.port, app.settings.env);
    });

    // Connect to mongodb
    db.connect();

    // Normal routes
    routes.frontend(app);

    // Routes behing auth
    routes.secure(app);
}

module.exports = init;
