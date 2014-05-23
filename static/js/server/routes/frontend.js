var config   = require('../config'),
    helpers  = require('./helpers'),
    async    = require('async'),
    mongoose = require('mongoose'),
    fs       = require('fs');

module.exports = function(app) {

    // Home/Program route
    app.get("/", function(req, res) {
        var programQuery = getProgram(),
            resources    = {
                programQuery: programQuery.exec.bind(programQuery)
            };

        // Parallel requests to DB
        async.parallel(resources, function(err, results) {
            res.render('content/index', {
                title: 'Vivamusica! festival 2014',
                imageAssets: config.paths.images,
                cssAssets: config.paths.css,
                clientnav: helpers.setSelected('Program', clientNav),
                program: results.programQuery
            });
        });
    });

    // Program
    app.get("/program/:page", function(req, res) {
        var programQuery = getProgram(),
            resources    = {
                programQuery: programQuery.exec.bind(programQuery)
            };

        async.parallel(resources, function(err, results) {
            // Add prev/next links and get actual item
            var item = helpers.getActualItem(helpers.addProgramLinks(results.programQuery), req.params.page);

            res.render('content/programdetail', {
                datenum: item.datenum,
                datemonth: item.datemonth,
                datetime: item.datetime,
                place: item.place,
                title: 'Vivamusica! festival 2014' + ' - ' + item.title,
                intro: item.intro,
                text: item.text,
                img: item.img,
                prev: item.prev,
                next: item.next,
                tickets: item.tickets,
                program: results.programQuery,
                clientnav: helpers.setSelected('Program', clientNav)
            });
        });
    });

    // Hall of fame
    app.get("/halloffame", function(req, res) {
        var halloffameModel = mongoose.model('Halloffame'),
            halloffameQuery = halloffameModel.find({}).sort([['year', 'descending']]),
            programQuery    = getProgram(),

            resources = {
                halloffameQuery: halloffameQuery.exec.bind(halloffameQuery),
                programQuery: programQuery.exec.bind(programQuery)
            };

        async.parallel(resources, function(err, results) {

            res.render('content/halloffame', {
                pagetitle: "Vivamusica! festival 2014 - Hall of fame",
                halloffame: results.halloffameQuery,
                clientnav: helpers.setSelected('Hall of fame', clientNav),
                program: results.programQuery
            });
        });
    });

    // Kontakt
    app.get("/kontakt", function(req, res) {
        var kontaktModel = mongoose.model('Kontakt'),
            kontaktQuery = kontaktModel.find(),
            programQuery = getProgram(),

            resources = {
                kontaktQuery: kontaktQuery.exec.bind(kontaktQuery),
                programQuery: programQuery.exec.bind(programQuery)
            };

        async.parallel(resources, function(err, results) {
            res.render('content/kontakt', {
                pagetitle: "Vivamusica! festival 2014 - Kontakt",
                kontakt: results.kontaktQuery,
                clientnav: helpers.setSelected('Kontakt', clientNav),
                program: results.programQuery
            });
        });
    });

    // Festival
    app.get("/festival", function(req, res) {
        var programQuery = getProgram(),
            resources    = {
                programQuery: programQuery.exec.bind(programQuery)
            };

        // Parallel requests to DB
        async.parallel(resources, function(err, results) {
            res.render('content/festival', {
                title: 'Vivamusica! festival 2014 - Festival',
                clientnav: helpers.setSelected('Festival', clientNav),
                program: results.programQuery
            });
        });
    });

    // Press
    app.get("/press", function(req, res) {
        res.render('content/press', {
            pagetitle: "Vivamusica! festival 2014 - Press",
            clientnav: helpers.setSelected('Press', clientNav),
            sidebar: true
        });
    });

    // Press detail page
    app.get("/press/:page", function(req, res) {
        var page = req.params.page;

        res.render('content/pressdetail', {
            pagetitle: "Vivamusica! festival 2014 - Press - Detail",
            clientnav: helpers.setSelected('Press', clientNav),
            sidebar: true
        });
    });

    // Galeria
    app.get("/galeria/:year", function(req, res) {
        res.render('content/galeria', {
            title: 'Galeria',
            galleries: getGalleries(),
            imgs: helpers.getImagesFromGallery(req.params.year),
            clientnav: helpers.setSelected('Galéria', clientNav)
        });
    });

    // Partneri
    app.get("/partneri", function(req, res) {
        res.render('content/partneri', {
            title: 'Partneri',
            clientnav: helpers.setSelected('Partneri', clientNav)
        });
    });

    // POST form newsletter form
    app.post('/newsletter', function(req, res){
        var item            = JSON.stringify(req.body),
            newsletterModel = mongoose.model('Newsletter');

        new newsletterModel({email: JSON.parse(item).email}).save(function (e) {
            res.send(item);
        });
    });

    // TODO - do it nicer
    var clientNav = [
        {
            name: 'Program',
            path: '/'
        },
        {
            name: 'Festival',
            path: '/festival'
        },
        /*{
            name: 'Galéria',
            path: '/galeria/2012'
        },*/
        {
            name: 'Hall of fame',
            path: '/halloffame'
        },
        {
            name: 'Kontakt',
            banner: "/static/images/team/all.jpg",
            path: '/kontakt'
        },
        {
            name: 'Press',
            path: '/press'
        },
        {
            name: 'Partneri',
            path: '/partneri'
        }
    ];

    /**
     * Get data from DB for program
     *
     * @return {Array} Array of results from DB
     */
    var getProgram = function() {
        var programModel = mongoose.model('Program'),
            programQuery = programModel.find({}).sort([['_id', 'ascending']]);

        return programQuery;
    }
};
