var config   = require('../config'),
    helpers  = require('./helpers'),
    mongoose = require('mongoose'),
    login    = require('../controllers/login-controller'),
    appRoot  = config.paths.appRoot,
    path     = require('path'),
    express  = require('express');

module.exports = function(app) {

    app.get("/presslogin", function(req, res) {
        res.render('content/login', {
            pagetitle: "Vivamusica! festival 2014 - Press - Login",
            clientnav: helpers.setSelected('Press'),
            sidebar: true
        });
    });

    app.post("/presslogin", function(req, res) {
        var params = {
                user: req.param('username'),
                pswd: req.param('pswd')
            };

        // TODO: use promises && AJAX form
        login.loginHandler(params, function(msg, user) {
            if (typeof user === "undefined") {
                res.send(msg, 400);
            } else {
                //res.send(params.user, 200);
                req.session.user = user;
                res.redirect("/pressgaleria");
            }
        });
    });

    app.get("/pressgaleria", function(req, res) {
        if (typeof req.session.user === "undefined") {
            res.redirect("/presslogin");
        } else {
            res.render('content/pressgaleria', {
                pagetitle: "Vivamusica! festival 2014 - Press - Galéria",
                clientnav: helpers.setSelected('Press'),
                sidebar: true
            });
        }
    });

    app.all("/private/*", function(req, res, next) {
        if (typeof req.session.user === "undefined") {
            res.redirect("/presslogin");
        } else {
            next();
        }
    });
    // TODO: refactor - move to the index.js
    app.use('/private', express.static(path.join(appRoot, 'private')));
};
