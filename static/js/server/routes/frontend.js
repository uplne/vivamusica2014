var config = require('../config');

module.exports = function(app) {
    // Home route
    app.get("/", function(req, res) {
        res.render('content/index', {
            title: 'Vivamusica! festival 2014',
            imageAssets: config.paths.images,
            cssAssets: config.paths.css,
            news: [
                {
                    title1: "1. potvrdený koncert",
                    title2: "Operné gala",
                    img: "static/images/news/news1.jpg",
                    path: "progam/viva-opera"
                },
                {
                    title1: "2%",
                    title2: "z daní",
                    img: "static/images/news/news1.jpg",
                    path: "novinky/2-z-dani"
                }
            ],
            clientnav: setSelected('Home', clientNav),
            program: program
        });
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
    app.get("/program/:id", function(req, res) {
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
            path: '/program'
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
            path: '#viva-opera',
            img: 'static/images/news/news1.jpg'
        }
    ];
};
