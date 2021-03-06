var config   = require('../config'),
    helpers  = require('./helpers'),
    async    = require('async'),
    mongoose = require('mongoose'),
    fs       = require('fs'),
    login    = require('../controllers/login-controller'),
    appRoot  = config.paths.appRoot,
    path     = require('path'),
    express  = require('express'),
    request  = require('request'),
    querystring = require('querystring'),
    http     = require('http'),
    md5      = require('MD5');

module.exports = function(app) {

    // Set language version
    app.all("*", function(req, res, next) {
        var lang = req.headers["accept-language"].split('-')[0];

        if (req.query.lang) {
            config.lang = req.query.lang;
        } else {
            if (typeof config.lang === 'undefined') {
                if (lang === 'sk' || lang === 'cz') {
                    config.lang = "sk";
                } else {
                    config.lang = "en";
                }
            }
        }

        next();
    });

    app.get("/app/", function(req, res) {
        res.render('content/fbapp', {});
    });

    // Home/Program route
    app.get("/", function(req, res) {
        console.log('Get /');
        var programQuery = helpers.getProgram(),
            resources    = {
                programQuery: programQuery.exec.bind(programQuery)
            },
            lang = (config.lang === 'en') ? true : false;

        // Parallel requests to DB
        async.parallel(resources, function(err, results) {
            res.render('content/index', {
                title: 'Vivamusica! festival 2014',
                imageAssets: config.paths.images,
                cssAssets: config.paths.css,
                lang: lang,
                clientnav: helpers.setSelected('Program'),
                program: results.programQuery,
                homepage: true
            });
        });
    });

    // Program
    app.get("/program/:page", function(req, res) {
        var programQuery = helpers.getProgram(),
            resources    = {
                programQuery: programQuery.exec.bind(programQuery)
            },
            lang = (config.lang === 'en') ? true : false;

        async.parallel(resources, function(err, results) {
            // Add prev/next links and get actual item
            var item = helpers.getActualItem(helpers.addProgramLinks(results.programQuery), req.params.page),
                langText = (config.lang === 'en') ? "_en" : "";

            res.render('content/programdetail', {
                datenum: item.datenum,
                datemonth: item["datemonth" + langText],
                datetime: item["datetime" + langText],
                place: item["place" + langText],
                title: 'Vivamusica! festival 2014' + ' - ' + item.title,
                intro: item["intro" + langText],
                text: item["text" + langText],
                img: item.img,
                prev: item.prev,
                prevText: (lang) ? "previous" : "predošlý",
                next: item.next,
                nextText: (lang) ? "next" : "ďalší",
                tickets: item.tickets,
                price: item["price" + langText],
                program: results.programQuery,
                clientnav: helpers.setSelected('Program'),
                lang: lang
            });
        });
    });

    // Hall of fame
    app.get("/halloffame", function(req, res) {
        var halloffameModel = mongoose.model('Halloffame'),
            halloffameQuery = halloffameModel.find({}).sort([['year', 'descending']]),
            programQuery    = helpers.getProgram(),

            resources = {
                halloffameQuery: halloffameQuery.exec.bind(halloffameQuery),
                programQuery: programQuery.exec.bind(programQuery)
            },
            lang = (config.lang === 'en') ? true : false;

        async.parallel(resources, function(err, results) {

            res.render('content/halloffame', {
                pagetitle: "Vivamusica! festival 2014 - Hall of fame",
                halloffame: results.halloffameQuery,
                clientnav: helpers.setSelected('Hall of fame'),
                program: results.programQuery,
                lang: lang
            });
        });
    });

    // Kontakt
    app.get("/kontakt", function(req, res) {
        var kontaktModel = mongoose.model('Kontakt'),
            kontaktQuery = kontaktModel.find(),
            programQuery = helpers.getProgram(),

            resources = {
                kontaktQuery: kontaktQuery.exec.bind(kontaktQuery),
                programQuery: programQuery.exec.bind(programQuery)
            },
            lang = (config.lang === 'en') ? true : false;

        async.parallel(resources, function(err, results) {
            res.render('content/kontakt', {
                pagetitle: "Vivamusica! festival 2014 - Kontakt",
                kontakt: results.kontaktQuery,
                clientnav: helpers.setSelected('Kontakt'),
                program: results.programQuery,
                lang: lang
            });
        });
    });

    // Festival
    app.get("/festival", function(req, res) {
        var programQuery = helpers.getProgram(),
            resources    = {
                programQuery: programQuery.exec.bind(programQuery)
            },
            template     = (config.lang === 'en') ? 'festival_en' : 'festival',
            lang = (config.lang === 'en') ? true : false;

        // Parallel requests to DB
        async.parallel(resources, function(err, results) {
            res.render('content/' + template, {
                title: 'Vivamusica! festival 2014 - Festival',
                clientnav: helpers.setSelected('Festival'),
                program: results.programQuery,
                lang: lang
            });
        });
    });

    // Press
    app.get("/press", function(req, res) {
        var pressModel = mongoose.model('Pressnews'),
            pressQuery = pressModel.find({}).sort([['path', 'descending']]),
            resources    = {
                pressQuery: pressQuery.exec.bind(pressQuery)
            },
            lang = (config.lang === 'en') ? true : false;

        async.parallel(resources, function(err, results) {
            res.render('content/press', {
                pagetitle: "Vivamusica! festival 2014 - Press",
                press: results.pressQuery,
                clientnav: helpers.setSelected('Press'),
                sidebar: true,
                lang: lang
            });
        });
    });

    // Press detail page
    app.get("/press/:page", function(req, res) {
        var page       = req.params.page,
            pressModel = mongoose.model('Pressnews'),
            pressQuery = pressModel.findOne({"path": page}),
            resources  = {
                pressQuery: pressQuery.exec.bind(pressQuery)
            },
            lang = (config.lang === 'en') ? true : false;

        async.parallel(resources, function(err, results) {
            res.render('content/pressdetail', {
                pagetitle: "Vivamusica! festival 2014 - Press - Detail",
                title: results.pressQuery.title,
                text: results.pressQuery.text,
                date: results.pressQuery.date,
                clientnav: helpers.setSelected('Press'),
                sidebar: true,
                lang: lang
            });
        });
    });

    // Galeria
    app.get("/galeria/:year", function(req, res) {
        res.render('content/galeria', {
            title: 'Galeria',
            galleries: getGalleries(),
            imgs: helpers.getImagesFromGallery(req.params.year),
            clientnav: helpers.setSelected('Galéria')
        });
    });

    // Partneri
    app.get("/partneri", function(req, res) {
        var lang = (config.lang === 'en') ? true : false;

        res.render('content/partneri', {
            title: 'Partneri',
            clientnav: helpers.setSelected('Partneri'),
            sidebar: true,
            lang: lang
        });
    });

    // POST form newsletter form
    app.post('/newsletter', function(req, res){
        var item            = JSON.stringify(req.body),
            newsletterModel = mongoose.model('Newsletter');

        new newsletterModel({email: JSON.parse(item).email}).save(function (err) {
            if (err) {
                throw err;
            }

            res.send(item);
        });
    });

    // POST form campaign form
    app.post('/savecampaign', function(req, res){
        var item            = JSON.stringify(req.body),
            data            = JSON.parse(item),
            dataToSave      = {};

        dataToSave.name = data.name;
        dataToSave.email = data.email;
        dataToSave.tel_number = data.tel_number;
        dataToSave.ch_tickets = data.ch_tickets;
        dataToSave.ch_picture = data.ch_picture;
        dataToSave.ch_allow_marketing_use = data.ch_allow_marketing_use;
        dataToSave.hash = getMD5(data);

        var r = request.post({
                uri: 'https://fb.core4.sk/slsp_sutaz/index.php',
                headers: {'content-type': 'application/x-www-form-urlencoded'},
                body: querystring.stringify(dataToSave)
            }, function(error, response, body) {
                console.log(response);
            });
    });

    function getMD5(data) {
        var str = "crstr4?." + data.name + data.email + data.tel_number + data.ch_tickets + data.ch_picture + data.ch_allow_marketing_use;

            console.log(str)

        return md5(str);
    };
};
