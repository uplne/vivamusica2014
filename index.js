var app_root = __dirname,
    express  = require('express'),
    path     = require('path'),
    mongoose = require('mongoose'),
    exphbs   = require('express3-handlebars'),

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

    app.set('views', path.join(__dirname, 'static/views'));
    app.engine('hbs', exphbs());
    app.set('view engine', 'hbs');
});

// Start server
app.listen(port, function() {
    console.log('Express server listening on port %d in %s mode', port, app.settings.env);
});

app.get("/", function(req, res) {
    res.render('landing', {
        title: 'Vivamusica! festival 2014'
    });
});