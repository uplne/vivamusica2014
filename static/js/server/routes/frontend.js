var config   = require('../config'),
    async    = require('async'),
    mongoose = require('mongoose');

    /*news    = require('../controllers/news'),
    program = require('../controllers/program');*/

module.exports = function(app) {
    // Home route
    app.get("/", function(req, res) {
        var newsModel    = mongoose.model('News'),
            newsQuery    = newsModel.find({}),
            programModel = mongoose.model('Program'),
            programQuery = programModel.find({}),

            resources = {
            newsQuery:    newsQuery.exec.bind(newsQuery),
            programQuery: programQuery.exec.bind(programQuery)
        }

        async.parallel(resources, function(err, results) {
            res.render('content/index', {
                title: 'Vivamusica! festival 2014',
                imageAssets: config.paths.images,
                cssAssets: config.paths.css,
                news: results.newsQuery,
                clientnav: setSelected('Home', clientNav),
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

    // TODO - create utils module, use underscore or create own functional library
    var setSelected = function(item, items) {
        var len = items.length,
            i;

        for (i = 0; i < len; i++) {
            items[i].selected = items[i].name=== item;
        }

        return items;
    };

    // Actual program item
    app.get("/program/viva-opera", function(req, res) {
        res.render('content/programdetailvivaopera', {
            title: 'Viva Opera!',
            clientnav: setSelected('Program', clientNav)
        });
    });

    // Program
    app.get("/program/:page", function(req, res) {
        res.render('content/programdetail', {
            title: 'Už čoskoro!',
            clientnav: setSelected('Program', clientNav)
        });
    });

    // Vstupenky
    app.get("/vstupenky", function(req, res) {
        res.render('content/vstupenky', {
            title: 'Vstupenky',
            clientnav: setSelected('Vstupenky', clientNav)
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

    var program = [
        {
            title: 'program 1',
            path: '1',
            img: 'static/images/news/news1.jpg'
        },
        {
            title: 'program 2',
            path: '1',
            img: 'static/images/news/news1.jpg'
        },
        {
            title: 'program 3',
            path: '1',
            img: 'static/images/news/news1.jpg'
        },
        {
            title: 'program 4',
            path: '1',
            img: 'static/images/news/news1.jpg'
        },
        {
            title: 'program 5',
            path: '1',
            img: 'static/images/news/news1.jpg'
        },
        {
            title: 'program 6',
            path: '1',
            img: 'static/images/news/news1.jpg'
        },
        {
            title: 'program 7',
            path: '1',
            img: 'static/images/news/news1.jpg'
        },
        {
            date: '28. jún, 20:00',
            title: 'Viva opera!',
            path: 'viva-opera',
            img: 'static/images/news/news1.jpg'
        }
    ];
};
