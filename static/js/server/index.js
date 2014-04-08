var express  = require('express'),
    exphbs   = require('express-hbs'),
    path     = require('path'),
    config   = require('./config'),
    routes   = require('./routes'),
    helpers  = require('./helpers'),
    db       = require('./config/db'),
    dbmodels = require('./controllers/dbmodels'),
    appRoot  = config.paths.appRoot;

function init() {
    app = express();

    setupServer();
}

function setupServer() {

    // Configure server
    app.configure(function() {
        app.use(express.bodyParser());
        app.use(express.methodOverride());
        app.use(express.static(path.join(appRoot, 'static')));
        app.use(express.favicon(config.paths.images + '/favicon.ico'));
        app.use('/static/images', express.static(config.paths.images));
        app.use('/static/js', express.static(config.paths.js));
        app.use('/static/css', express.static(config.paths.css));

        // Route to PDFs and other documents
        app.use('/static/pdf', express.static(config.paths.pdf));
        app.use(app.router);
        app.use(express.errorHandler({
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
    });

    // Start server
    app.listen(config.server.port, function() {
        console.log('Express server listening on port %d in %s mode', config.server.port, app.settings.env);
    });

    // Connect to mongodb
    db.connect();

    routes.frontend(app);
}

module.exports = init;
