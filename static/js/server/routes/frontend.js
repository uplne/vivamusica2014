var config   = require('../config'),
    async    = require('async'),
    mongoose = require('mongoose');

    /*news    = require('../controllers/news'),
    program = require('../controllers/program');*/

module.exports = function(app) {

    // Home/Program route
    app.get("/", function(req, res) {
        var newsModel    = mongoose.model('News'),
            newsQuery    = newsModel.find({}),
            programModel = mongoose.model('Program'),
            programQuery = programModel.find({}),

            resources = {
                newsQuery:    newsQuery.exec.bind(newsQuery),
                programQuery: programQuery.exec.bind(programQuery)
            };

        // Parallel requests to DB
        async.parallel(resources, function(err, results) {
            res.render('content/index', {
                title: 'Vivamusica! festival 2014',
                imageAssets: config.paths.images,
                cssAssets: config.paths.css,
                news: results.newsQuery,
                clientnav: setSelected('Program', clientNav),
                program: results.programQuery
            });
        });

        /*news.list(function(items, err) {
            res.render('content/index', {
                title: 'Vivamusica! festival 2014',
                imageAssets: config.paths.images,
                cssAssets: config.paths.css,
                news: items,
                clientnav: setSelected('Home', clientNav),
                program: program
            });

            function(err, news) {
        if (!err) {
            callback(news, null)
        } else {
            callback(null, err);
        }
    }
        });*/
    });

    // Actual program item
    /*app.get("/program/viva-opera", function(req, res) {
        res.render('content/programdetailvivaopera', {
            title: 'Viva Opera!',
            clientnav: setSelected('Program', clientNav)
        });
    });*/

    // Program
    app.get("/program/:page", function(req, res) {
        var programModel = mongoose.model('Program'),
            programQuery = programModel.find({'path': req.params.page}),

            resources = {
                programQuery: programQuery.exec.bind(programQuery)
            };

        async.parallel(resources, function(err, results) {
            var item = results.programQuery[0];

            res.render('content/programdetail', {
                date: item.date,
                place: item.place,
                title1: item.title1,
                title2: item.title2,
                intro: item.intro,
                text: item.text,
                img: item.img,
                tickets: item.tickets
            });
        });
    });

    // Vstupenky
    app.get("/vstupenky", function(req, res) {
        res.render('content/vstupenky', {
            title: 'Vstupenky',
            clientnav: setSelected('Vstupenky', clientNav)
        });
    });

    // Kontakt
    app.get("/kontakt", function(req, res) {
        res.render('content/kontakt', {
            title: 'Kontakt',
            clientnav: setSelected('Kontakt', clientNav)
        });
    });

    // Festival
    app.get("/festival", function(req, res) {
        res.render('content/festival', {
            title: 'Festival',
            clientnav: setSelected('Festival', clientNav)
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
        {
            name: 'Vstupenky',
            path: '/vstupenky'
        },
        {
            name: 'Galéria',
            path: '/galeria'
        },
        {
            name: 'Hall of fame',
            path: '/halloffame'
        },
        {
            name: 'Kontakt',
            path: '/kontakt'
        }
    ];

    // TODO - create utils module, use underscore or create own functional library
    var setSelected = function(item, items) {
        var len = items.length,
            i;

        for (i = 0; i < len; i++) {
            items[i].selected = items[i].name=== item;
        }

        return items;
    };
};
