var app_root = __dirname,
    express  = require('express'),
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
    app.use(express.router);
    app.use(express.static(path.join(app_root, 'static')));
    app.use(express.errorHandler({dumpExceptions: true, showStack: true}));
});

// Start server
app.listen(port, function() {
    console.log('Express server listening on port %d in %s mode', port, app.settings.env);
});