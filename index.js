var app_root = __dirname,
    express  = require('express'),
    exphbs   = require('express-hbs'),
    path     = require('path'),
    mongoose = require('mongoose'),

    app      = null,
    port     = 4711;

// Create server
app = express();

// Configure server
app.configure(function() {
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(express.static(path.join(app_root, 'static')));
    app.use('/static/images', express.static(path.join(__dirname, 'static/images')));
    app.use('/static/js', express.static(path.join(__dirname, 'static/js')));
    app.use('/static/css', express.static(path.join(__dirname, 'static/css')));
    app.use(app.router);
    app.use(express.errorHandler({
        dumpExceptions: true,
        showStack: true
    }));

    app.engine('hbs', exphbs.express3({
        partialsDir: __dirname + '/static/views/partials',
        defaultLayout: __dirname + '/static/views/layouts/default.hbs'
    }));
    app.set('view engine', 'hbs');
    app.set('views', __dirname + '/static/views');
});

// Start server
app.listen(port, function() {
    console.log('Express server listening on port %d in %s mode', port, app.settings.env);
});

// Home route
app.get("/", function(req, res) {
    res.render('content/landing', {
        title: 'Vivamusica! festival 2014'
    });
});